import express from 'express';
import morgan from 'morgan';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express(); // 서버생성코드
let PORT = 4000


// 전역요청 (어떤 url이든 무조건 실행됨 )
app.use(morgan('dev')) // morgan은 항상 전역요청 중 제일 맨위로 쓰자.
app.use('/',globalRouter)
app.use('/users',userRouter)
app.use('/videos',videoRouter)



app.listen(4000, ()=>{
  console.log(`'index.js': http://localhost:${PORT} 🚀`)
}) // 포트번호, 콜백함수
