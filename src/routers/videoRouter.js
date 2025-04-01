import express from 'express';
import { getEditVideo, getDeleteVideo, getUploadVideo, getWatchVideo, postEditVideo, postUploadVideo } from '../controllers/videoController';


// 라우터 생성
const videoRouter = express.Router();


// 라우터 등록
videoRouter.get('/upload', getUploadVideo);
videoRouter.get('/:id([0-9a-f]{24})', getWatchVideo); 
videoRouter.get('/:id([0-9a-f]{24})/edit', getEditVideo); 
videoRouter.get('/:id([0-9a-f]{24})/delete', getDeleteVideo);

videoRouter.post('/upload', postUploadVideo);
videoRouter.post('/:id([0-9a-f]{24})/edit', postEditVideo);

// 라우터 export
export default videoRouter;



/*------------------------------------------------------------------------

10. globalRouter.route('/upload').get(getUploadVideo).post(postUploadVideo) 이렇게 쓰면 10번라인과 15번 라인을 하나로 뭉칠 수 있다.
11. router의 url에 /:id 입력시 id라는 parameter를 받을 수 있고, 정규표현식 역시 가능하다.
    - '/:id(\\d+)' 라고 작성시, url parameter는 숫자(digit)만 받을 수 있다. #4.8 참고
    - '/:id([0-9a-f]{24})' 라고 작성시, url parameter는 24자리 hexadecimal string(mongoDB에서 부여받은 id)만 받을 수 있다. #6.19 참고


🚀 src/controllers/videoController.js로 이동
*/