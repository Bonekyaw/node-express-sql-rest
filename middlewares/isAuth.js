require("dotenv").config();

const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  
  if (!authHeader) {
    const err = new Error("You are not an authenticated user!.");
    err.status = 401;
    return next(err);
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    const err = new Error("You are not an authenticated user!.");
    err.status = 401;
    return next(err);
  }

  if (!decodedToken) {
    const err = new Error("You are not an authenticated user!.");
    err.status = 401;
    return next(err);
  }

  req.adminId = decodedToken.id;
  next();
};

module.exports = isAuth;
