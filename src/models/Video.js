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
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "User" 
  },
  comments:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
})
/*
5. maxLength, minLength는 html의 input에서도 한번 더 작성해주는것이 좋다. trim은 공백을 제거해준다.
7. Date.now()라고 작성하면 video Model이 생성되는 시점이 아닌 서버(express)가 on 되는 시점의 시간이 기입된다.
8. hashtags는 String으로 이루어진 배열이다.
14. owner는 mongoDB ID를 받는다.(type). owner가 받은 mongoDB ID들은 User collection의 document와 연결된다(ref).
*/


//mongoose 미들웨어 (스키마 생성 전에 작성) #6.23
videoSchema.static('formatHashtags', (hashtags)=>{
  return hashtags.split(',').map( item => item.startsWith('#')? item : `#${item}`)
})
/*
29. videoSchema.static으로 Video Model에 전역함수 formatHashtags를 커스터마이징해준다. => VideoModel.formatHashtags('hash,tags') 
30. split(',')은 문자열을 , 를 기준으로 구분하여 배열로 리턴   ex) '1,2,3' => ['1','2','3']

videoSchema.pre('save', async function (){ this.hashtags = this.hashtags[0].split(',').map( item => item.startsWith('#') ? item : `#${item}`)// })
- videoSchema.pre는 VideoModel.create()에는 적용되지만, VideoModel.findByIdAndUpdate() 등에는 적용되지 않기에 statics middleware를 만듬
*/


// 스키마 생성
const Video = mongoose.model("Video", videoSchema);
export default Video;
/*
42. mongoDB 데이터베이스에 videos라는 collection이 생성되고, videos collection의 document는 videoSchema를 따르며 VideoModel이라고도 한다.
*/


// init.js에서 import


// 🚀 src/router/rootRouter.js로 이동