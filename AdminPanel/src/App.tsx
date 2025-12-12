import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Product from "./pages/Products/Product.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Product />} />
    </Routes>
  );
}

export default App;
