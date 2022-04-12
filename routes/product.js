const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const uploadController = require("../controllers/upload");
const authController = require("../controllers/auth");

// create Product routes
router.post(
  "/create",
  authController.verifyToken,
  uploadController.uploads.single("csv"),
  productController.createProduct
);

module.exports = router;
