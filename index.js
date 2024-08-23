const express = require('express'); //express 모듈 불러오기
const cors = require('cors'); //cors 모듈 불러오기

const PORT = '8080';

const cookieParser = require('cookie-parser');

const app = express(); //express 모듈을 사용하기 위해 app 변수에 할당한다.

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
); //http, https 프로토콜을 사용하는 서버 간의 통신을 허용한다.
app.use(express.json()); //express 모듈의 json()메소드를 사용한다.

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.use(cookieParser());

app.use(require('./routes/postRoutes'));
//app.use(require('./routes/getRoutes'));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); //서버를 정상 실행할 시 메시지 출력
