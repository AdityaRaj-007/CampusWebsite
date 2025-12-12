import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  IndianRupee,
} from "lucide-react";

interface Orders {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: any[];
}

interface Products {
  _id: string;
  productName: string;
  productDescription: string;
  price: number;
  productCategory: string;
  quantityInStock: number;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch("http://127.0.0.1:3000/api/admin/orders"),
          fetch("http://127.0.0.1:3000/api/admin/products"),
        ]);

        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();

        setOrders(ordersData);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const lowStockItems = products.filter(
    (p) => Number(p.quantityInStock) < 5
  ).length;

  if (isLoading) return <div className="p-8">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <nav className="flex items-center space-x-6 border-b bg-white px-6 py-4 shadow-sm mb-6">
        <div className="font-bold text-lg mr-4">Campus</div>
        <a
          href="/"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Home
        </a>
        <a
          href="/products"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Products
        </a>
        <a
          href="/orders"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hello User</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your store today.
            </p>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalRevenue)}
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                Total orders processed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products in Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                Active inventory items
              </p>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Low Stock Alert
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {lowStockItems}
              </div>
              <p className="text-xs text-muted-foreground">
                Items need restocking
              </p>
            </CardContent>
          </Card> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <a
                href="/orders"
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </a>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 5).map(
                    (
                      order // Only showing top 5
                    ) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-mono text-xs text-gray-500">
                          #{order._id.slice(-6).toUpperCase()}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(order.createdAt)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(order.totalAmount)}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Inventory Status</CardTitle>
              <a
                href="/products"
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                Manage Products <ArrowUpRight className="h-4 w-4 ml-1" />
              </a>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.slice(0, 5).map(
                    (
                      product // Only showing top 5
                    ) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">
                          {product.productName}
                        </TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              Number(product.quantityInStock) < 5
                                ? "text-red-600 font-bold"
                                : ""
                            }
                          >
                            {product.quantityInStock}
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
