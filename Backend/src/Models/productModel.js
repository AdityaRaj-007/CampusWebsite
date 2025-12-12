import mongoose from "mongoose";
import { Schema } from "mongoose";

export const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    price: { type: Number, required: true },
    productCategory: { type: String, required: true },
    quantityInStock: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
