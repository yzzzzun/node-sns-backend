const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);    //쿠키와 userID 만 서버에서 가지고있다
  });

  //로그인 후 요청부터 id로부터 사용자정보를 가져옴
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); //req.user 안에 넣어줌
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
