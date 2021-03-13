const express = require("express");
const router = express.Router();

const Offer = require("../Models/Offer");

router.post("/publish", (req, res) => {
  res.json({ message: "hello" });
});

module.exports = router;
