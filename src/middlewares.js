import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Geetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};
/*
middleware에서 res에는 pug와 연동되어 있는 locals라는 property가 존재한다.
res.locals.siteName='Geetube' 를 작성하면, pug template에서 #{siteName} 이렇게 사용할 수 있다.
*/


export const loginOnlyMiddleware = (req,res,next) => {
  if(req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

export const publicOnlyMiddleware = (req,res,next) => {
  if(!req.session.loggedIn){
    next()
  } else {
    res.redirect('/')
  }
}

export const uploadAvatar = multer({ dest: "uploads/avatars/", limits:{fileSize:3000000}})
export const uploadVideo = multer({ dest: "uploads/videos/", limits:{fileSize:10000000}})
/*
26. multer는 NodeJS환경에서 파일 업로드를 처리하는 미들웨어이다. 
    html의 <input type='file'...>로 부터 들어온 파일은 dest의 경로에 저장된다. (경로에 적힌 폴더는 자동 생성됨.)
    html의 <input type='file'...>을 담고있는 form에는 enctype="multipart/form-data" 속성을 붙혀줘야한다.
    html의 <input type='file'...>로 부터 들어온 파일은 limits로 인해 제한을 받는다.
    이후 app.Route('/url').post( uploadAvatar.single('avatar'), postController ) 이런식으로 미들웨어를 사용해주고, controller에서 작업을 한다.
    controller에서 req.file.path로 업로드된 파일의 경로를 받아올 수 있다.(uploads/avatars/avatar.jpg)
    req.file.path로 받아온 경로를 db에 저장해주자. (db에는 파일이 저장되는것이 아닌 파일의 경로가 저장되는것)  (ex) videos collection안에 video.videoUrl=req.file.path
    이후 pug 템플릿에서 db에 있는 파일 경로를 사용한다. (ex) video(src='/'+video.videoUrl)
    sever.js에는 전역요청으로 app.use('/uploads',express.static('uploads')) 를 작성해주어야 한다.
*/