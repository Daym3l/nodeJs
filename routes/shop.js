const path = require("path");
const express = require("express");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
 
  // res.sendFile(path.resolve(__dirname,"..", "views", "shop.html"));
  const product = adminData.products;
  res.render("shop", { prods: product, docTitle: "Shop",path: "/" });
});

module.exports = router;
