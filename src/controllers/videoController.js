import User from "../models/User";
import Video from "../models/Video";


// controller(=final ware) 생성
export const getHome = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({createdAt:'desc'}).populate('owner')
    return res.render('home', { pageTitle:'Home',videos });  
  } catch (error) {
    console.log(error);
    res.end()
  }
  
}
/*
7. async, await 사용 시 try,catch도 해주자 
8. Video.find({})로 db안에 있는 videos collection에 모든 document들을 가져오고, sort({createdAt:'desc'})})로 createdAt 내림차순으로 정렬한다. #6.26 참고
9. res.render('home', { pageTitle: 'Home', videos })는 home.pug를 렌더링 해주고, home.pug에 pageTitle, videos를 prop으로 전달한다.
*/

export const getSearch = async(req, res) => {
  const { keyword } = req.query; 
  let videos = [];
  if(keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'), 
        // $gt: 3 (3보다 크다)
      }
    }).populate('owner')
  }
  res.render('search', { pageTitle:'Search', videos })
}
/*
23. req.query는 url의 query를 받아온다. html에서 form(method=get...)안에 input(name='keyword'...)로부터 query를 받아서 keyword변수에 담는다.
28. $regex는 MongoDB에서 정규식을 사용하여 문자열을 검색할떄 사용한다.  new RegExp(keyword,'i')는 JS 내장 객체로 keyword를 포함하는 정규식을 생성한다. #6.27
29. $gt는 MongoDB의 비교연산자 중 하나로 '보다크다'라는 뜻이다. ( 비슷한걸로는 $lt, $gte(보다크거나작다) )
*/

export const getUpload = (req, res) => {
  res.render('upload',{ pageTitle: 'Upload Video' });
}

export const getWatch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate('owner') // populate는 덧붙히다 라는 뜻이 있다. #8.12영상을 참고
  if(!video) {
    return res.render('404', { pageTitle: 'Video not found.' })
  }
  res.render('watch',{ pageTitle: video.title, video });
}
/*
35. req.params로 url parameter를 받아온다.
36. video data의 owner property의 값인 owner의 mongoDB ID로 owner의 db를 가져와서 owner property값에 덮어 씌운다. 
    즉, video data의 owner property의 값이 owner의 db정보로 바뀐다.
    ( videoSchema의 videos에 ref="User"가 되어있기에 가능함.)
*/

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.user
  const video = await Video.findById(id);
  if(!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' })
  }
  if(String(video.owner) !== _id){ // 
    return res.status(403).redirect('/')
  } 
  res.render('edit',{ pageTitle:`Editing`, video });
}
/*
51. req.session 사전작업 => index.js 27번 라인 
56. video.owner는 objectId타입, req.session.user._id는 string타입 #8.14
*/

export const getRemove = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.user
  const video = await Video.findById(id)
  const user = await User.findById(_id)
  if(!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' })
  }
  if( String(video.owner) !== _id ) {
    return res.status(403).redirect('/')
  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id),1);
  user.save()
  return res.redirect('/');
}
/*
78. array.indexOf('value')는 value의 index 값을 리턴한다.
*/

// post
export const postUpload = async(req, res) => { 
  const { title,hashtags,description } = req.body;
  const { file } = req
  const { _id } = req.session.user
  try {
    const newVideo = await Video.create({
      videoUrl: file.path,
      owner: _id,
      title,
      description, 
      hashtags: Video.formatHashtags(hashtags)
    })
  /*
    const newVideo = new Video({ ... })
    await newVideo.save()
  */
    const user = await User.findById(_id)
    user.videos.push(newVideo._id)  
    user.save()
    res.redirect('/')   
  } catch (error) {
    res.status(400).render('upload',{ pageTitle: 'Upload Video', errorMessage: error._message });
  }
}
/*
88. req.body 사전작업 => index.js 26번 라인
89. req.file 사전작업 => middlewares.js 26,27번 라인
104. 비디오 생성할 때, 생성자 user의 데이터에 생성되는 video id를 추가 후 저장 #8.13
105. data변경 후 항상 save()
 */

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const { _id } = req.session.user
  const video = await Video.findById(id)
  if(!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' })
  }
  if(String(video.owner) !== _id){
    return res.status(403).redirect('/')
  } 
  await Video.findByIdAndUpdate(id, {
    title, description,
    hashtags: Video.formatHashtags(hashtags)
  })
  return res.redirect(`/videos/${id}`)
}
/*
126. video.owner는 MongoDB objectId타입, _id는 string타입 #8.14
*/


// 미들웨어는 router의 controller중 중간 역할을 하는 콜백함수로 req, res, next 파라미터를 갖고있다.
// https://mongoosejs.com/docs/queries.html  >  mongoose Model의 query에 대한 공식문서.



//🚀 src/controllers/userController.js로 이동
