import './db'
import './models/Video.js'
import app from './index.js'

let PORT = 4000

app.listen(4000, ()=>{
  console.log(`✅ 'index.js': http://localhost:${PORT} 🚀`)
}) // 포트번호, 콜백함수
