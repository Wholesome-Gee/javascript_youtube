import express from 'express';  // npm i express
import morgan from 'morgan'; // npm i morgan
import session from 'express-session'; // npm i express-session
import { localsMiddleware } from './middlewares';
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

// server 생성
const app = express(); 

// html 템플릿 설정(pug) 
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')

// 전역요청
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret KEY', resave: true, saveUninitialized:true, }))
/* app.use((req,res,next)=>{ 
      req.sessionStore.all((error,sessions)=>{ 
        console.log(sessions); next() 
  })})*/
app.use(localsMiddleware);

app.use('/',rootRouter)
app.use('/users',userRouter)
app.use('/videos',videoRouter)

export default app

/*------------------------------------------------------------------------------------------------------

13 → pug는 src/views폴더 안에 생성한다.
14 → views폴더 위치를 세팅하는 작업, process.cwd()는 package.json의 경로를 리턴한다.
17 → app.use()은 모든 url요청에 실행이 된다.
17 → morgan은 Node.js 환경에서 사용되는 HTTP 요청 logging 미들웨어이며, 모든 app.use()의 최상단에 작성한다.
18 → html에서 post된 form으로 부터 받은 데이터를 express(서버)가 읽을 수 있도록 설정하는 작업
19 → server에서 브라우저에게 session을 부여해줌, 
      secret=세션을 암호화하는 키, resave=매 요청마다 세션을 다시 저장할지 결정하는 옵션, saveUninitialized=로그인 하지 않은 사용자도 세션쿠키를 받을 수 있게하려면 true
20 → server로부터 sessionDB에 등록된 모든 session들을 조회
21 → src/localsMiddleware.js에 res.locals에 관한 Middleware가 정의되어 있다.
    localsMiddleware에선 req.session을 사용하기때문에 해당 전역요청은 app.use(session({}))보다 나중에 작성되어야 한다.



🚀 src/routers/rootRouter.js로 이동
*/