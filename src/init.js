import './db'
import './models/Video.js'
import './models/User.js'
import app from './index.js'

let PORT = 4000

app.listen(4000, ()=>{
  console.log(`✅ 'index.js': http://localhost:${PORT} 🚀`)
})

/*--------------------------------------------------------------------------------------------

7. app.listen(포트번호, 콜백함수)은 server가 runtime시 포트번호를 배정해주며 콜백함수를 실행해준다.


🚀 src/index.js로 이동
*/
