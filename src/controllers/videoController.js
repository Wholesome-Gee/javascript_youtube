import User from "../models/User";
import Video from "../models/Video";

// 미들웨어 생성
export const getHome = async (req, res) => {
  const videos = await Video.find({}).sort({createdAt:'desc'})
  return res.render('home', { pageTitle:'Home',videos });
}

export const getSearch = async(req, res) => {
  const { keyword } =req.query; 
  let videos = [];
  if(keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'), 
      }
    })
  }
  res.render('search', { pageTitle:'Search', videos })
}

export const getUpload = (req, res) => res.render('upload',{ pageTitle: 'Upload Video' });

export const getWatch = async (req, res) => {
  const { id } = req.params;
  const video = await (await Video.findById(id)).populate('owner') // populate는 덧붙히다 라는 뜻이 있다. #8.12영상을 참고
  if(!video) {
    return res.render('404', { pageTitle: 'Video not found.' })
  }
  res.render('watch',{ pageTitle: video.title, video });
}

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if(!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' })
  }
  res.render('edit',{ pageTitle:`Editing`, video });
}

export const getRemove = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect('/');
}


// post
export const postUpload = async(req, res) => { 
  const { title,hashtags,description } = req.body;
  const { file } = req
  const { _id } = req.session.user
  /*
  const newVideo = new Video({
    title,
    description,
    ...
  })
  await newVideo.save()
  */
  try {
    const newVideo = await Video.create({
      videoUrl: file.path,
      owner: _id,
      title,
      description, 
      hashtags: Video.formatHashtags(hashtags)
    })
    const user = await User.findById(_id)
    user.videos.push(newVideo._id)  // 비디오 생성할 때, 생성자 user의 데이터에 생성되는 video id를 추가 후 저장 #8.13
    user.save()
    res.redirect('/')   
  } catch (error) {
    res.status(400).render('upload',{ pageTitle: 'Upload Video', errorMessage: error._message });
  }
}

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id })

  if(!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' })
  }
  await Video.findByIdAndUpdate(id, {
    title, description,
    hashtags: Video.formatHashtags(hashtags)
  })
  return res.redirect(`/videos/${id}`)
}

/*
@ 미들웨어는 router의 controller중 중간 역할을 하는 콜백함수로 req, res, next 파라미터를 갖고있다.
@ 파이널웨어는 router의 controller중 마지막 콜백함수를 의미한다.
@ https://mongoosejs.com/docs/queries.html mongoose Model의 query에 대한 공식문서.

5. controller에서 비동기처리를(async,await..) 할 때, try catch를 꼭 써주자
6. Video.find({})로 db안에 있는 videos collection에 모든 document들을 가져오고, sort({createdAt:'desc'})})로 createdAt 내림차순으로 정렬한다. #6.26 참고
7. res.render('home', { pageTitle: 'Home', videos })는 home.pug를 렌더링 해주고, home.pug에 pageTitle, videos를 prop으로 전달한다.
14. URL의 쿼리를 req.query로 받을 수 있다.
17~21. await Video.find()에 condition을 걸 수 있다. 
      { title: {$regex: new RegExp(keyword, 'i'),}} 는 title이 keyword변수인 요소를 찾는 방법 #6.27 참고
29. URL의 parameter를 req.params로 받을 수 있다.
30. await Video.findById(id) 는 videos collection에서 Id가 id인 document를 return한다.
48. Video.findByIdAndDelete(id)는 videos collection에서 Id가 id인 document를 제거해준다.
49. res.redirect('/')는 유저를 home page로 이동시킨다.
55. req.body는 post된 form으로부터 data를 받아온다.
57~62. collection에 새로운 document를 추가하는 원시적 방법 (new Model(), Model.save())
65. await Model.create()는 collection에 document를 추가하는 좋은 방법
67. formatHashtags()는 커스텀된 모델이며, 전역 메서드로 어떤 mongoose query에서도 사용할 수 있다. (src/model/Video.js에 작성됨)
71. try catch에서 catch는 error를 갖고있으며, error._message로 error message의 간단한 내용을 확인할 수 있다.
78. await Model.exists({ _id: id })는 models collection에서 _id가 id인 document가 존재하는지 여부(true/false)를 리턴한다.
83. await Model.findByIdAndUpdate(id,{key:value})는 models collection에서 Id가 id인 document를 찾고, 해당 document를 {key:value}의 내용으로 업데이트 시켜준다.


🚀 src/controllers/userController.js로 이동
*/