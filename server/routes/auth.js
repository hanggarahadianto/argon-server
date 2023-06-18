const path = require("path");
const express = require("express");

const authController = require("../controllers/auth");
const { validateToken } = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", authController.getAuth);
router.post("/", authController.addAuth);
router.post("/login", authController.login);

router.get("/auth-profile", validateToken, authController.authProfile);
// router.get("/product", orderController.getProducts);
// router.get("/cart", orderController.getCart);

// router.post("/cart", orderController.postCart);

module.exports = router;
