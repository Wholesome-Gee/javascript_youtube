import 'dotenv/config' // npm i dotenv
import app from './index.js'
import './db'
import './models/Video.js'
import './models/User.js'

let PORT = 4000

app.listen(4000, ()=>{
  console.log(`✅ 'index.js': http://localhost:${PORT} 🚀`)
})
/*
1. dotenv/config는 .env 파일에 정의 된 환경변수를 nodeJS환경에서 사용할 수 있도록 해준다.
9. app.listen(포트번호, 콜백함수)은 server가 runtime시 포트번호를 배정해주며 콜백함수를 실행해준다.


🚀 src/db.js로 이동
🚀 src/index.js로 이동
🚀 src/models/Video.js로 이동
*/
