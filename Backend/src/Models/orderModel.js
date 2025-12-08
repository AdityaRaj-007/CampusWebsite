import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    items: [orderItemSchema],
    status: String, // change it to enum later.
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

export default Order;
