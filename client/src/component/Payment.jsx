import { useContext, useState, useEffect } from "react";
import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const email = localStorage.getItem("email");
  const [paymentMethod, setPaymentMethod] = useState("COD");



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

    const totalPrice = cart.reduce(
      (sum, item) => sum + Number(item.price) * (item.qty || 1),
      0
    );

    try {
      await axios.post("https://minimalist-ecommerce-clone.onrender.com/place-order", {
        user_id,
        email,
        items,
        totalPrice,
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

  const handleOnlinePayment = async () => {
    

    const { data } = await axios.post("https://minimalist-ecommerce-clone.onrender.com",{ amount: total });
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.amount,
      currency: "INR",
      order_id: data.id,
      handler: function (response) {
        placeOrder({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
        });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>

      <div className="payment-options">
        <label>
          <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
          Cash on Delivery
        </label>

        <label>
          <input type="radio" value="ONLINE" checked={paymentMethod === "ONLINE"} onChange={(e) => setPaymentMethod(e.target.value)} />
          Pay Online (UPI / Card / NetBanking)
        </label>

        <button className="pay-btn"  onClick={() => {
            if (paymentMethod === "COD") {
              placeOrder();
            } else {
              handleOnlinePayment();
            }
          }}
        >
          {paymentMethod === "COD" ? "Place Order" : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
}

export default Payment;
