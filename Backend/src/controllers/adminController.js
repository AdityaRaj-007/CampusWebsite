import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Product from "../Models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const demoDataFilePath = path.join(__dirname, "../../MOCK_DATA.JSON");
const demoOrdersDataFilePath = path.join(
  __dirname,
  "../../MOCK_ORDER_DATA.JSON"
);

let products = JSON.parse(fs.readFileSync(demoDataFilePath, "utf-8"));
let orders = JSON.parse(fs.readFileSync(demoOrdersDataFilePath, "utf-8"));

export const createProduct = async (req, res) => {
  const data = req.body;
  console.log(data);

  const productDetails = new Product({ ...data });

  await productDetails.save();

  return res.status(201).json({ message: "Product Created Successfully!" });
};

export const editProductDetails = (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  console.log(products.at(id - 1));
  products[id - 1] = { id, ...data };

  fs.writeFile(demoDataFilePath, JSON.stringify(products), (err) => {
    if (err) {
      console.error("Failed to updated product data!", err);
      return;
    }

    return res.json({ id, ...data });
  });
};

export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  const remainingProducts = products.filter((product) => product.id !== id);

  fs.writeFile(demoDataFilePath, JSON.stringify(remainingProducts), (err) => {
    if (err) {
      console.error("Failed to delete product", err);
      return;
    }

    return res.json({ id, message: "Successfully deleted the product!" });
  });
};

export const getAllOrders = (req, res) => {
  res.json(orders);
};

export const updateOrderStatus = (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  const orderDetails = orders.filter((order) => order.id === id);
  orderDetails[0].status = data.status;
  //const newOrderDetails = { ...orderDetails };
  orders[id - 1] = orderDetails[0];

  fs.writeFile(demoOrdersDataFilePath, JSON.stringify(orders), (err) => {
    if (err) {
      console.error(
        `Error occurred while updated the order status of order :${id}`,
        err
      );
      return;
    }

    res.json({ id, message: "Order status updated successfully!" });
  });
};
