const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../Models/User");

router.post("/user/signup", async (req, res) => {
  const { email, firstName, lastName, password } = req.fields;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(404).json({ message: "email already exist" });
    } else {
      if (password && email && firstName && lastName) {
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(password + salt).toString(encBase64);
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          token: token,
          salt: salt,
          hash: hash,
        });
        await newUser.save();
        res.json({
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          token: newUser.token,
          email: newUser.email,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", (req, res) => {
  res.json([1, 2, 4, 5]);
});

module.exports = router;
