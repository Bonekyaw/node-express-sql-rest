require("dotenv").config();
const express = require("express");
// const bodyParser = require('body-parser');

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json()); // application/json
// app.use(bodyParser.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", adminRoutes);

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
