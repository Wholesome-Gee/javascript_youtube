import mongoose from "mongoose";

// 스키마 정의
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 }, // html input에도 maxLength와 minLength 지정해줘야함
  description: { type: String, required: true, trim: true, minLength: 5 },
  createdAt: { type: Date, default: Date.now },
  hashtags:[{ type:String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  }
})

// mongoose 미들웨어 ( 스키마 생성 전에 작성되어야 함 ) #6.23 참고
/*
videoSchema.pre('save', async function (){
  //videoSchema가 'save' 되기 전에 실행되는 미들웨어, this는 저장될 data를 의미한다.
  this.hashtags = this.hashtags[0].split(',').map( item => item.startsWith('#') ? item : `#${item}`)
})
*/

// mongoose 커스터마이징 미들웨어 ( = statics middleware) #6.24 참고
  // Schema.pre는 Model.create()에는 적용되지만, Model.findByIdAndUpdate() 등에는 적용되지 않기에 statics middleware를 만듬
  videoSchema.static('formatHashtags', (hashtags)=>{
    return hashtags.split(',').map( item => item.startsWith('#')? item : `#${item}`)
  })

// 스키마 생성
const Video = mongoose.model("Video", videoSchema);
export default Video;



/*--------------------------------------------------------------------------------------------------------------------------

@ 스키마로 만들어진 데이터를 모델이라고함.
@ Video model 정의가 끝났으면 init.js에서 import
30. mongoose.model("Video", videoSchema);는 db에 'videos' collection을 생성 후 연결하고 (mongoose가 자동으로 복수로 변환해줌),
    videos collection에 들어갈 document들은 스키마객체의 형식을 따른다.

*/