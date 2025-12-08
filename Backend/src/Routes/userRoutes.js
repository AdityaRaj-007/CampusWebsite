import express from "express";
import {
  getAllProducts,
  getFilteredProducts,
  getOrderStatus,
  getProductDetailsById,
  placeOrder,
} from "../controllers/userController.js";

export const router = express.Router();

router.get("/product/:id", getProductDetailsById);

router.get("/product", getFilteredProducts);

router.get("/products", getAllProducts);

router.post("/order", placeOrder);

router.get("/order/:id", getOrderStatus);
