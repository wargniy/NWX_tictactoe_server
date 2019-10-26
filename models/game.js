
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    winner: DataTypes.STRING,
  }, {});
  Game.associate = function (models) {
    // associations can be defined here
    Game.belongsTo(models.User);
  };
  return Game;
};
