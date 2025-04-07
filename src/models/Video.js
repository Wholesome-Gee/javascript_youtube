import mongoose from "mongoose"; // npm i mongoose

// 스키마 정의
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 }, // html input에도 maxLength와 minLength 지정해줘야함
  description: { type: String, required: true, trim: true, minLength: 5 },
  createdAt: { type: Date, default: Date.now },
  hashtags:[{ type:String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  videoUrl: { type: String, required:true },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // mongoose.Schema.Types.ObjectId는 mongoDB에서 랜덤하게 부여하는 _id 값의 타입을 지정할때 사용한다.
    required: true,
    ref: "User" // owner에 들어올 값인 MongoDB의 _id가 어느 모델로부터 온건지 알려주는 역할, 즉 videoSchema의 owner property는 User 모델로부터 오는(혹은 User DB) MongoDB ObjectId 타입이다라는 뜻
  }
})
/*
4. 스키마(Schema)는 데이터베이스(MongoDB)의 collection에 저장 될 document(data)의 구조이다.
5. maxLength와 minLength는 html input에도 속성으로 넣어서 웹(app)과 서버(server)에서 2중 검토 해주는것이 좋다.
7. Date.now()라고 작성하면 서버(express)가 on 되는 시점의 시간이 기입되므로 주의
*/


//mongoose 미들웨어 ( 스키마 생성 전에 작성되어야 함 ) #6.23
// videoSchema.pre('save', async function (){
// this.hashtags = this.hashtags[0].split(',').map( item => item.startsWith('#') ? item : `#${item}`)
// })
/* 
22. videoSchema가 'save' 되기 전에 실행되는 미들웨어다. 
23. this는 collection에 저장 대기중인 데이터(document)를 의미한다.
*/

// mongoose 커스터마이징 미들웨어 ( = statics middleware) #6.24
videoSchema.static('formatHashtags', (hashtags)=>{
  return hashtags.split(',').map( item => item.startsWith('#')? item : `#${item}`)
})
/*
Schema.pre는 Model.create()에는 적용되지만, Model.findByIdAndUpdate() 등에는 적용되지 않기에 statics middleware를 만듬
31. 스키마(Schema)로 생성된 모델(Video)에 함수를 등록한다. Video.formatHashtags('문자열') 이런식으로 사용 가능해졌다.
32. split은 문자열을 특정문자를 기준으로 구별해서 배열로 만들어준다.  ex) '인천,맛집,한식'.split(',') = ['인천','맛집','한식']
*/

// 스키마 생성
const Video = mongoose.model("Video", videoSchema);
export default Video;
/*
35. model("Video",videoSchema)에 의해 mongoose는 데이터베이스(MongoDB)에 'videos' collection을 생성하고, Video 모델에 의해 만들어진 데이터(document)는 'videos' collection에 들어간다.
  - 스키마에 의해서 생성된 변수를 모델이라고함.(Video 모델), 
  - Video는 init.js에서 import 
*/

// 🚀 src/router/rootRouter.js로 이동