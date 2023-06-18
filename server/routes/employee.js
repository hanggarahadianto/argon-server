const path = require("path");
const express = require("express");
const { uploadFile } = require("../middleware/uploadFile");

const employeeController = require("../controllers/employee");

const router = express.Router();

router.get("/", employeeController.getEmployee);
router.post("/", uploadFile("photo"), employeeController.addEmployee);
router.get("/:id", employeeController.getEmployeeId);
router.delete("/:id", employeeController.deleteEmployee);
// router.get("/cart", orderController.getCart);

// router.post("/cart", orderController.postCart);

module.exports = router;
