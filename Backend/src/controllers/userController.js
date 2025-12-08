import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Product from "../Models/productModel.js";
import Order from "../Models/orderModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const demoDataFilePath = path.join(__dirname, "../../MOCK_DATA.JSON");
const demoOrdersDataFilePath = path.join(
  __dirname,
  "../../MOCK_ORDER_DATA.JSON"
);

let products = JSON.parse(fs.readFileSync(demoDataFilePath, "utf-8"));
let orders = JSON.parse(fs.readFileSync(demoOrdersDataFilePath, "utf-8"));

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
};

export const getProductDetailsById = async (req, res) => {
  const id = req.params.id;
  //const product = products.filter((product) => product.id === id);
  const product = await Product.findById(id);
  console.log(product);
  return res.json(product);
};

export const getFilteredProducts = (req, res) => {
  const filters = req.query;
  console.log(filters);
  const searchWord = new RegExp(filters.category, "i");
  const filteredProducts = products.filter(
    (product) =>
      searchWord.test(product.product_category) &&
      product.price >= filters.min_price &&
      product.price <= filters.max_price
  );
  //console.log(filteredProducts);
  return res.json(filteredProducts);
};

export const placeOrder = async (req, res) => {
  const data = req.body;
  console.log(data);
  let totalAmount = 0;
  let itemDetails = [];

  for (const item of data) {
    console.log(item);

    const product = await Product.findById(item.id);
    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    itemDetails.push({
      productId: product._id,
      name: product.productName,
      price: product.price,
      quantity: item.quantity,
    });

    totalAmount += Number((product.price * item.quantity).toFixed(2));
  }

  const orderData = { items: itemDetails, totalAmount, status: "pending" };

  console.log("Order Details: ", orderData);

  const orderDetail = new Order({
    items: itemDetails,
    totalAmount,
    status: "Pending",
  });

  await orderDetail.save();

  res
    .status(201)
    .json({ id: orderDetail._id, message: "Order placed successfully!" });
};

export const getOrderStatus = async (req, res) => {
  const id = req.params.id;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(400).json({ message: "Order doesn't exists!!" });
  }

  // later send the whole order so that we can show the items in the frontend.
  return res.json({ id: order._id, status: order.status });
};
