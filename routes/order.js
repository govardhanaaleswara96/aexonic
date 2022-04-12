const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const authController = require("../controllers/auth");

// create Order routes
router.post("/", authController.verifyToken, orderController.createOrder);
// create Order routes
router.put("/", authController.verifyToken, orderController.updateOrder);
// create Order routes
router.delete("/", authController.verifyToken, orderController.cancelOrder);
// get ordered products
router.get(
  "/products",
  authController.verifyToken,
  orderController.getOrderProducts
);
// get ordered products
router.get(
  "/date",
  authController.verifyToken,
  orderController.getOrderProductsBasedOnDate
);
// get All ordered products counts
router.get(
  "/products-count",
  authController.verifyToken,
  orderController.getOrderProductsBasedOnCustomer
);
// get All ordered products and customer details
router.get(
  "/all-products",
  authController.verifyToken,
  orderController.getAllCustomerProducts
);
module.exports = router;
