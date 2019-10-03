const path = require("path");

const express = require("express");

const controllerProducts = require("../controllers/controller.product");

const router = express.Router();

router.get("/", controllerProducts.getProducts);

module.exports = router;
