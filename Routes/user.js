const express = require("express");
const router = express.Router();

router.post("/user/signup", (req, res) => {
  const { email, password, userName } = req.fields;
  res.json({ message: "hello" });
});

router.post("/user/login", (req, res) => {
  res.json([1, 2, 4, 5]);
});

module.exports = router;
