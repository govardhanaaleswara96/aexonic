const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
