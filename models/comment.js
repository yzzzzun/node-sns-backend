module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      //id 기본적으로 포함
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    //belongsTo 가 있는곳에 id 가생김
    //UserId : {}
    //PostId : {}
    {
      charset: "utf8mb4", //이모티콘까지
      collate: "utf8mb4_general_ci", //한글 저장 (이모티콘까지)
    }
  );

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };

  return Comment;
};
