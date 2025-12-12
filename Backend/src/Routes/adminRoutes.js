import express from "express";
import {
  createProduct,
  deleteProduct,
  editProductDetails,
  getAllOrders,
  getAllProducts,
  updateOrderStatus,
} from "../controllers/adminController.js";

export const router = express.Router();

router.get("/products", getAllProducts);

router.post("/product", createProduct);

router.route("/product/:id").put(editProductDetails).delete(deleteProduct);

router.get("/orders", getAllOrders);

router.put("/order/:id", updateOrderStatus);
