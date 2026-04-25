const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  items: [
    {
      productName: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalPrice: Number,
  paymentMethod: {
    type:String
  },
  razorpay_order_id:String,
  razorpay_payment_id:String,
  status: {
    type: String,
    default: "Pending",
  },

  datetime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
