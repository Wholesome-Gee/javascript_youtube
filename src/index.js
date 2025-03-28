import express from 'express';
import morgan from 'morgan';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express(); // 서버생성코드
let PORT = 4000

// html 템플릿 설정 (pug)
// pug 템플릿은 views폴더 안에 있어야한다.
app.set('view engine', 'pug') // view engine을 pug로 세팅
app.set('views',process.cwd() + '/src/views') // view폴더 위치 세팅 (process.cwd()는 package.json의 위치)
// 전역요청 (어떤 url이든 무조건 실행됨 )
app.use(morgan('dev')) // morgan은 항상 전역요청 중 제일 맨위로 쓰자.
app.use('/',globalRouter)
app.use('/users',userRouter)
app.use('/videos',videoRouter)



app.listen(4000, ()=>{
  console.log(`'index.js': http://localhost:${PORT} 🚀`)
}) // 포트번호, 콜백함수
