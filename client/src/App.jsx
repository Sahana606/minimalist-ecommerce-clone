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
import Profile from "./component/Profile";
import ProductDetails from "./component/ProductDetails";
import AdminLogin from "./admin/component/AdminLogin";
import AdminDashboard from "./admin/component/AdminDashboard";
import ManageOrders from "./admin/component/ManageOrders";
import EditOrder from "./admin/component/EditOrder";
import ManageUsers from "./admin/component/ManageUsers";
import AddProduct from "./admin/component/AddProduct";
import EditProduct from "./admin/component/EditProduct";
import CartSidebar from "./component/CartSidebar";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
const isLoggedIn = localStorage.getItem("email");
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

        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otppage />} />
       <Route
  path="/profile"
  element={isLoggedIn ? <Profile /> : <Login />}
/>

        <Route path="/shop" element={<Shop />} />
        <Route path="/best" element={<Best />} />
        <Route path="/care" element={<Care />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/track" element={<Track />} />
        <Route path="/star" element={<Star />} />

        <Route path="/search/:keyword" element={<Search />} />

        <Route
          path="/product/:id"
          element={<ProductDetails setCart={setCart} />}
        />

        
        <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/admin/admindashboard" element={<AdminDashboard />} /> 
        <Route path="/admin/add-product" element={<AdminDashboard />} />
        <Route path="/admin/manage-products" element={<AdminDashboard />} />
        <Route path="/admin/manage-users" element={<AdminDashboard />} />
        <Route path="/admin/manage-order" element={<AdminDashboard />} />
        <Route path="/admin/edit-users" element={<AdminDashboard />} /> 

        <Route
          path="/admin/update-product/:id"
          element={<EditProduct />}
        />

        <Route
          path="/admin/edit-order"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/user-orders/:id"
          element={<AdminDashboard />}
        />

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
