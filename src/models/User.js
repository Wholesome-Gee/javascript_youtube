import bcrypt from "bcrypt"; // npm i bcrypt
import mongoose from "mongoose";

// 스키마 정의
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
  // videos는 Video Model에 연결된 ObjectId로 구성 된 배열이다.
})

userSchema.pre('save', async function(){
  if(this.isModified("password")){  // 비디오를 업로드할때, 비디오id를 user 데이터의 videos에 추가하고 저장을 하게되는데, 그때 불필요한 비밀번호 해싱이 일어난다. 그것을 막기위해 isModified("password")로 패스워드에 변화가 생겼을 시에만 해시를 실행하도록 설정  #8.14참고
    this.password = await bcrypt.hash(this.password, 5);
  }
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
