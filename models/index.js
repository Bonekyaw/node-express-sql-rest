require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_MYSQL,
  process.env.DB_POSTGRES_USER,
  // process.env.DB_USER,
  process.env.DB_POSTGRES_PASSWORD,
  // process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_POSTGRES_DIALECT,
    // dialect: process.env.DB_DIALECT,
    // dialectOptions: {
    //   useUTC: false, // for reading from database
    // },
    timezone: process.env.DB_TIMEZONE, // for writing to database
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admins = require("./admin")(sequelize, DataTypes);
db.otps = require("./otp")(sequelize, DataTypes);

module.exports = db;
