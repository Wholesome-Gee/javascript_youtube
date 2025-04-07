init.js부터 읽을것 
사용 된 모듈 
npm i --save-dev @babel/core @babel/preset-env @babel/node nodemon
npm i express
npm i express-session
npm i morgan
npm i connect-mongo
npm i pug
npm i mongoose
npm i bcrypt
npm i dotenv
폴더구조
- JS_YOUTUBE
  - .vscode
  - node_modules
  - .gitignore
  - .env
  - babel.config.json
  - index.html
  - package-lock.json
  - package.json
  - README.md
  - src
    - models
      - User.js
      - Video.js
    - routers
      - rootRouter.js
      - userRouter.js
      - videoRouter.js
    - views
      - mixin
      - parts
    - controllers
      - userController.js
      - videoController.js
    - init.js
    - db.js
    - index.js (server.js)
    - middlewares.js


# 🔥 [풀스택] 유튜브 클론코딩 (노마드코더) 🔥
## #2 SET UP ⭐
### 2.0 ~ 2.4 ✏️
**✔️ 초기작업**
- `npm init`
- express 설치 `npm i express`
- babel 설치 `npm i --save-dev @babel/core @babel/preset-env @babel/node nodemon`
  - nodemon은 개발중에 코드 수정을 할 때마다 자동으로 서버를 재시작해줌
  - babel.config.json 파일 생성
    ```json
    {
      "presets": ["@babel/preset-env"]
    }
    ```
- package.json → scripts → `"dev": "nodemon --exec babel-node src/server.js"`
- index.html , src/server.js 파일생성
- .gitignore 파일 생성
  ```
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
- package.json → scripts → `"dev": "nodemon --exec babel-node src/server.js"` → src/server.js 파일 생성 → `import express from 'express';`
- src/server.js 
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
- src/server.js
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
    // src/routers/rootRouter.js
    import express from 'express'
    import { homeVideo, joinUser } from '../controllers/videoController';

    const rootRouter = express.Router(); // 라우터 생성

    rootRouter.get('/',homeVideo); // 라우터 등록
    rootRouter.get('/join',joinUser); // 라우터 등록

    export default rootRouter

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
- src/server.js → `import OOORouter from 'OOORouter경로' → app.use('/OOO', OOORouter)
  ```js
  // src/server.js
  ...
  import rootRouter from './routers/rootRouter';
  import userRouter from './routers/userRouter';
  import videoRouter from './routers/videoRouter';
  ...
  // 전역요청 (어떤 url이든 무조건 실행됨 )
  app.use(morgan('dev')) // morgan은 항상 전역요청 중 제일 맨위로 쓰자.
  app.use('/',rootRouter)
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
- src/server.js(server.js)에 아래 내용 추가
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
    - 3. 태그의 속성에서 #{}를 사용할땐 백틱기호를 붙혀야한다.
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
  - `<link rel="stylesheet" href="https://unpkg.com/mvp.css">` 이걸 html head에 붙혀넣기
---
## #6 MongoDB and Mongoose ⭐
### 6.0 ~ 6.28 ✏️
**✔️ 상대경로와 절대경로**
  ```js
  // 현재경로 localhost:4000/video/1
  <a href="/edit">링크</a> // localhost:4000/edit
  <a href="edit">링크</a> // localhost:4000/video/edit
  <a href="1/edit">링크</a> // localhost:4000/video/1/edit
  ```
**✔️ 서버로 post 요청 보내기**
  - post 라우터 등록 → 미들웨어 생성
  - res.redirect('url') url로 유저를 돌려보냄
  - form태그를 사용해 서버로 post 요청을 보낸 데이터를 확인하는 방법 (form 내 input에는 name속성이 필수)
    - src/server.js에서 `app.use(express.urlencoded({ extended: true }));` 추가
      - express가 post 미들웨어의 req.body를 읽을 수 있도록 설정하는 작업으로 다른 app.use('router경로')보다 우선작성되어야함
    - src/routers에 post 라우터 등록 
      - `app.post('url',콜백함수)
    - src/controllers에 post 미들웨어 생성
    ```javascript
    // form태그에서 localhost:4000/video/123456/edit로 post요청했다고 가정.
    // stc/index.js
    app.use(express.urlencoded({extended: true}));
    app.use('/videos',videoRouter)
    
    // src/routers/videoRouter.js
    rootRouter.post('/:(\\d+)/edit',postEditVideo);
  
    // src/controllers/videoController.js
    export const postEditVideo = (req, res) => {
      console.log(req.body)
      res.redirect('/videos')
    }
    ```
**✔️ mongoDB 설치하기**
- chocolatey 설치
- powershell 관리자모드 실행 후 `choco install mongodb` (이후 a+enter로 빠른설치)
- powershell 관리자모드에서 `choco install mongosh` (이후 a+enter로 빠른설치) 
- powershell에 `mongosh` 입력 후 Connecting to: 다음에 나오는 `mongodb://db주소/` 까지 복사
- 프로젝트 콘솔에 `npm i mongoose`
- src/db.js 생성
  ```js
  import mongoose from 'mongoose';
  // mongoose에게 mongoDB 좌표 찍어주기
  mongoose.connect('mongodb://127.0.0.1:27017/geetube')
  // mongoose로 mongoDB 연결
  const db = mongoose.connection;
  function handleError(error){
    console.log("❌ DB Error: "+error);
  }
  function handleConnected(){
    console.log('✅ Connected to DB');
  }
  // 연결 시 event
  db.on('error', handleError); // db 접속 에러시 event
  db.once('open', handleConnected) // db 연결 성공 시 event
  ```
- src/server.js에 `import './db.js'`
- mongo cli
  - `mongosh` → db 켜기
    - `help` → 도움말
    - `show dbs/collections` → db/collection 보기
    - `use dbs/collections` → db/collection 접속
      - `db.collectionName.find() → document(data) 조회
      - `db.collectionName.deleteMany({}) → document(data) 삭제
  - `quit` → db 끄기

**✔️ data의 Schema 정의하기**
- src/models/스키마이름.js 생성
  ```js
  import mongoose from "mongoose";

  const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, minLength: 5 },
    createdAt: { type: Date, default: Date.now } // Date.now() 아님 Date.now임..
    hashtags:[{ type:String, trim: true }], 
    meta: {
      views: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
    }
  })

  const Video = mongoose.model("Video", videoSchema);
  export default Video;
  ```
- src/controllers/OOOController.js에서 스키마 import
- src/controllers/OOOController.js에서 mongoose Queries를 활용
- https://mongoosejs.com/docs/schematypes.html 스키마 타입에 대한 문서 
  ```js
  // src/controllers/videoController.js
  import Video from "../models/Video";

  export const getHomeVideo = async (req, res) => {
    try {
      const videos = await Video.find({}) // Video.exists, Video.findById, Video.findByIdAndUpdate 등 다양한 스키마 함수들이 있다.
      res.render('home', { pageTitle:'Home',videos });
    } catch (err) {
      return res.render(err.message)
    }
  }
  export const postUploadVideo = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
      /*
      const newVideo = Video({
        title,
        description,
        createdAt: Date.now(),
        hashtags:hashtags.split(',').map(item=>`#${item}`),
        meta: {
          views: 0,
          rating: 0,
        }
      })
      await newVideo.save();  // 데이터를 만들고 저장하는 과정
      아래방법이 더쉬움
      */
      await Video.create({
        title,
        description,
        hashtags:hashtags.split(',').map(item=>`#${item}`),
      })
    } catch (err){
      return res.render('upload', { pageTitle: 'Upload Video', errorMessage: err._message })
    }
    export const postEditVideo = async (req, res) => {
      const { id } = req.params;
      const { title, description, hashtags } = req.body;
      const video = await Video.exists({ _id: id }) // Video.exists({conditions})
      if(!video) {
        return res.render('404', { pageTitle: 'Video not found.' })
      }
      await Video.findByIdAndUpdate(id, {
        title, description, hashtag: hashtags.split(',').map( item => item.startsWith('#') ? item : `#${item}`)
      })
      return res.redirect(`/videos/${id}`)
    }
  }
  ```
- src/server.js에서 `import '스키마이름.js경로'`
- CRUD는 Create, Read, Update, Delete  

**✔️ src/server.js와 src/init.js로 구분하기**
- src/server.js에는 server(express)에 대한 기능만 작성하고
  src/init.js에는 서버 open기능 및 스키마 import구문 작성
- src/init.js 생성
  ```js 
  // 아래 코드들을 src/server.js에서 추출해오기
  import './db' 
  import './models/Video.js'  
  import app from './index.js'  

  let PORT = 4000 

  app.listen(4000, ()=>{ 
    console.log(`✅ 'index.js': http://localhost:${PORT} 🚀`)
  }) // 포트번호, 콜백함수
  ```
- src/server.js에 `export default app` 추가 
- package.json → scripts → `"dev": "nodemon --exec babel-node src/init.js"` 교체  

**✔️ Mongoose 미들웨어**  
- Mongoose 미들웨어를 통해 데이터가 db에 저장,업데이트 되기 전 무언가를 실행할 수 있다.
- 미들웨어는 스키마가 생성되기전에 작성되어야함
- Mongoose 미들웨어는 모든 Mongoose function에 적용에 되지 않으므로,  
  이러한 경우에는 Mongoose static으로 Statics 미들웨어를 만들어 사용한다.
  ```js
  // src/models/Video.js
  // mongoose 미들웨어 ( 스키마 생성 전에 작성되어야 함 ) #6.23 참고
  videoSchema.pre('save', async function (){
    //videoSchema가 'save' 되기 전에 실행되는 미들웨어, this는 저장될 data를 의미한다.
    this.hashtags = this.hashtags[0].split(',').map( item => item.startsWith('#') ? item : `#${item}`)
  })

  // mongoose 커스터마이징 미들웨어 ( = statics middleware) #6.24 참고
    // Schema.pre는 Model.create()에는 적용되지만, Model.findByIdAndUpdate() 등에는 적용되지 않기에 statics middleware를 만듬
    videoSchema.static('formatHashtags', (hashtags)=>{
      return hashtags.split(',').map( item => item.startsWith('#')? item : `#${item}`)
    })
    // 사용방법은 express middleware의 controller에서 Model이름.formatHashtags

  // 스키마 생성
  const Video = mongoose.model("Video", videoSchema);
  export default Video;
  ```

**✔️ URL Query 받는방법**
- url query는 localhost:4000/search?keyword=react 에서 ? 이후 나오는것들을 쿼리라고 한다.
- req.query를 통해 조회가능하다. #6.26 참고

---
## #7 ⭐
### 7.2 Creating Account Part Three ✏️ 
**✔️ 비밀번호 hashing 하는 방법**
- 바이크립트 설치 `npm i bcrypt` 
- 바이크립트는 입력값(원본 패스워드)를 해싱된 출력값(해싱 패스워드로)으로 변환해준다. 
- 입력값이 같다면 출력값도 같다.
- ```js
  import bcrypt from "bcrypt";
  userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5); // this.password는 입력값, 5는 해싱횟수
  });
  ```
---
### 7.3 Status Codes ✏️
**✔️ Status Codes(상태코드 400,404...) 써야하는 이유**
- 상태코드를 사용함으로써 유저의 요청이 잘된 요청인지 잘못된 요청인지 브라우저가 인식함.
- 예를들어, 회원가입시 비밀번호입력과 비밀번호 재입력이 다르게 전송될 경우,   
  상태코드를 입력하지 않으면 비밀번호를 저장하시겠냐는 팝업창이 나옴.  
- 상태코드 종류 : https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C
---
### 7.6 Login part Two ✏️
**✔️ 유저가 입력한 비밀번호와 데이터베이스의 비밀번호 비교하는방법 (bcrypt.compare())**
```js
// password는 유저의 입력값, user.password는 db에 저장되있는 해싱된 password
const ok = await bcrypt.compare(password, user.password);
```
---
### 7.7 Session and Cookies part One ✏️
**✔️ Session으로 로그인한 유저 기억하기**
- `npm i express-session`
- src/sever.js에 `import session from 'express-session'`
  ```js
  import session from "express-session";
  app.use(
    session({
      secret: "Secret KEY",
      resave: true,
      saveUninitialized: true,
    })
  );
  /*
  app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
      console.log(sessions);
      next();
    });
  });
  */
  ```

  서버가 브라우저에게 session을 부여해주고, 서버는 부여한 session을 메모리에 담아둔다.
  브라우저는 sessionStorage에 session을 담고, cookie에 session ID를 담는다
  이후, 서버에 요청할때마다 cookie를 함께 서버에 보낸다.
  서버는 cookie에 담긴 sessionID를 확인하여 서버 메모리에 있는 session중 sessionID가 일치하는 session을 찾는다.

  `npm i connect-mongo` 휘발성인 session을 mongoDB와 연결
  `import MongoStore from 'connect_mongo'`
  `app.use(session({ store: MongoStore.create({ mongoUrl:"mongodb주소" }) })) // session이 express(server)의 메모리에 저장되는것을 우리의 DB에 저장되도록 해준다. 서버는 재시작될 때마다 메모리가 초기화됨

  #7.14
  f12 - application - cookie 에대해
    secret : express가(server) 쿠키를 발급했음을 사인하는 스트링
    domain : 쿠키가 어디서 만들어졌는지, 어디로 보내져야하는지 적혀있음
    Expires/Max-Age : 쿠키의 만료되는 날짜 (session이라고 적혀있으면 만료날짜가 설정되지 않은것)
    ```js
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false, 
      saveUninitialized:false,  
      store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/geetube' }),
      cookie: {
        maxAge: 86400000 * 1
      }
    }))
    ```
  
  #7.14~7.15
  .env에 대해
  `npm i dotenv`
  init.js → `import 'dotenv/config`
  `let secret = process.env.SECRET_KEY;`
  
#7.16
소셜로그인 구현(깃헙)
흐름 : 깃헙로그인을하려면 - 유저를 깃헙으로보냄 - 유저는 깃헙으로 이메일,패스워드 등을 넣음 그리고 정보공유를 승인함 - 깃헙이 유저와 유저의 토큰을 우리 웹사이트로 돌려보냄
세팅 : 깃헙 로그인 - 우측프로필 클릭 - Setting - developer settings - OAuth Apps - new OAuth app - 정보입력( Application name: Geetube, Homepage URL: http://localhost:4000, Authorization callback URL: http://localhost:4000/users/github/finish )
  -Authorization callback URL는 유저가 OAuth 승인을 하면 Github가 user와 token을 해당 주소로 보내준다. server는 해당 주소의 router를 생성하여 token을 받아야한다. #7.17

사용법
userController.js의 startGithubLogin, finishGithubLogin 를 참고
유저를 깃허브에 보냄
깃허브에서 유저와 코드를 보내줌
깃허브에 코드와 클라이언트 id등을 또 보냄
깃허브에서 토큰을 보내줌
토큰안에 액세스토큰을 깃허브에 또보냄



1.유저를 깃헙으로보냄 (GET https://github.com/login/oauth/authorize?client_id="OAuthApp의 클라이언트아이디입력"&allow_signup=false&scope=read%3Auser+user%3Aemail)
  - allow_signup=false는 github유저가 아니면 github 회원가입을 시킬건지 여부 #7.16
  - scope에 대한설명은 #7.17
2.깃헙으로부터 유저의 토큰을 받기
  - src/routers/userRouter.js에 `userRouter.get('/github/finish',finishGithubLogin)`
  - src/controllers/userController.js에 `export const finishGithubLogin = (req, res) => {}`

#7.19
---
 
#8.1
로그인하지 않은 유저가 edit-profile url로 이동할 수 없도록 미들웨어로 보호하는방법
로그인한 유저가 login url로 이동할 수 없도록 미들웨어로 보호하는 방법
Router.route('/routeURL').all(모든 request 메서드에 실행될 미들웨어).get(getController).post(postController)

#8.2
userControllers의 postEdit 수정

#8.3 
const updatedUser = Model.findByIdAndUpdate(id,{name,email,username,location},{new:true})에서 new true는  
원래 findBtIdAndUpdate는 업데이트 전 data를 리턴하는데 {new:true}로 인해서 업데이트 후 data를 리턴함.

#8.4~8.5
비밀번호변경 페이지 작업
- userControllers의 getChangedPassword와 postChangePassword 작업
- 깃허브로 로그인한 사람은 특정페이지 url로 이동할 수 없도록 미들웨어로 보호하는 과제

#8.6~8.7
File 업로드하는방법
`npm i multer`
html input file추가 `input(type='file' name='avatar' accept='image/*')`  
html input file을 post하는 form에 `enctype="multipart/form-data"` 추가  
uploadFiles 미들웨어 추가 
- .gitignore에 /uploads 추가   
```js
// src/middlewares.js
export const uploadFiles = multer({ dest: "uploads/" })`
```
- 전역요청 추가
```js
// server.js
app.use('/uploads',express.static('uploads'))
```
post route에 middleware 추가 `app.use(uploadFiles.single('input file's name), controller)`    
controller작성
```js 
export const postEdit = async (req,res) => {
  ...
  const {file} = req
  ...
  const updatedUser = await User.findByIdAndUpdate(id,{
    ...
    avatarUrl: file ? file.path : req.session.avatarUrl
  },{new: true})
  ...
}
```











---
express에 관해서
express.urlencoded({property})에서 property종류 
1. urlencoded 
  - boolean값을 주어야한다. form으로 부터 받은 데이터를 express가 읽을 수 있도록 하는 역할.
2. limit
  - string이나 number 값을 주어야한다. 요청 본문에서 허용되는 최대 바이트 수를 설정한다. (기본값 100kb)
3. type
  - 욫ㅓㅇ


session 과 cookie의 차이점
- session은 서버(express)에서 유저의 정보를 저장하는 방법으로 유저가 웹사이트를 닫거나 일정 시간동안 마우스,키보드 움직임이 없으면 종료된다.
- cookie는 웹(app)에서 유저의 정보를 저장하는 방법으로 만료날짜가 지나면 삭제된다.