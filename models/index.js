//Sequelize load
const Sequelize = require("sequelize");
//기본값은 development
const env = process.env.NODE_ENV || "development";
//config json 에서 development 에 해당하는 config load
const config = require("../config/config")[env];
const db = {};

//sequelize 가 node 와 mysql 을 연결함
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

//테이블 연관관계 설정
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
