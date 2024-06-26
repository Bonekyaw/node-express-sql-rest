const asyncHandler = require("express-async-handler");
const { body, query, validationResult } = require("express-validator");
const { unlink } = require("node:fs/promises");
const path = require("path");

const db = require("../models");
const Admin = db.admins;

const authorise = require("./../utils/authorise");
const { withCount, noCount, cursor } = require("./../utils/paginate");
const { checkUploadFile } = require("./../utils/file");

exports.uploadProfile = asyncHandler(async (req, res, next) => {
  // const id = req.params.id;
  const image = req.file;
  // console.log("Multiple Images array", req.files);  // For multiple files uploaded

  const admin = req.admin;
  checkUploadFile(image);
  const imageUrl = image.path.replace("\\", "/");

  if (admin.profile) {
    // await unlink(admin.profile); // Delete an old profile image because it accepts just one.
    try {
      await unlink(path.join(__dirname, "..", admin.profile));
    } catch (error) {
      dmin.profile = imageUrl;
      await admin.save();
    }
  }

  admin.profile = imageUrl;
  await admin.save();

  res
    .status(200)
    .json({ message: "Successfully uploaded the image.", profile: imageUrl });
});

exports.index = [
  // Validate and sanitize fields.
  query("page", "Page number must be integer.").isInt({ gt: 0 }).toInt(),
  query("limit", "Limit number must be integer.").isInt({ gt: 0 }).toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const err = new Error("Validation failed!");
      err.status = 400;
      return next(err);
    }

    const { page, limit } = req.query;
    // const cursors = req.query.cursor ?? null;
    // const limit = req.query.limit;

    // Authorization - if it is "user" role, no one is allowed.
    // Same as - authorise(true, admin, "super", "manager", "editor")
    // authorise(false, admin, "user");

    const filters = {
        status: "active",
    };
    // const order = [['createdAt', 'DESC']];
    const order = [["id", "DESC"]];     // For cursor
    const fields = {exclude: ["password", "error", "randToken", "updatedAt"]};

    const admins = await withCount(Admin, page, limit, filters, order, fields);
    // const admins = await noCount(Admin, page, limit, filters, order, fields);
    // const admins = await cursor(Admin, cursors, limit, filters, order, fields);
    res.status(200).json(admins);
  }),
];

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
