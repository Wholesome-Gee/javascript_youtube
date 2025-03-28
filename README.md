# 🔥 [풀스택] 유튜브 클론코딩 (노마드코더) 🔥
## #2 SET UP ⭐
### 2.0 ~ 2.4 ✏️
**✔️ 초기작업**
- `npm init`
- `npm i express`
- `npm i --save-dev @babel/core @babel/preset-env @babel/node nodemon`
  - nodemon은 개발중에 코드 수정을 할 때마다 자동으로 서버를 재시작해줌
  - babel.config.json 파일 생성
    ```json
    {
      "presets": ["@babel/preset-env"]
    }
    ```
- package.json → scripts → `"dev": "nodemon --exec babel-node src/index.js"`
- index.html , src/index.js , index.css 파일생성
- .gitignore 파일 생성
  ```js
  /node_modules
  ```
- `git init`
- `git remote add origin '레포지토리 주소'`
- `git branch -m main`
- `git add .`   
- `git commit -m '프로젝트 생성'` 
- `git push origin main`
---
## #3 INTRODUCTION TO EXPRESS ⭐
### 3.0 ~ 3.10 ✏️
**✔️ 서버 만들기**
- #2에 있는 세팅을 먼저 끝내 놓기
- `npm i express`
- src/index.js →  `import express from 'express';`
  - 혹은 package.json → scripts →  
    `"dev": "nodemon --exec babel-node src/server.js"` →  
    src/server.js 파일 생성 →  `import express from 'express';`
- src/index.js(src/server.js) 
  ```js
  import express from 'express';

  const app = express(); 
  let PORT = 4000

  // 미들웨어 정의 ( 미들웨어 = 중간에 오는 콜백함수 )
  function middleWareCallback(req, res, next){
    console.log('middleWareCallback 실행');
    next(); // 다음 콜백함수 호출
  }
  function privateCallback(req,res,next){
    if(req.url === '/protected'){
      return res.send("/protected url로 접근할 수 없습니다.")
    } else {
      next();
    }
  }
  // 파이널웨어 정의 ( 파이널웨어 = 마지막에 오는 콜백함수 )
  function finalWareCallback(req, res, next){
    console.log('finalWareCallback 실행')
    res.end(); // res.send('message'), res.status(200).send('message'), res.sendFile()...
  }

  // app.use() 전역요청 (어떤 url이든 무조건 실행됨 )
  app.use(privateCallback) 

  // app.get() GET요청
  app.get('/', middleWareCallback, finalWareCallback) //url,콜백함수

  app.listen(4000, ()=>{
    console.log(`'index.js': http://localhost:${PORT} 🚀`)
  }) // 포트번호, 콜백함수
  ```
---
### 3.11 External Middlewares ✏️
**✔️ morgan middleWare 사용하기**
- `npm i morgan`
- morgan middleWare는 서버에 요청이 들어올 시 요청,응답정보를 보여준다.  
  ex) `GET / 304 2.374 ms - -`
- src/index.js(src/server.js)
  ```js
  app.use(morgan('dev'))
  ```
---
## #4 ROUTERS ⭐
### 4.0 ~ 4.8 ✏️
**✔️ Router 만드는 방법**
- 이해 안될땐 #4.4, #4.5 Recap영상 참조
- src/routers/OOORouter.js → 라우터 생성 → 라우터 등록 → export default 라우터
  - parameter에 '/:videoId(\\d+)' 는 숫자(digit)로만 이루어진 파라미터를 받을 수 있다. 
  - (\d+)에서 \을 특수기호가 아닌 문자열로 인식시켜주기위해 \를 하나 더 붙힘.
    ```js
    // src/routers/globalRouter.js
    import express from 'express'
    import { homeVideo, joinUser } from '../controllers/videoController';

    const globalRouter = express.Router(); // 라우터 생성

    globalRouter.get('/',homeVideo); // 라우터 등록
    globalRouter.get('/join',joinUser); // 라우터 등록

    export default globalRouter

    // src/routers/userRouter.js
    import express from 'express'
    import { editUser, removeUser } from '../controllers/userController';

    const userRouter = express.Router(); // 라우터 생성

    userRouter.get('/edit',editUser); // 라우터 등록
    userRouter.get('/remove',removeUser); // 라우터 등록

    export default userRouter

    //src/routers/videoRouter.js
    import express from 'express';
    import { editVideo, watchVideo } from '../controllers/videoController';

    const videoRouter = express.Router(); // 라우터 생성

    videoRouter.get('/:videoId(\\d+)watch', watchVideo); // 라우터 등록
    videoRouter.get('/:videoId(\\d+)dedit', editVideo); // 라우터 등록

    export default videoRouter;
    ```
- src/controllers/OOOController.js → 미들웨어 생성
  ```js
  // src/controllers/userController.js
  // 미들웨어 생성
  export const joinUser = (req,res) => res.send("Join Page");
  export const editUser = (req,res) => res.send("Edit User Page");
  export const removeUser = (req,res) => res.send("Remove User Page");
  
  // src/controllers/videoController.js
  // 미들웨어 생성
  export const homeVideo = (req, res) => res.send("Home Page"); 
  export const watchVideo = (req, res) => res.send("Watch Video Page");
  export const editVideo = (req, res) => res.send("Edit Video Page");
  ```
- src/index.js(src/server.js) → `import OOORouter from 'OOORouter경로' → app.use('/OOO', OOORouter)
  ```js
  // src/index.js(src/server.js)
  ...
  import globalRouter from './routers/globalRouter';
  import userRouter from './routers/userRouter';
  import videoRouter from './routers/videoRouter';
  ...
  // 전역요청 (어떤 url이든 무조건 실행됨 )
  app.use(morgan('dev')) // morgan은 항상 전역요청 중 제일 맨위로 쓰자.
  app.use('/',globalRouter)
  app.use('/users',userRouter)
  app.use('/videos',videoRouter)
  ...
  app.listen(4000, ()=>{
    console.log(`'index.js': http://localhost:${PORT} 🚀`)
  }) // 포트번호, 콜백함수
  ```
---
## #5 TEMPLATES (PUG) ⭐
### 5.0 ~ 5.10 ✏️
**✔️ PUG 세팅하기**
- pug는 Node.js에서 사용되는 마크업 언어 템플릿 엔진.
- `npm i pug`
- src/index.js(server.js)에 아래 내용 추가
  ```js
  // view engine을 pug로 세팅
  app.set('view engine', 'pug') 
  // view폴더 위치 세팅 (process.cwd()는 package.json의 위치)
  app.set('views',process.cwd() + '/src/views') 
  ```
- src안에 view폴더 생성 후 view폴더 내부에 pug 템플릿 생성 (ex. home.pug )
- 템플릿을 적용할 미들웨어의 실행문에 `res.render('템플릿')` 추가  
  ```js
  // src/controllers/videoController.js
  const homeVideo = (req,res) => res.render('home');
  ```
**✔️ pug 이용방법**
- html 작성과 비슷 하나 꺽쇠 기호를 사용하지 않는다. (들여쓰기로 부모/자식태그 구분)
- html 태그의 속성은 ()를 사용한다 
  - ex ) `a(href="www.naver.com")`
- pug에서 자바스크립트를 사용할 수 있다. 
  - ex ) `footer #{new Date().getFullYear()}`
- 단순 복붙하는 태그들은 src/view/parts/OOO.pug 안에 넣어놓고 사용한다. (component개념)
  - ex) src/view/parts/footer.png → `footer #{new Date().getFullYear()}`
- parts는 includes parts/OOO 으로 사용할 수 있다.
  - ex) src/view/base.pug → includes parts/footer
- pug 템플릿끼리 상속(extends) 가능하다.
  - ex) base.pug작성 → home.pug → extends base.pug
- 자식 템플릿은 block을 이용해 부모 템플릿에서 OverWrite 할 수 있다. (아래 예시 참조)
- 미들웨어에서 템플릿에 변수를 전달 할 수 있다.
  - ex) const homeVideo = (req,res) => res.render('home', { pageTitle:'Home' })
  - 미들웨어에서 받은 변수 사용방법 
    - 1. title=pageTitle
    - 2. title #{pageTitle}에 오신것을 환영합니다. (변수+텍스트 조합)
- pug에서 조건문 사용하기 (#5.7 참고)
  ```js
  if pageTitle==='GEETUBE'
    title=pageTitle
  else 
    null
  ```
- pug에서 Array(Object) 나열하기
  ```js
  each item in array(object)
    span=item
  else 
    span Array is empty
  ```
- pug에서 mixin 사용하기 (아래 예시, #5.9 참고)
- 코드정리
```js
// src/controllers/videoController.js
export const homeVideo = (req, res) => {
  const user = { name:'gee' }
  const videos = [
    { 
      title:'Video1', 
      id: 1 
    },
    { 
      title:'Video2', 
      id: 2
    },
  ]

  res.render('home',{ pageTitle: 'Home', videos, user });
}

// src/views/base.pug
doctype html
html(lang="en")
  head
    title #{pageTitle} | Geetube
  body 
    header
      if user.name  
        p Hello #{user.name}!
      else 
        p No User

      h1=pageTitle

    section 
      block contents
  include parts/footer

// src/views/home.pug
extends base
include mixins/video

block contents 
  h2 Welcome here you will see the trending videos.
        each video in videos
          +video(video)
        else 
          li Sorry nothing found.

// src/views/parts/footer.pug
footer &copy; #{new Date().getFullYear()} Geetube

// src/views/mixins/video.pug
mixin video(video)
  div
    h4=video.title
    ul  
      li #{video.rating}/5.
      li #{video.comments} comments.
      li Posted #{video.createdAt}
      li #{video.views} views.
```


- mvp.css라는걸 사용하면 html코드를 작성하는 중에 기본 스타일보단 조금 더 나은 스타일을 적용할 수 있다. (CSS의 임시방편)
