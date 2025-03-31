import express from 'express';
import { getHomeVideo, getSearchVideo } from '../controllers/videoController';
import { joinUser, loginUser } from '../controllers/userController';

// 라우터 생성
const globalRouter = express.Router();

// 라우터 등록
globalRouter.get('/',getHomeVideo);
globalRouter.get('/join',joinUser);
globalRouter.get('/login',loginUser);
globalRouter.get('/search',getSearchVideo);

// 라우터 export (→ index.js)
export default globalRouter;