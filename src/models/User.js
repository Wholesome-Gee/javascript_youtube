import bcrypt from "bcrypt"; // npm i bcrypt
import mongoose from "mongoose"; // npm i mongoose


// mongoose 스키마 정의
const userSchema = new mongoose.Schema({
  avatarUrl: String,
  email: { type: String, required: true, unique: true },
  socialOnly: { type:Boolean, default:false },      
  username: { type: String, required: true, unique: true },
  password: String,
  name: { type: String, required: true },
  location: String,
  videos: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    }
  ]
})
/*
9. github로 로그인한 유저에게 socialOnly는 true가 부여된다.
11. github로 로그인한 유저는 password가 없기때문에 required:true가 아니다.
14. videos는 mongoDB ID로 구성된 배열이다(type). videos 배열안에 mongoDB ID들은 Video collection의 document와 연결된다(ref).
*/


// mongoose 미들웨어 (스키마 생성 전에 작성)
userSchema.pre('save', async function(){
  if(this.isModified("password")){ 
    this.password = await bcrypt.hash(this.password, 5);
  }
})
/*
29. userSchema가 저장되기(save) 이전에(pre) 콜백함수를 실행한다. (콜백함수는 this바인딩때문에 일반함수로 작성o, 화살표함수로 작성x)
30. this는 저장될 데이터를 의미하고, this의 password가 수정되었는지(isModified) 여부를 검토한다.
31. bcrypt.hash(password,해싱횟수) => password를 5번 해싱
*/


// 스키마 생성
const User = mongoose.model("User", userSchema);
export default User;
/*
42. mongoDB 데이터베이스에 users라는 collection이 생성되고, users collection의 document는 userSchema를 따르며 UserModel이라고도 한다.
*/


// init.js에서 import
