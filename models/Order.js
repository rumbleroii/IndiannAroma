const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: String,
          required: true,
        },
      },
    ],
    bill: {
      type: Number,
      required: true,
    },
    date_added: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Pending",
      required: true
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model("Order", OrderSchema);
