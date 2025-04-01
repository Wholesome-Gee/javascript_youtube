import bcrypt from "bcrypt"; // npm i bcrypt
import mongoose from "mongoose";

// 스키마 정의
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
})

userSchema.pre('save', async function(){
  this.password = await bcrypt.hash(this.password, 5);
})

// 스키마 생성
const User = mongoose.model("User", userSchema);
export default User;

/*-------------------------------------------------------------
@ 스키마로 만들어진 데이터를 모델이라고함.
@ User model 정의가 끝났으면 init.js에서 import

1. 입력값을 해싱해주는 bcrypt 라이브러리
14. this.password는 create되는 user의 password를 의미하며, bcrypt.hash(해싱 대상, 해싱횟수)이다. this바인딩 때문에 일반함수로 작성해야함(화살표함수로 작성시 this.password는 undefined)

*/
