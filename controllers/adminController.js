const asyncHandler = require("express-async-handler");

const db = require("../models");
const Admin = db.admins;

exports.index = (req, res, next) => {
  res.json({ success: true });
};

exports.store = asyncHandler(async (req, res, next) => {
  // const admin = {
  //   name: req.body.name,
  //   phone: req.body.phone,
  //   email: req.body.email,
  //   password: req.body.password,
  //   role: req.body.role,
  //   lastLogin: req.body.lastLogin,
  // };
  // const result = await Admin.create(admin);
  // res.status(201).json(result.toJSON());
  res.json({ success: true });

});

exports.show = (req, res, next) => {
  res.json({ success: true });
};

exports.update = (req, res, next) => {
  res.json({ success: true });
};

exports.destroy = (req, res, next) => {
  res.json({ success: true });
};

// const admin = new Admin({name: "Mg Mg",email ...});
// await admin.save();
