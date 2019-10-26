const Joi = require('@hapi/joi');

function validateRegisterIn(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required()
      .email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

const User = (sequelize, DataTypes) => {
  const UserSchema = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    enabled: DataTypes.TINYINT,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return UserSchema;
};

module.exports = {
  validateRegister: validateRegisterIn,
  userModel: User,
};
