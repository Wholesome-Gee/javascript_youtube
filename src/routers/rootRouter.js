import express from 'express';
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
9. route url에 get과 post중 하나만 필요할땐, Router.get('route url', controller)
10. route url에 get과 post 둘 다 필요할땐, Router.route('route url').get(controller).post(controller)
*/

// 라우터 export (→ index.js)
export default rootRouter;


//🚀 src/controllers/videoController.js로 이동
