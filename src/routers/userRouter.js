import express from 'express';
import { remove, startGithubLogin, finishGithubLogin, logout, getEdit, postEdit, getChangePassword, postChangePassword, getProfile } from '../controllers/userController';
import { loginOnlyMiddleware, publicOnlyMiddleware, uploadAvatar } from '../middlewares';

// 라우터 생성
const userRouter = express.Router();

// 라우터 등록
userRouter.get('/logout', loginOnlyMiddleware, logout);
userRouter.route('/edit').all(loginOnlyMiddleware).get(getEdit).post(uploadAvatar.single('avatar'), postEdit)
userRouter.route('/change-password').all(loginOnlyMiddleware).get(getChangePassword).post(postChangePassword)
userRouter.get('/remove', loginOnlyMiddleware, remove);
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin)
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin)
userRouter.get('/:id',getProfile);

// 라우터 export (→ index.js)
export default userRouter;

/*
10. uploadVideo.single('avatar') 는 /users/edit로 post요청이 들어왔을 시 html input file 중 name이 'avatar'인 input을 찾아서 input에 담긴 file을 request에 담아준다.

🚀 src/routers/videoRouter.js로 이동
*/