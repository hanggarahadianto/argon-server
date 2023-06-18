const path = require("path");
const express = require("express");

const absenceController = require("../controllers/absence");

const { validateToken } = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", validateToken, absenceController.getAbsence);
router.post("/", validateToken, absenceController.addAbsence);
router.get("/:id", absenceController.getAbsenceId);

// router.get("/product", orderController.getProducts);
// router.get("/cart", orderController.getCart);

// router.post("/cart", orderController.postCart);

module.exports = router;
