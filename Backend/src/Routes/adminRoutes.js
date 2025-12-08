import express from "express";
import {
  createProduct,
  deleteProduct,
  editProductDetails,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";

export const router = express.Router();

router.post("/product", createProduct);

router.route("/product/:id").put(editProductDetails).delete(deleteProduct);

router.get("/orders", getAllOrders);

router.put("/order/:id", updateOrderStatus);
