import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Product from "./pages/Products/Product.tsx";
import Order from "./pages/Orders/Order.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Product />} />
      <Route path="/orders" element={<Order />} />
    </Routes>
  );
}

export default App;
