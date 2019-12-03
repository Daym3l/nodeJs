const express = require("express");
const authController = require("../controllers/cotroller.auth");
const router = express.Router();

router.get("/login", authController.login);

module.exports = router;
