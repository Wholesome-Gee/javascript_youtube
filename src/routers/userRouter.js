import express from 'express';
import { editUser, logoutUser, deleteUser, watchUser } from '../controllers/userController';

// 라우터 생성
const userRouter = express.Router();

// 라우터 등록
userRouter.get('/logout',logoutUser);
userRouter.get('/edit',editUser);
userRouter.get('/delete',deleteUser);
userRouter.get('/:id',watchUser);

// 라우터 export (→ index.js)
export default userRouter;

/*


🚀 src/routers/videoRouter.js로 이동
*/