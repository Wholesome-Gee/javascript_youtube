import mongoose from 'mongoose';

/*
mongoose 6.x 버전 이하 일 시 
mongoose.connect('mongodb://127.0.0.1:27017/geetube', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
 });
*/
mongoose.connect('mongodb://127.0.0.1:27017/geetube') // mongoDb주소에 geetube collection 생성


const db = mongoose.connection;

function handleError(error){
  console.log("❌ DB Error: "+error);
}
function handleConnected(){
  console.log('✅ Connected to DB');
  
}
db.on('error', handleError); // db 접속 에러시 event
db.once('open', handleConnected) // db 연결 성공 시 event