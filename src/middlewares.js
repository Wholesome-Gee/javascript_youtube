export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Geetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

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

/*
2. middleware에서 res에는 locals라는 property가 존재하는데, locals는 pug 템플릿과 연동되어있다.
  즉, res.locals.siteName='Geetube' 를 작성하면, 아무 pug template에서 #{siteName} 이렇게 사용할 수 있다.
3. res.session.loggedIn을 통해 request에서 session을 열어 loggedIn 을 가져올 수 있다. 가져온 loggedIn은 pug template에 loggedIn이라는 변수로 전달된다.
5. middleware를 정의했으면 꼭 next()를 해주자
*/