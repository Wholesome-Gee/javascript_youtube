// index.js > app.use('/',rootRouter) > rootRouter.js
import express from 'express';  // npm i express
import { getHome, getSearch } from '../controllers/videoController';
import { getJoin, postJoin, getLogin, postLogin } from '../controllers/userController';
import { publicOnlyMiddleware } from '../middlewares';


// 라우터 생성
const rootRouter = express.Router();


// 라우터 등록
rootRouter.get('/',getHome);
rootRouter.route('/join').all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route('/login').all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get('/search',getSearch);
/*
13. '/' url로 get요청이 들어오면 getHome controller 실행
14. '/join' url로 HTTP Request가 들어오면 publicOnlyMiddleware실행, 그 Request가  get이면 getJoin, post면 postJoin 실행
*/


// 라우터 export (→ index.js)
export default rootRouter;


//🚀 src/controllers/videoController.js로 이동
