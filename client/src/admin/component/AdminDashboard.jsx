import { Link, useLocation } from "react-router-dom";
import AddProduct from "./AddProduct";
import ManageProduct from "./ManageProduct";
import EditProduct from "./EditProduct";
import ManageUsers from "./ManageUsers";
import EditUser from "./EditUser";
import ManageOrders from "./ManageOrders";
import EditOrder from "./EditOrder";

function AdminDashboard() {
  const location = useLocation();

  return (
    <div>

      <div className="nav-container">
        <nav className="admin-nav">
          <Link to="/" className="admin-logo">
            <img src="/images/Minimalist.webp" alt="Logo" />
            <span className="admin-tag">Admin</span>
          </Link>
          <button className="logout-btn">Logout</button>
        </nav>
      </div>

      <div className="admin-container">

        <div className="sidebar">
          <Link to="/admin/add-product">Add Product</Link>
          <Link to="/admin/manage-products">Manage Product</Link>
          <Link to="/admin/manage-order">Manage Orders</Link>
          <Link to="/admin/manage-users">Manage Users</Link>
        </div>

        {location.pathname.startsWith("/admin/update-product") ? (
          <EditProduct />

        ) : location.pathname.startsWith("/admin/edit-user") ? (
          <EditUser />

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
          <div className="welcome-dashboard-card">
            <h2>Welcome to Admin Dashboard</h2>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;