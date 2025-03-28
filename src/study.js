// 본 파일을 index.js라고 생각하자

import express from 'express';
import morgan from 'morgan';

const app = express(); // 서버생성코드
let PORT = 4000

function middleWareCallback(req, res, next){
  console.log('미들웨어 콜백함수');
  next(); // 다음 콜백함수 호출
}
function finalWareCallback(req, res, next){
  console.log('파이널웨어 콜백함수')
  res.send('<h1>Homepage</h1>'); // res는 서버가 응답하는것. res.end(), res.status(200).send(), res.sendFile()...
}
function privateCallback(req,res,next){
  if(req.url === '/protected'){
    return res.send("<h1>Not Allowed</h1>")
  }
  next();
}

// 전역요청 (어떤 url이든 무조건 실행됨 )
app.use(morgan('dev')) 
app.use(privateCallback) 

// 요청 (GET)
app.get('/', middleWareCallback, finalWareCallback) //url,콜백함수

app.listen(4000, ()=>{
  console.log(`'index.js': http://localhost:${PORT} 🚀`)
}) // 포트번호, 콜백함수
