const express = require("express");

const controllerShop = require("../controllers/controller.shop");

const router = express.Router();

router.get("/", controllerShop.getIndex);

router.get("/products", controllerShop.getProducts);

router.get("/products/:productId", controllerShop.getProduct);

router.get("/cart", controllerShop.getCart);

router.post("/cart", controllerShop.postCart);

router.post("/cart-delete-item", controllerShop.postCartDeleteProduct);

// router.get("/checkout", controllerShop.getCheckout);

router.post("/create-order", controllerShop.postOrder);

router.get("/orders", controllerShop.getOrders);



module.exports = router;
