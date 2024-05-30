require("dotenv").config();
const express = require("express");
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
// const bodyParser = require('body-parser');

const limiter = require("./middlewares/rateLimiter");
const isAuth = require('./middlewares/isAuth');
const authorise = require('./middlewares/authorise');
const adminRoutes = require("./routes/v1/admin");
const authRoutes = require("./routes/v1/auth");

const app = express();

app.use(helmet());

app.use(express.json()); // application/json
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use(compression());
app.use(cors());
// app.options("*", cors());

app.use(limiter);

app.use("/api/v1", authRoutes);
app.use("/api/v1", isAuth, authorise(false, "user"), adminRoutes);  // Hey Authorization

const db = require("./models");

db.sequelize
  .sync()
  // .sync({force: true})
  .then(() => {
    console.log("Successfully Synced with mySQL DB.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  res.status(status).json({ error: message });
});
