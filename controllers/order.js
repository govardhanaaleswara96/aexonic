const orderModel = require("../models/order");
/**
 * create order function
 */
const createOrder = async (req, res) => {
  const { productId, quantity, userId } = req.body;
  try {
    const newOrder = new orderModel({
      productId: productId,
      quantity: quantity,
      userId: userId,
    });
    const order = await newOrder.save();
    res.status(201).json({
      message: "Order Created Successfully",
      data: order,
    });
  } catch (error) {
    res.status(201).json({
      message: "Order Failed",
    });
  }
};
/**
 * Update order function
 */
const updateOrder = async (req, res) => {
  try {
    const { orderId, productId, quantity } = req.body;
    const order = await orderModel.findOneAndUpdate(orderId, {
      $set: req.body,
    });
    res.status(201).json({
      message: "Order Updated Successfully",
      data: order,
    });
  } catch (error) {
    res.status(201).json({
      message: "Order Update Failed",
    });
  }
};
/**
 * Delete order function
 */
const cancelOrder = async (req, res) => {
  try {
    const { orderId, productId, quantity } = req.body;
    const order = await orderModel.findOneAndDelete(orderId);
    res.status(201).json({
      message: "Order cancelled Successfully",
      data: order,
    });
  } catch (error) {
    res.status(201).json({
      message: "Order cancelled Failed",
    });
  }
};
/**
 * get orders products based on customer
 */
const getOrderProducts = async (req, res) => {
  const userId = req.body.userId;
  try {
    const orderProducts = await orderModel
      .find({ userId: userId })
      .sort("_id")
      .populate("productId");
    console.log(orderProducts);
    res.status(201).json({
      data: orderProducts,
    });
  } catch (error) {
    res.status(404).json({
      message: "products fetch failed",
    });
  }
};

/**
 * get ordered products count based on the date
 */
const getOrderProductsBasedOnDate = async (req, res) => {
  const date = new Date(req.body.date);
  const startDate = new Date(req.body.date);
  startDate.setDate(startDate.getDate() - 1);
  const endDate = new Date(req.body.date);
  endDate.setDate(endDate.getDate() + 1);
  try {
    const productCounts = await orderModel
      .find({
        createdAt: {
          $gt: new Date(startDate),
          $lt: new Date(endDate),
        },
      })
      .sort({ createdAt: "asc" })
      .lean();
    res.status(404).json({
      data: {
        "product counts": productCounts.length,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "products fetch failed",
    });
  }
};
/**
 * get product count based on customer
 */

const getOrderProductsBasedOnCustomer = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productCounts = await orderModel.find({ userId: userId });
    res.status(404).json({
      data: {
        productCounts: productCounts.length,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "products fetch failed",
    });
  }
};
/**
 * get all customer info &  orderInfo with product details
 */
const getAllCustomerProducts = async (req, res) => {
  try {
    const allProducts = await orderModel
      .find({})
      .populate("productId")
      .populate("userId");
    res.status(404).json({
      data: allProducts,
    });
  } catch (error) {
    res.status(404).json({
      message: "products fetch failed",
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  cancelOrder,
  getOrderProducts,
  getOrderProductsBasedOnDate,
  getAllCustomerProducts,
  getOrderProductsBasedOnCustomer,
};
