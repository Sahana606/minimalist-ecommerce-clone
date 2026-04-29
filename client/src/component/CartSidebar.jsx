import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartSidebar({ cart = [], setCart, showCart, setShowCart }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const GST_RATE = 0.18;

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );

  const gstAmount = total * GST_RATE;
  const finalTotal = total + gstAmount;

  const placeOrder = async () => {
    const email = localStorage.getItem("email");
    const user_id = localStorage.getItem("user_id");

    if (!email || !user_id) {
      alert("You must log in first!");
      return;
    }

    const items = cart.map(item => ({
      productName: item.name,
      quantity: item.qty || 1,
      price: item.price,
      image: item.images ? item.images[0] : ""
    }));

    try {
      await axios.post("https://minimalist-ecommerce-clone.onrender.com/place-order", {
        user_id,
        email,
        items,
        totalPrice: finalTotal,
        gst: gstAmount,
        datetime: new Date()
      });

      alert("Order placed successfully");
      setCart([]);
      setShowCart(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Server error while placing order");
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className={`cart-sidebar ${showCart ? "active" : ""}`}>
      {message && <div className="toast">{message}</div>}

      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={() => setShowCart(false)}>X</button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.id}>
              <span className="remove-btn" onClick={() => removeItem(item.id)}>X</span>
             <img src={item.image || item.images?.[0] || "https://via.placeholder.com/60"} width="60" alt={item.name}/>
              <div>
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <p>Price: ₹{item.price}</p>
                <p>Total: ₹{Number(item.price) * (item.qty || 1)}</p>
                <div className="qty">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty || 1}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <h4>Subtotal: ₹{total.toFixed(2)}</h4>
        <h4>GST (18%): ₹{gstAmount.toFixed(2)}</h4>
        <h3>Total: ₹{finalTotal.toFixed(2)}</h3>

        <button
          className="buy-btn"
          onClick={() => {
            setMessage("Proceeding to address page...");
            setTimeout(() => {
              navigate("/address");
            }, 1000);
          }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default CartSidebar;

