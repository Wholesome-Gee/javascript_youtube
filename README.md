# 🔥 [풀스택] 유튜브 클론코딩 (노마드코더) 🔥
## #2 SET UP ⭐
### 2.0 Your First Node JS Project ✏️
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
- package.json → scripts → `"dev": "nodemon --exec babel-node index.js"`
- index.html / index.js / index.css 파일생성
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