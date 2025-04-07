import express from 'express';  // npm i express   
import morgan from 'morgan'; // npm i morgan
import session from 'express-session'; // npm i express-session
import MongoStore from 'connect-mongo'; // npm i connect-mongo
import { localsMiddleware } from './middlewares';
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

// express()로 서버(express) 생성 #3.0
const app = express(); 


// html helper 설정(pug) #5.1
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')
/* 
14. express에게 html view engin을 pug로 사용한다고 알림.
15. express는 views 폴더 안에서 html을 찾기 때문에 프로젝트 내 views폴더의 경로를 설정해줌. 
    process.cwd()는 package.json파일의 경로를 리턴한다.
*/


// 전역요청 (모든 request에 순차적으로 실행됨)
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized:false,  
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/geetube' }),
  cookie: {
    maxAge: 86400000 * 1
  }
}))
/* 현재 Session db에 있는 모든 session을 조회하는 방법
app.use((req,res,next)=>{ 
  req.sessionStore.all((error,sessions)=>{ 
  console.log(sessions); next() 
})})
  
*/
app.use(localsMiddleware);
app.use('/uploads',express.static('uploads'))
app.use('/',rootRouter)
app.use('/users',userRouter)
app.use('/videos',videoRouter)
/*
43 → 어떤 도메인이든 localsMiddleware.js를 실행
44 → 도메인 /uploads는 uploads폴더를 볼 수 있다.
45 → 도메인 / 는 rootRouter로 이동
46 → 도메인 /users 는 userRouter로 이동
47 → 도메인 /videos 는 userRouter로 이동
*/
export default app

// 🚀 다시 src/init.js로 이동