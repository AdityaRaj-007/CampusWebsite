import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const demoDataFilePath = path.join(__dirname, "../../MOCK_DATA.JSON");
const demoOrdersDataFilePath = path.join(
  __dirname,
  "../../MOCK_ORDER_DATA.JSON"
);

let products = JSON.parse(fs.readFileSync(demoDataFilePath, "utf-8"));
let orders = JSON.parse(fs.readFileSync(demoOrdersDataFilePath, "utf-8"));

export const getAllProducts = (req, res) => {
  return res.json(products);
};

export const getProductDetailsById = (req, res) => {
  const id = Number(req.params.id);
  const product = products.filter((product) => product.id === id);
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

export const placeOrder = (req, res) => {
  const data = req.body;
  console.log(data);
  let totalPrice = 0;
  let orderDetails = [];

  data.forEach((item) => {
    console.log(item);
    const product = products.filter((product) => product.id === item.id);
    console.log(product);
    orderDetails.push({
      name: product[0].product_name,
      price: product[0].price * item.quantity,
    });
    console.log(orderDetails);
    totalPrice += product[0].price * item.quantity;
    console.log(totalPrice);
  });

  const orderData = { ...orderDetails, totalPrice, status: "pending" };

  orders.push({
    id: orders.length + 1,
    ...orderData,
  });

  fs.writeFile(demoOrdersDataFilePath, JSON.stringify(orders), (err) => {
    if (err) {
      console.error("Error occurred while creating order.", err);
      return;
    }

    return res.json({
      id: orders.length,
      message: "Order placed successfully!",
      status: orderData.status,
    });
  });
};

export const getOrderStatus = (req, res) => {
  const id = Number(req.params.id);

  const order = orders.filter((order) => order.id === id);
  if (order.length === 0) {
    return res.json({ message: "Invalid Order Id!" });
  }

  // later send the whole order so that we can show the items in the frontend.
  return res.json({ id, status: order[0].status });
};
