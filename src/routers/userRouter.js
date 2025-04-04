import express from 'express';
import { remove, watch, startGithubLogin, finishGithubLogin, logout, getEdit, postEdit } from '../controllers/userController';
import { loginOnlyMiddleware, publicOnlyMiddleware } from '../middlewares';

// 라우터 생성
const userRouter = express.Router();

// 라우터 등록
userRouter.get('/logout', loginOnlyMiddleware, logout);
userRouter.route('/edit').all(loginOnlyMiddleware).get(getEdit).post(postEdit)
userRouter.get('/remove', loginOnlyMiddleware, remove);
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin)
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin)
userRouter.get('/:id',watch);

// 라우터 export (→ index.js)
export default userRouter;

/*


🚀 src/routers/videoRouter.js로 이동
*/