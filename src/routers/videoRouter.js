import express from 'express';
import { editVideo, removeVideo, uploadVideo, watchVideo } from '../controllers/videoController';

// 라우터 생성
const videoRouter = express.Router();


// 라우터 등록
videoRouter.get('/upload', uploadVideo);
videoRouter.get('/:id(\\d+)', watchVideo); // (\\d+)는 url parameter에 숫자만 받을 수 있는 정규표현식 #4.8 참조
videoRouter.get('/:id(\\d+)/edit', editVideo);
videoRouter.get('/:id(\\d+)/delete', removeVideo);

// 라우터 export
export default videoRouter;