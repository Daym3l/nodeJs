const path = require("path");
const express = require("express");

const router = express.Router();




router.get("/add-product", (req, res, next) => {
  res.sendFile(path.resolve(__dirname,"..",  "views", "add-product.html"));
});

router.post("/add-product", (req, res) => {
  res.redirect("/");
});

module.exports = router;
