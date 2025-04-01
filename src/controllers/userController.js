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
  const user = await User.findOne({username})
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

export const logoutUser = (req,res) => res.send("Join Page");
export const editUser = (req,res) => res.send("Edit User Page");
export const deleteUser = (req,res) => res.send("Delete User Page");
export const watchUser = (req,res) => res.send("Watch User Page");

/*
10. Model.exists(condition)은 조건에 맞는 document가 collection에 존재하는지 여부(true/false)를 리턴한다.
11. $or 연산자는 MongoDB의 연산자로 $or : [ {condition1},{condition2},.. ] 이런식으로 사용하며, 
    condition1과 condition2 ... 중 어느 하나라도 만족하는 document가 있다면 그 document를 리턴한다.
14. status(400) 상태코드를 입력해서 브라우저의 히스토리에 유저의 잘못된 요청이 기록되지 않게함.
39. Model.find({condition})은 condition과 일치하는 document를 배열로 리턴하고 Model.findOne({condition})은 객체로 리턴한다.
44. await bcrypt.compare(입력값, 비교값) 은 입력값과 비교값이 일치한지 비교 후 boolean데이터를 리턴한다.

라인정리 다시한번할것
*/