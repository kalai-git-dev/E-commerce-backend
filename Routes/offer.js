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
      sexe,
      details: [
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

router.get("/offers", async (req, res) => {
  let filters = {};
  if (req.query.title) {
    filters.title = new RegExp(req.query.title, "i");
  }
  if (req.query.category) {
    filters.category = req.query.category;
  }
  if (req.query.city) {
    filters.city = new RegExp(req.query.city, "i");
  }
  if (req.query.priceMin) {
    filters.price = { $gte: req.query.priceMin };
  }
  if (req.query.priceMax) {
    if (filters.price) {
      filters.price.$lte = req.query.priceMax;
    } else {
      filters.price = { $gte: req.query.priceMax };
    }
  }

  // sort
  let sort = {};
  if (req.query.sort === "asc") {
    sort = { price: 1 };
  } else if (req.query.sort === "desc") {
    sort = { price: -1 };
  }
  //pagination
  let page;
  if (Number(req.query.page) < 1) {
    page = 1;
  } else {
    page = Number(req.query.page);
  }

  let limit = Number(req.query.limit);
  const offers = await Offer.find(filters)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .select("_id title sexe description category city price ");
  return res.status(200).json({ offers });
});
module.exports = router;
