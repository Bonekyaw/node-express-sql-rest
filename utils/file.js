exports.checkUploadFile = (image) => {
  if (!image) {
    const err = new Error("It is not a valid image.");
    err.status = 409;
    throw err;
  }
};

