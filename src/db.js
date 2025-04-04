import mongoose from 'mongoose'; //

/*
mongoose 6.x 버전 이하 일 시 아래 내용 추가
mongoose.connect('mongodb://127.0.0.1:27017/geetube', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
 });
*/

mongoose.connect(process.env.DB_URL) 
/*
mongoose는 NodeJS에서 MongoDB와 연결시켜주고 쉽게 다룰 수 있도록 도와주는 모듈 (스키마 정의 등)
mongoose로 서버(express)와 데이터베이스(MongoDB)를 연결
mongoDb주소에 geetube collection 생성
*/


const db = mongoose.connection;
/*
서버와 연결된 데이터베이스를 가져와서 db변수에 담는다.
*/

function handleError(error){
  console.log("❌ DB Error: "+error);
}
function handleConnected(){
  console.log('✅ Connected to DB');
}
db.on('error', handleError); // db 접속 에러시 event
db.once('open', handleConnected) // db 연결 성공 시 event
/*
on은 서버(express)가 재시작될때마다 콜백함수를 실행하고
once는 서버(express)가 처음 시작할때만 콜백함수를 실행한다.
*/


// 🚀 다시 src/init.js로 이동