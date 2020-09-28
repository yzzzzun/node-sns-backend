//Router 분리
//node 에서 import는 잘 안쓴다. 지원은하지만..
//webpack 이 내부적으로 import -> require로 바꿔주는데 node는 webpack을 안쓰기때문에 require, exports로 씀
const express = require("express");
const router = express.Router();
const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.get("/", (req, res) => {
  res.send([
    { id: 1, content: "hello1" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });

    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// POST - /posts
router.post("/:postID/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postID,
      },
    });

    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postID,
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// DELETE - /posts
router.delete("/", (req, res) => {
  //TODO
});

module.exports = router;
