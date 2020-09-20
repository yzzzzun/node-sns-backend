const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const { User, Post } = require("../models");

//next를 통해서 에러를 보내면 error가 한번에 처리됨
router.post("/", isNotLoggedIn, async (req, res, next) => {
  //POST - /users
  try {
    //비동기인지 아닌지 공식문서를통해 확인해볼것
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디 입니다.");
    }

    //password 암호화 -> 10~13사이
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    //async - await 으로 안하면 비동기기때문에 json 반환에서 빈값이 나감
    await User.create({
      email: req.body.email,
      nickname: req.body.nickName,
      password: hashedPassword,
    });
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3065');
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); //status 500
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }

    //이때 req.login 은 passport 로그인
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      // 내부적으로 res.setHeader('Cookie',임의값); 세션과 연결
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        }, //원하는 정보만 받는다.
        include: [
          //연관된 정보도 받는다.
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
