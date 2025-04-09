// index.js > app.use('/users',userRouter) > userRouter.js
import express from 'express';  // npm i express
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
/*
12. '/logout' url로 get요청이 들어오면 loginOnlyMiddleware 실행 후 logout controller 실행
14. '/edit' url로 HTTP Request가 들어오면 loginOnlyMiddleware실행, 그 Request가  get이면 getEdit, post면 uploadAvatar.single('avatar') 실행 후 postEdit 실행
    uploadAvatar는 middlewares.js로부터 오는 middleware이고, html에서 name이 avatar인 input으로부터 한개의 파일을 받아서 req.file에 담는다. 이후, postEdit controller에서 req.file로 확인 가능
18. '/:id'는 /users/xxxx url로 요청이 들어올 시 xxxx를 req.parameter로 받는다.
*/


// 라우터 export (→ index.js)
export default userRouter;

/*
10. uploadVideo.single('avatar') 는 /users/edit로 post요청이 들어왔을 시 html input file 중 name이 'avatar'인 input을 찾아서 input에 담긴 file을 request에 담아준다.

🚀 src/routers/videoRouter.js로 이동
*/