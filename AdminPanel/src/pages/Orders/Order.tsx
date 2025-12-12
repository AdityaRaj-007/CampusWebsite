import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, Package, ShoppingBag } from "lucide-react";
// import ProductTable from "./ProductTable";
import OrderTable from "./OrderTable";

const Order = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <nav className="flex items-center space-x-6 border-b bg-white px-6 py-4 shadow-sm mb-6">
        <div className="font-bold text-lg mr-4">Campus</div>
        <a
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Home
        </a>
        <a
          href="/products"
          className="text-sm font-medium text-muted-foreground  transition-colors hover:text-primary"
        >
          Products
        </a>
        <a
          href="/orders"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Orders
        </a>
        <a
          href="/settings"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings
        </a>
      </nav>

      <div className="pl-6 pr-6">
        <header className="mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-light">Orders</h1>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <IndianRupee className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">60</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">60</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">No of Sales</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">60</div>
            </CardContent>
          </Card>
        </div>
        <OrderTable />
      </div>
    </div>
  );
};

export default Order;
