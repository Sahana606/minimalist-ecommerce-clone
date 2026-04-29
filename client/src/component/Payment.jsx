import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment({ cart, setCart, setShowCart }) {
  const navigate = useNavigate();

  const user_id = localStorage.getItem("user_id");
  const email = localStorage.getItem("email");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const address = JSON.parse(localStorage.getItem("address"));

  const GST_RATE = 0.18;

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );

  const gstAmount = subtotal * GST_RATE;
  const total = subtotal + gstAmount;

  const placeOrder = async (paymentData = {}) => {
    if (!email || !user_id) {
      alert("You must log in first!");
      return;
    }

    if (!address) {
      alert("Please add address first");
      navigate("/address");
      return;
    }

    const items = cart.map((item) => ({
      productName: item.name,
      quantity: item.qty || 1,
      price: item.price,
      image: item.images ? item.images[0] : "",
    }));

    try {
      await axios.post(
        "https://minimalist-ecommerce-clone.onrender.com/place-order",
        {
          user_id,
          email,
          items,
          subtotal,
          gst: gstAmount,
          totalPrice: total,
          address,
          paymentMethod,
          paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
          ...paymentData,
          datetime: new Date(),
        }
      );

      alert("Order placed successfully ");

      setCart([]);
      setShowCart(false);
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Server error while placing order ");
    }
  };

  const handleOnlinePayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay not loaded");
        return;
      }

      const { data } = await axios.post(
        "https://minimalist-ecommerce-clone.onrender.com/create-razorpay-order",
        { amount: total }
      );

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
    } catch (err) {
      console.error(err);
      alert("Payment failed ");
    }
  };

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>

      <div className="payment-summary">
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
        <h3>Total: ₹{total.toFixed(2)}</h3>
      </div>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Pay Online (UPI / Card / NetBanking)
        </label>

        <button
          className="pay-btn"
          onClick={() => {
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

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Payment({ cart, setCart, setShowCart }) {
//   const navigate = useNavigate();

//   const user_id = localStorage.getItem("user_id");
//   const email = localStorage.getItem("email");

//   const [paymentMethod, setPaymentMethod] = useState("COD");

//   const address = JSON.parse(localStorage.getItem("address"));

//   // ✅ TOTAL
//   const total = cart.reduce(
//     (sum, item) => sum + Number(item.price) * (item.qty || 1),
//     0
//   );

//   // ✅ PLACE ORDER
//   const placeOrder = async (paymentData = {}) => {
//     if (!email || !user_id) {
//       alert("You must log in first!");
//       return;
//     }

//     if (!address) {
//       alert("Please add address first");
//       navigate("/address");
//       return;
//     }

//     const items = cart.map((item) => ({
//       productName: item.name,
//       quantity: item.qty || 1,
//       price: item.price,
//       image: item.images ? item.images[0] : "",
//     }));

//     try {
//       await axios.post(
//         "https://minimalist-ecommerce-clone.onrender.com/place-order",
//         {
//           user_id,
//           email,
//           items,
//           totalPrice: total,
//           address,
//           paymentMethod,
//           paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
//           ...paymentData,
//           datetime: new Date(),
//         }
//       );

//       alert("Order placed successfully ✅");

//       setCart([]);
//       setShowCart(false);

//       navigate("/"); // go to home after order
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Server error while placing order ❌");
//     }
//   };

//   // ✅ ONLINE PAYMENT
//   const handleOnlinePayment = async () => {
//     try {
//       if (!window.Razorpay) {
//         alert("Razorpay not loaded");
//         return;
//       }

//       const { data } = await axios.post(
//         "https://minimalist-ecommerce-clone.onrender.com/create-razorpay-order",
//         { amount: total }
//       );

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: data.amount,
//         currency: "INR",
//         order_id: data.id,
//         handler: function (response) {
//           placeOrder({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//           });
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed ❌");
//     }
//   };

//   return (
//     <div className="payment-container">
//       <h2>Select Payment Method</h2>

//       <div className="payment-options">
//         <label>
//           <input
//             type="radio"
//             value="COD"
//             checked={paymentMethod === "COD"}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           />
//           Cash on Delivery
//         </label>

//         <label>
//           <input
//             type="radio"
//             value="ONLINE"
//             checked={paymentMethod === "ONLINE"}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           />
//           Pay Online (UPI / Card / NetBanking)
//         </label>

//         <button
//           className="pay-btn"
//           onClick={() => {
//             if (paymentMethod === "COD") {
//               placeOrder();
//             } else {
//               handleOnlinePayment();
//             }
//           }}
//         >
//           {paymentMethod === "COD"
//             ? "Place Order"
//             : "Proceed to Pay"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Payment;
