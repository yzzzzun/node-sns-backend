//내부적으로 http를 사용함
const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const db = require("./models");
const passportConfig = require("./passport");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
passportConfig();
db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

/** 
 const http = require("http");
//backend frontend 서버를 나누는 이유 -> 대규모가 되었을떄 scaling하기 편함
//예를들어 요청이 비대칭적으로 들어올때 front 1000회 back 10회 -> front 서버를 늘려줘야하는데 하나의 pc에 있는경우 불필요한 공간을 차지하게됨
const server = http.createServer((req, res) => {
  
  //node 만으로 구현하면 API 를 이런식으로 나눠서 처리해야하는데 매우 복잡.. -> express 프레임워크사용
   if(req.method === 'GET'){
        if(req.url === '/api/posts'){

        }
    } else if(req.method === 'POST'){
        if(req.url === '/api/posts'){

        }
  }

  console.log(req.url, req.method);
  res.write("<h1>hello node1</h1>");
  res.write("<h2>hello node2</h2>");
  res.write("<h3>hello node3</h3>");
  res.write("<h4>hello node4</h4>");
  //응답은 반드시한번, 안하면 브라우저에서 일정시간후 실패처리
  res.end("<h5>hello node5</h5>");
});
*/

//express를 사용하면 api를 구조적으로 구현가능
//app.get -> 가져옴
//app.post -> 생성
//app.put -> 전체수정
//app.delete -> 제거
//app.patch -> 부분수정
//app.options -> 확인, 요청보낼수있는지?
//app.head -> 헤더만 가져오기(header/body 중 header)

//모든 요청에 CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //기본값 false, true로 해줘야 도메인이 달라도 쿠키가 전달됨
  })
);
//라우터들 보다 위에있어야함, 위에서부터 실행되기때문, 라우터보다 아래있다면 req.body 에서 인식 할 수 없음
//POST data req.body 에서 받을 수 있도록 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// session 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, //쿠키생성에 사용하는 키
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/posts", postRouter);
app.use("/users", userRouter);

//에러처리 미들웨어는 내부적으로 존재하고있음
// app.use((err,req,res,next) => {
// 재정의가 가능함
// });

app.listen(3065, () => {
  console.log("server run : 3065");
});
