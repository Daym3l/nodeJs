const path = require("path");

const express = require("express");

const controllerShop = require("../controllers/controller.shop");

const router = express.Router();

router.get("/", controllerShop.getIndex);

router.get("/products", controllerShop.getProducts);

router.get("/cart", controllerShop.getCart);

router.get("/checkout", controllerShop.getCheckout);

router.get('/orders', controllerShop.getOrders);

module.exports = router;
