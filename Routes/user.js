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
      res.status(409).json({ message: "Email déja utilisé" });
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
      } else {
        return res.status(400).json({ message: "missing parameters" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.fields;

  try {
    if (email && password) {
      const user = await User.findOne({ email: email });
      // console.log(user);

      if (user) {
        const hashToVerify = SHA256(password + user.salt).toString(encBase64);
        if (user.hash === hashToVerify) {
          return res.status(200).json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: user.token,
          });
        } else {
          return res.status(401).json({ message: "unautorized" });
        }
      } else {
        return res.status(400).json({ message: "user not found" });
      }
    } else {
      return res.status(400).json({ message: "misssing parameters" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  res.json();
});

module.exports = router;
