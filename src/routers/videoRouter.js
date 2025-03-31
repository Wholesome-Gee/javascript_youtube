import express from 'express';
import { getEditVideo, getDeleteVideo, getUploadVideo, getWatchVideo, postEditVideo, postUploadVideo } from '../controllers/videoController';


// 라우터 생성
const videoRouter = express.Router();


// 라우터 등록
videoRouter.get('/upload', getUploadVideo);
videoRouter.get('/:id([0-9a-f]{24})', getWatchVideo); // (\\d+)는 url parameter에 숫자만 받을 수 있는 정규표현식 #4.8 참조
videoRouter.get('/:id([0-9a-f]{24})/edit', getEditVideo); // ([0-9a-f]{24})는 url parameter에 mongoDB 에서 부여한 id를 받을 수 있는 정규표현식 #6.19 참조
videoRouter.get('/:id([0-9a-f]{24})/delete', getDeleteVideo);

videoRouter.post('/upload', postUploadVideo);
videoRouter.post('/:id([0-9a-f]{24})/edit', postEditVideo);

// 라우터 export
export default videoRouter;