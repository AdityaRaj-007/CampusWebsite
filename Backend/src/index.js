import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const demoDataFilePath = path.join(__dirname, "../MOCK_DATA.JSON");
const demoOrdersDataFilePath = path.join(__dirname, "../MOCK_ORDER_DATA.JSON");

app.use(express.json());

let products = JSON.parse(fs.readFileSync(demoDataFilePath, "utf-8"));
let orders = JSON.parse(fs.readFileSync(demoOrdersDataFilePath, "utf-8"));

//app.route().patch().delete();

app.get("/api/product/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.filter((product) => product.id === id);
  console.log(product);
  return res.json(product);
});

app.get("/api/product", (req, res) => {
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
});

app.get("/api/products", (req, res) => {
  return res.json(products);
});

app.post("/api/order", (req, res) => {
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
});

app.get("/api/order/:id", (req, res) => {
  const id = Number(req.params.id);

  const order = orders.filter((order) => order.id === id);
  if (order.length === 0) {
    return res.json({ message: "Invalid Order Id!" });
  }

  // later send the whole order so that we can show the items in the frontend.
  return res.json({ id, status: order[0].status });
});

// Admin Routes
app.post("/api/admin/product", (req, res) => {
  const data = req.body;
  console.log(data);

  products.push({
    id: products.length + 1,
    ...data,
  });

  console.log(products);

  fs.writeFile(demoDataFilePath, JSON.stringify(products), (err) => {
    if (err) {
      console.error(err, "Error occurred while adding product!");
      return;
    }
    console.log("Product added successfully!");

    return res.json({
      id: products.length,
      message: "Product added successfully!",
    });
  });
});

app
  .route("/api/admin/product/:id")
  .put((req, res) => {
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
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const remainingProducts = products.filter((product) => product.id !== id);

    fs.writeFile(demoDataFilePath, JSON.stringify(remainingProducts), (err) => {
      if (err) {
        console.error("Failed to delete product", err);
        return;
      }

      return res.json({ id, message: "Successfully deleted the product!" });
    });
  });

app.get("/api/admin/orders", (req, res) => {
  res.json(orders);
});

app.put("/api/admin/order/:id", (req, res) => {
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
});

app.listen(PORT, () => console.log(`Server is listening on PORT:${PORT}`));
