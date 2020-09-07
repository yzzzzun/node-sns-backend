module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      //id 기본적으로 포함
      name: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
      charset: "utf8mb4", //이모티콘까지
      collate: "utf8mb4_general_ci", //한글 저장 (이모티콘까지)
    }
  );

  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashTag" });
  };

  return Hashtag;
};
