module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("admins", {
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [5, 12],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "editor",
    },
    status: {
      type: DataTypes.STRING,        // active, freeze, deactivate
      defaultValue: "active",
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    error: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      },
    },
    profile: {
      type: DataTypes.STRING,
    }    
  });

  return Admin;
};

// password: {
//   type: DataTypes.STRING(64),
//   allowNull: false,
//   validate: {
//     is: /^[0-9a-f]{64}$/i
//   }
// },
