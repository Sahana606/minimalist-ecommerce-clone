import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./component/Home";
import Shop from "./component/Shop";
import Best from "./component/Best";
import Care from "./component/Care";
import Ai from "./component/Ai";
import Track from "./component/Track";
import Star from "./component/Star";
import Login from "./component/Login";
import Otppage from "./component/Otppage";
import Search from "./component/Search";

import AdminLogin from "./admin/component/AdminLogin";
import AdminDashboard from "./admin/component/AdminDashboard";
import AddProduct from "./admin/component/AddProduct";
import ManageOrders from "./admin/component/ManageOrders";
import EditOrder from "./admin/component/EditOrder";
import ManageUsers from "./admin/component/ManageUsers";
import ProductDetails from "./component/ProductDetails";

import CartSidebar from "./component/CartSidebar";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              showCart={showCart}
              setShowCart={setShowCart}
            />
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/best" element={<Best />} />
        <Route path="/care" element={<Care />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/track" element={<Track />} />
        <Route path="/star" element={<Star />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otppage />} />
        <Route path="/search" element={<Search/>}/>
<Route
      path="/product/:id"
      element={<ProductDetails addToCart={addToCart} />}
    />
       
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* <Route path="/admin/add-product" element={<AddProduct />} /> */}
        <Route path="/admin/manage-order" element={<ManageOrders />} />

       <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/edit-order/:id" element={<EditOrder />} />

      </Routes>

      
      <CartSidebar
        cart={cart}
        setCart={setCart}
        showCart={showCart}
        setShowCart={setShowCart}
      />

    </BrowserRouter>
  );
}

export default App;
