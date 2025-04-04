import express from 'express';
import { getEdit, getRemove, getUpload, getWatch, postEdit, postUpload } from '../controllers/videoController';
import { loginOnlyMiddleware } from '../middlewares';


// 라우터 생성
const videoRouter = express.Router();


// 라우터 등록
videoRouter.get('/:id([0-9a-f]{24})', getWatch); 
videoRouter.get('/:id([0-9a-f]{24})/remove', loginOnlyMiddleware, getRemove);
videoRouter.route('/upload').all(loginOnlyMiddleware).get(getUpload).post(postUpload);
videoRouter.route('/:id([0-9a-f]{24})/edit').all(loginOnlyMiddleware).get(getEdit).post(postEdit); 

// 라우터 export
export default videoRouter;

/*
10. globalRouter.route('/upload').get(getUploadVideo).post(postUploadVideo) 이렇게 쓰면 10번라인과 15번 라인을 하나로 뭉칠 수 있다.
11. router의 url에 /:id 입력시 id라는 parameter를 받을 수 있고, 정규표현식 역시 가능하다.
  - '/:id(\\d+)' 라고 작성시, url parameter는 숫자(digit)만 받을 수 있다. #4.8 참고
  - '/:id([0-9a-f]{24})' 라고 작성시, url parameter는 24자리 hexadecimal string(mongoDB에서 부여받은 id)만 받을 수 있다. #6.19 참고


🚀 src/controllers/videoController.js로 이동
*/