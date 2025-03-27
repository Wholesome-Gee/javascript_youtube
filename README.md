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
- index.js →  `import express from 'express';`
  - 혹은 package.json → scripts →  
    `"dev": "nodemon --exec babel-node src/server.js"` →  
    src/server.js 파일 생성 →  `import express from 'express';`
- index.js(server.js) 
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
### 3.11 External Middlewares
**✔️ morgan middleWare 사용하기**
- `npm i morgan`
- morgan middleWare는 서버에 요청이 들어올 시 요청,응답정보를 보여준다.  
  ex) `GET / 304 2.374 ms - -`
- index.js(server.js)
  ```js
  app.use(morgan('dev'))
  ````