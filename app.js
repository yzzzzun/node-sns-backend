//내부적으로 http를 사용함
const express = require("express");
const postRouter = require("./routes/posts");
const app = express();

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
app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/posts", postRouter);

app.listen(3065, () => {
  console.log("server run : 3065");
});
