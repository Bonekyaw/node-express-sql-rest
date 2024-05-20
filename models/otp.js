module.exports = (sequelize, DataTypes) => {
  const Otp = sequelize.define("otps", {
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [5, 10],
      },
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rememberToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verifyToken: {
      type: DataTypes.STRING,
    },
    count: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 3,
      },    
    },
    error: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      },    
    },
  });

  return Otp;
};

// password: {
//   type: DataTypes.STRING(64),
//   allowNull: false,
//   validate: {
//     is: /^[0-9a-f]{64}$/i
//   }
// },
