require("dotenv").config();
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

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "kalai1414",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "cette route n'existe pas" });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
