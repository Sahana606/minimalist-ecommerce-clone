import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Otppage from "./component/Otppage";
import Home from "./component/Home";
import App from "./App";
import Shop from "./component/Shop";
import AdminLogin from "./admin/component/AdminLogin";
import AdminDashboard from "./admin/component/AdminDashboard";
import AddProduct from "./admin/component/AddProduct";
import EditProduct from "./admin/component/EditProduct";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { CartProvider } from "./component/CartContext";
import CartSidebar from "./component/CartSidebar";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
      <Routes>

      
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
  <Route path="/*" element={<App />} />

        
        <Route path="/otp" element={<Otppage />} />
        
 <Route path="/Shop" element={<Shop />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AdminDashboard />} />
         <Route path="/admin/manage-products" element={< AdminDashboard/>} />
         <Route path="/admin/manage-users" element={<AdminDashboard />} />
          <Route path="/admin/edit-users" element={<AdminDashboard />} />
          <Route path="/admin/update-product/:id" element={<EditProduct />} />
          <Route path="/admin/manage-order" element={<AdminDashboard />} />
       <Route path="/admin/edit-order" element={<AdminDashboard />} />
       <Route path="/admin/user-orders/:id" element={<AdminDashboard />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);