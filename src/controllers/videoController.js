import Video from "../models/Video";

// 미들웨어 생성
export const getHomeVideo = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({createdAt:'desc'})
    // Model.find({}).sort({category:'desc'})로 category의 내림차순 정렬을 할 수 있다. #6.26참고
    res.render('home', { pageTitle:'Home',videos });
  } catch (err) {
    return res.render(err.message)
  }
}

export const getSearchVideo = async(req, res) => {
  const { keyword } =req.query; // URL의 쿼리를 req.query로 받을 수 있다.
  let videos = [];
  if(keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'), // 뭔지모를땐 #6.27 참고
      }
    })
  }
  res.render('search', { pageTitle:'Search', videos })
}

export const getUploadVideo = (req, res) => res.render('upload',{ pageTitle: 'Upload Video' });

export const getWatchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if(!video) {
    return res.render('404', { pageTitle: 'Video not found.' })
  }
  res.render('watch',{ pageTitle: video.title, video });
}

export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if(!video) {
    return res.render('404', { pageTitle: 'Video not found.' })
  }
  res.render('edit',{ pageTitle:`Editing`, video });
}

export const getDeleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect('/');
}



// post
export const postUploadVideo = async(req, res) => { 
  // const { title,hashtags,description } = req.body;
  // /*
  // const newVideo = new Video({
  //   title, description, createdAt: Date.now(), hashtags:hashtags.split(',').map(item=>`#${item}`),
  //   meta: { views: 0, rating: 0 }
  // })
  // await newVideo.save()
  // 아래는 보다 나은 방법
  // */
  // try {
  //   await Video.create({
  //     title, description,
  //     hashtags: Video.formatHashtags(hashtags)
  //   })
  //   res.redirect('/')   
  // } catch (error) {
  //   res.render('upload',{ pageTitle: 'Upload Video', errorMessage: error._message });
  // }
}

export const postEditVideo = async (req, res) => {
  // const { id } = req.params;
  // const { title, description, hashtags } = req.body;
  // const video = await Video.exists({ _id: id })

  // if(!video) {
  //   return res.render('404', { pageTitle: 'Video not found.' })
  // }
  
  // /*
  // const video = await Video.findById(id)
  // video.title = title;
  // video.description = description;
  // video.hashtags = hashtags.split(',').map( item => item.startsWith('#') ? item : `#${item}`)
  // await video.save()
  // findById로 video를 찾고 await video.save()로 video를 저장
  // */
  // await Video.findByIdAndUpdate(id, {
  //   title, description,
  //   hashtags: Video.formatHashtags(hashtags)
  // })
  return res.redirect(`/videos/${id}`)
}
