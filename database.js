const Sequelize = require('sequelize');
const { userModel } = require('./models/user');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const User = userModel(sequelize, Sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully to', process.env.DB_NAME);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize,
  User,
};
