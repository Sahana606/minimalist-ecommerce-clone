import AddProduct from "./AddProduct";
import ManageProduct from "./ManageProduct";
import EditProduct from "./EditProduct";
import ManageUsers from "./ManageUsers";
import EditUser from "./EditUser";
import ManageOrders from "./ManageOrders";
import EditOrder from "./EditOrder";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const BASE_URL = "https://minimalist-ecommerce-clone.onrender.com";

  const [recentOrders, setRecentOrders] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ordersRes = await axios.get(`${BASE_URL}/admin/orders`);
        const productsRes = await axios.get(`${BASE_URL}/products`);
        const usersRes = await axios.get(`${BASE_URL}/users`);

        const orders = ordersRes.data;

        setTotalOrders(orders.length);
        setTotalProducts(productsRes.data.length);
        setTotalUsers(usersRes.data.length);

        // Revenue
        const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
        setTotalRevenue(revenue);

        // Recent Orders
        const latest = [...orders]
          .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
          .slice(0, 5);

        setRecentOrders(latest);

        // Revenue Chart
        const grouped = {};
        orders.forEach(order => {
          const date = new Date(order.datetime).toLocaleDateString();
          if (!grouped[date]) grouped[date] = 0;
          grouped[date] += order.totalPrice || 0;
        });

        setRevenueData(
          Object.keys(grouped).map(date => ({
            date,
            revenue: grouped[date]
          }))
        );

        setLoading(false);

      } catch (err) {
        console.log("Dashboard Error:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div>

      {/* NAVBAR */}
      <div className="nav-container">
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="admin-logo">
            <img src="/images/Minimalist.webp" alt="Logo" />
            <span className="admin-tag">Admin</span>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
      </div>

      <div className="admin-container">

        {/* SIDEBAR */}
        <div className="sidebar">
          <Link to="/admin/add-product">Add Product</Link>
         <Link to="/admin/manage-products">Manage Product</Link>
          <Link to="/admin/manage-order">Manage Orders</Link>
          <Link to="/admin/manage-users">Manage Users</Link>
        </div>

        {/* ROUTING */}
        {location.pathname.startsWith("/admin/update-product") ? (
          <EditProduct />

        ) : location.pathname.startsWith("/admin/edit-user") ? (
          <EditUser />

        ) : location.pathname.startsWith("/admin/edit-order") ? (
          <EditOrder />

        ) : location.pathname.startsWith("/admin/user-orders") ? (
          <EditOrder />

        ) : location.pathname === "/admin/add-product" ? (
          <AddProduct />

        ) : location.pathname === "/admin/manage-products" ? (
          <ManageProduct />

        ) : location.pathname === "/admin/manage-order" ? (
          <ManageOrders />

        ) : location.pathname === "/admin/manage-users" ? (
          <ManageUsers />

        ) : (

          /* DASHBOARD UI */
          <div className="dashboard-main-content">

            <h2>Welcome to Admin Dashboard</h2>

            {/* STATS */}
            <div className="stats-grid">
              <div>Total Products: {totalProducts}</div>
              <div>Total Orders: {totalOrders}</div>
              <div>Total Users: {totalUsers}</div>
              <div>Total Revenue: ₹{totalRevenue}</div>
            </div>

            {/* GRAPH */}
            <div style={{ marginTop: "30px" }}>
              <h3>Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#009640" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* RECENT ORDERS */}
            <div style={{ marginTop: "30px" }}>
              <h3>Recent Orders</h3>

              <table border="1" width="100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id.slice(-6)}</td>
                      <td>{new Date(order.datetime).toLocaleDateString()}</td>
                      <td>₹{order.totalPrice}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;
