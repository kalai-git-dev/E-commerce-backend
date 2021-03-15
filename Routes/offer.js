const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "kalai1414",
  api_key: "686439186756211",
  api_secret: "0b4BTRXOtNwQrXYtdjsQTYUAFks",
});

const isAuthenticated = require("../MiIddelwares/isAuthenticated");

const Offer = require("../Models/Offer");

router.post("/publish", isAuthenticated, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      sexe,
      city,
      marque,
      size,
      condition,
      color,
    } = req.fields;
    //   console.log(req.user);
    console.log(req.fields);
    console.log(req.files.picture.path);
    const newOffer = new Offer({
      title,
      description,
      category,
      city,
      price,
      details: [
        { SEXE: sexe },
        { MARQUE: marque },
        { TAILLE: size },
        { ETAT: condition },
        { COULEUR: color },
      ],
      owner: req.user,
    });
    const result = await cloudinary.uploader.upload(req.files.picture.path, {
      folder: "/ecomerce/offers",
    });
    newOffer.image = result;
    await newOffer.save();

    res.json(newOffer);
  } catch (error) {
    res.status(400).json({ message: "eroor" });
  }
});

module.exports = router;
