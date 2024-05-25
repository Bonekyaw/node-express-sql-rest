const asyncHandler = require("express-async-handler");
const { unlink } = require("node:fs/promises");

const db = require("../models");
const Admin = db.admins;

const { checkAdmin } = require("./../utils/auth");
const { checkUploadFile } = require("./../utils/file");

exports.uploadProfile = asyncHandler(async (req, res, next) => {
  // const id = req.params.id;
  const id = req.adminId;
  const image = req.file;
  // console.log("Multiple Images array", req.files);  // For multiple files uploaded

  const admin = await Admin.findByPk(id);
  checkAdmin(admin);
  checkUploadFile(image);
  const imageUrl = image.path.replace("\\", "/");

  if (admin.profile) {
    await unlink(admin.profile); // Delete an old profile image because it accepts just one.
  }

  admin.profile = imageUrl;
  await admin.save();

  res
    .status(200)
    .json({ message: "Successfully uploaded the image.", profile: imageUrl });
});

exports.index = asyncHandler(async (req, res, next) => {
  res.json({ success: true });
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
