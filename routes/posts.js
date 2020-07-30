//Router 분리
//node 에서 import는 잘 안쓴다. 지원은하지만..
//webpack 이 내부적으로 import -> require로 바꿔주는데 node는 webpack을 안쓰기때문에 require, exports로 씀
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send([
    { id: 1, content: "hello1" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

router.post("/", (req, res) => {
  res.send({ id: 3, content: "hello" });
});

router.delete("/", (req, res) => {
  //TODO
});

module.exports = router;
