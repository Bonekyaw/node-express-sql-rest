const asyncHandler = require("express-async-handler");

const db = require("../models");
const Admin = db.admins;

exports.index = asyncHandler(async (req, res, next) => {
  const admins = await Admin.findAll({
    attributes: ['name', 'phone', 'status'],
  });
  res.status(200).json({
    message: "This is just an example. In real app, you should check auth.",
    admins,
  });
});

exports.store = asyncHandler(async (req, res, next) => {
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

