import express from 'express';
import { getHomeVideo, getSearchVideo } from '../controllers/videoController';
import { getJoin, postJoin, getLogin, postLogin } from '../controllers/userController';

// 라우터 생성
const rootRouter = express.Router();

// 라우터 등록
rootRouter.get('/',getHomeVideo);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').get(getLogin).post(postLogin);
rootRouter.get('/search',getSearchVideo);

// 라우터 export (→ index.js)
export default rootRouter;




/*-----------------------------------------------------------------------

6. 라우터를 생성하는 방법 = express.Router()
9~12. globalRouter가 get요청을 받도록 설정한다. 
15. export된 globalRouter는 index.js에서 import 된다.


🚀 src/routers/userRouter.js로 이동
*/