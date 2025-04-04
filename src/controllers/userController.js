import bcrypt from "bcrypt"; // npm i bcrypt
import User from "../models/User";

// 미들웨어 생성
export const getJoin = (req,res) => {
  res.render('join', { pageTitle: "Join" });
}
export const postJoin = async (req,res) => {
  const { name, username, email, password, password2, location } = req.body;
  const exists = await User.exists({
    $or: [ {username}, {email} ]
  })
  if( exists ){
    return res.status(400).render('join', { pageTitle:"Join", errorMessage: "이미 등록된 닉네임/이메일 입니다."})
  }
  if( password !== password2 ){
    return res.status(400).render('join', { pageTitle:"Join", errorMessage: "비밀번호가 일치하지 않습니다." })
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    })
    return res.redirect('/login');  
  } catch (error) {
    res.status(400).render('join', { pageTitle:"Join", errorMessage: '❌❌❌ src/controllers/userController.js "postJoin"', })
  }
  
}

export const getLogin = (req,res) => {
  return res.render('login', { pageTitle: 'Login'})
}
export const postLogin = async(req,res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username, socialOnly:false})
  if(!user){
    return res.status(400).render('login', { pageTitle: "Login", errorMessage: '잘못된 닉네임입니다.' })
  }
  const confirmPassword = await bcrypt.compare( password, user.password );
  if(!confirmPassword){
    return res.status(400).render('login', { pageTitle: "Login", errorMessage: '잘못된 비밀번호입니다.'})
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/')
}

export const startGithubLogin = (req,res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  }
  const params = new URLSearchParams(config).toString()
  const finalUrl = `${baseUrl}?${params}`;
  res.redirect(finalUrl);
}
export const finishGithubLogin = async (req,res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  }
  const params = new URLSearchParams(config).toString()
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl,{
      // Nodejs v18 이하 에서는 fetch함수를 사용할 수 없음. node-fetch 모듈을 설치해야함
      method:'post',
      headers: {
        Accept: 'application/json'
      }
    })
  ).json()
  // tokenRequest = { access_token:'gho_49...', token_type: 'bearer', scope: 'read:user,user:email' }
    
  if("access_token" in tokenRequest) {
    const { access_token } = tokenRequest
    const apiUrl = "https://api.github.com"
    const userData = await (
      await fetch(`${apiUrl}/user`,{
        headers: {
          Authorization: `token ${access_token}`
        },
      })
    ).json();
    /*
    console.log(userData)
    {
      login: 'Wholesome-Gee', id: 191937701, node_id: 'U_kgDOC3C8pQ', avatar_url: 'https://avatars.githubusercontent.com/u/191937701?v=4',
      gravatar_id: '', url: 'https://api...', html_url: 'https://gith...', followers_url: 'https://api...', following_url: 'https://api...', 
      gists_url: 'https://api...', starred_url: 'https://api...', subscriptions_url: 'https://api...', organizations_url: 'https://api...', 
      repos_url: 'https://api...', events_url: 'https://api...', received_events_url: 'https://api...', type: 'User', user_view_type: 'private', site_admin: false, name: null,
      company: null, blog: '', location: null, email: 'jiyong0419@naver.com', hireable: null, bio: null, twitter_username: null, notification_email: 'jiyong0419@naver.com', 
      public_repos: 22, public_gists: 0, followers: 0, following: 2, created_at: '2024-12-17T03:20:28Z', updated_at: '2025-02-22T03:46:25Z', private_gists: 0, 
      total_private_repos: 2, owned_private_repos: 2, disk_usage: 10393, collaborators: 0, two_factor_authentication: false, 
      plan: { name: 'free', space: 976562499, collaborators: 0, private_repos: 10000 } 
    }
    */
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`,{
        headers:{
          Authorization: `token ${access_token}`
        }
      })
    ).json()
    /*
    console.log(emailData)
    [
      { email: 'jiyong0419@naver.com', primary: true, verified: true, visibility: 'public' }
    ]
    */
    const emailObj = emailData.find(
      email => email.primary === true && email.verified === true
    );
    if(!emailObj){
      return res.redirect('/login')
    }
    let user = await User.findOne({ email: emailObj.email })
    if(!user){
      user = await User.create({
        avatarUrl: user.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/')
  }
}

export const logout = (req,res) => {
  req.session.destroy()
  return res.redirect('/')
}

export const getEdit = (req,res) => {
  res.render('edit-profile', { pageTitle: 'Edit Profile' })
}
export const postEdit = async (req,res) => {
  const {_id} = req.session.user
  const {name, email, username, location } = req.body
  // 입력받은 데이터가 기존 데이터와 변경사항이 없다면 아래 if문 실행
  if(!Object.keys(req.body).every(key => req.body[key] === req.session.user[key])){
    //username과 email중에 변경사항이 있다면 중복검토
    const existsEmail = await User.findOne({email})
    const existsUsername = await User.findOne({username})
    if(email!==req.session.user.email && existsEmail){
      // 중복된이메일입니다
      return res.status(400).render('edit-profile', { pageTitle: "Edit Profile", errorMessage: '중복된 이메일입니다.' })
    } else if(username!==req.session.user.username && existsUsername){
      // 중복된유저네임입니다.
      return res.status(400).render('edit-profile', { pageTitle: "Edit Profile", errorMessage: '중복된 닉네임입니다.' })
    } else {
      const updatedUser = await User.findByIdAndUpdate(_id,{name,email,username,location},{new:true})
      req.session.user = updatedUser
      console.log(req.session);
      return res.redirect('/users/edit')
    }
  }
  res.redirect('/users/edit')
  /*
  await User.findByIdAndUpdate(_id, {
    ...req.session.user, name, email, username, location
  })
  form으로 부터 받은 data를 db에 저장하는 또다른 방법
  */
}


export const remove = (req,res) => res.send("Delete User Page");
export const watch = (req,res) => res.send("Watch User Page");

/*
10. Model.exists(condition)은 조건에 맞는 document가 collection에 존재하는지 여부(true/false)를 리턴한다.
11. $or 연산자는 MongoDB의 연산자로 $or : [ {condition1},{condition2},.. ] 이런식으로 사용하며, 
    condition1과 condition2 ... 중 어느 하나라도 만족하는 document가 있다면 그 document를 리턴한다.
14. status(400) 상태코드를 입력해서 브라우저의 히스토리에 유저의 잘못된 요청이 기록되지 않게함.
39. Model.find({condition})은 condition과 일치하는 document를 배열로 리턴하고 Model.findOne({condition})은 객체로 리턴한다.
44. await bcrypt.compare(입력값, 비교값) 은 입력값과 비교값이 일치한지 비교 후 boolean데이터를 리턴한다.
55. client_id는 github → profile → settings → developerSettings → OAuth Apps → Geetube에서 확인 가능.
56. allow_signup은 github회원이 아닐 시 github 회원가입을 시킬것인지의 유무를 물어보는것.
57. scope에 들어갈 내용들은 공백을 통해 구분되며. https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps 여기서 scope 들을 확인 할 수 있다.
59. new URLSearchParams(obj).toString() 에 의해서 config 객체가 'client_id=Ov23likg48vVO20LMAdg&allow_signup=false&scope=read%3Auser+user%3Aemail'로 변환된다.
라인정리 다시한번할것
*/