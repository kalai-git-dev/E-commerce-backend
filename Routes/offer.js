const express = require("express");
const router = express.Router();

const isAuthenticated = require("../MiIddelwares/isAuthenticated");

const Offer = require("../Models/Offer");

router.post("/publish", isAuthenticated, async (req, res) => {
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
  console.log(req.fields.path);

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

  await newOffer.save();

  res.json(newOffer);
});

module.exports = router;
