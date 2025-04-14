import express from 'express';  // npm i express   
import morgan from 'morgan'; // npm i morgan
import session from 'express-session'; // npm i express-session
import MongoStore from 'connect-mongo'; // npm i connect-mongo
import flash from 'express-flash'; // npm i express-flash
import { localsMiddleware } from './middlewares';
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import apiRouter from './routers/apiRouter';

// express()로 서버(express) 생성 #3.0
const app = express(); 


// html helper 설정(pug) #5.1
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')
/* 
15. express에게 html view engin을 pug로 사용한다고 알림.
16. express는 views 폴더 안에서 html을 찾기 때문에 프로젝트 내 views폴더의 경로를 설정해줌. 
    process.cwd()는 package.json파일의 경로를 리턴한다.
*/


// 전역 middleware  (모든 request에 순차적으로 실행됨)
app.use(morgan('dev'))  
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET, // 세션 보안키
  resave: false, 
  saveUninitialized:false,   
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/geetube' }),
  cookie: {
    maxAge: 86400000 * 1
  }
}))
app.use(flash())
/*
25. morgan은 server에 들어오는 HTTP 요청을 콘솔에 보여주는 라이브러리다. npm i morgan
26. controller에서 req.body를 사용하기위한 middleware
27. 모든 HTTP요청에 세션을 부여해준다.
29. resave가 true이면 모든 HTTP요청에 세션을 다시 저장한다(서버 성능 저하),    
    resave가 false이면 session이 수정되었을 때 다시 저장한다. (권장)
30. saveUninitialized가 true이면 초기화되지 않은 session도 저장한다.
    saveUninitialized가 false이면 초기화 된 session만 저장한다.
31. session을 mongoDB 데이터베이스에 저장한다. (원래 session은 메모리에 저장됨)
32. cookie는 서버가 브라우저측 부여하여 브라우저에 저장되는 작은 데이터조각이다. 
33. cookie의 유효기간을 1일로 설정 (86400000ms는 1일이다.)
38. flash()는 flash message를 보여주는 middleware이고, 
    controller 에서 req.flash()가 가능하다. (middlewares.js에서 사용했음)
*/

/* 현재 Session db에 있는 모든 session을 조회하는 방법
app.use((req,res,next)=>{ req.sessionStore.all((error,sessions)=>{ console.log(sessions); next() })})  */

/* 전역 요청 middleware */
app.use(localsMiddleware);
app.use('/uploads',express.static('uploads'))
app.use('/assets',express.static('assets'))
app.use('/',rootRouter)
app.use('/users',userRouter)
app.use('/videos',videoRouter)
app.use('/api',apiRouter)
/*
54. express.static('uploads')는 우리 프로젝트의 uploads라는 폴더에 접근할 수 있도록 해준다. 
*/
export default app

// 🚀 다시 src/init.js로 이동