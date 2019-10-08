const path = require("path");

const express = require("express");
const adminController = require("../controllers/controller.admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.post("/edit-product/:productId", adminController.);


module.exports = router;
