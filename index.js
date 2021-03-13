const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const userRoutes = require("./Routes/user");
const offerRoutes = require("./Routes/offer");
app.use(userRoutes);
app.use(offerRoutes);

mongoose.connect("mongodb://localhost/e-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "cette route n'existe pas" });
});

app.listen(3000, () => {
  console.log("server started");
});
