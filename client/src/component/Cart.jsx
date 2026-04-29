import { useContext } from "react";
import { CartContext } from "../component/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {

  const {
    cart,
    increaseQty,
    decreaseQty,
    closeCart,
    clearCart
  } = useContext(CartContext);

  
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const placeOrder = async () => {
    try {

      const email = localStorage.getItem("email");
      const user_id = localStorage.getItem("user_id");

      const items = cart.map(item => ({
        productName: item.name,
        quantity: item.qty,
        price: item.price,
        image: item.image || item.images?.[0]
      }));

      const totalPrice = cart.reduce(
        (sum, item) => sum + Number(item.price) * item.qty,
        0
      );

      await axios.post("https://minimalist-ecommerce-clone.onrender.com/place-order", {
        user_id,
        email,
        items,
        totalPrice
      });

      alert("Order placed successfully");

      clearCart();
      closeCart();

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="cart-sidebar">

      <div className="cart-header">
        <h3>Cart</h3>
        <i
          className="fa-solid fa-xmark close-cart"
          onClick={closeCart}
        ></i>
      </div>

      <div className="cart-items">

        {cart.length === 0 ? (

          <div className="empty-cart">
            <h2>No Products Added to Cart</h2>
            <Link to="/">
              <button className="continue-btn" onClick={closeCart}>
                Continue Shopping
              </button>
            </Link>
          </div>

        ) : (

          cart.map((item) => (

            <div key={item.id} className="cart-item">

              <img
                src={
                  item.image
                }
                alt={item.name}
              />

              <div className="cart-info">

                <h4>{item.name}</h4>

                
                <p>{item.desc || item.description}</p>

               
                <p className="price">₹{item.price}</p>

               
                <p>Total: ₹{item.price * item.qty}</p>

                <div className="qty-box">

                  <button onClick={() => decreaseQty(item.id)}>
                    {item.qty === 1
                      ? <i className="fa-solid fa-trash"></i>
                      : <i className="fa-solid fa-minus"></i>
                    }
                  </button>

                  <span>{item.qty}</span>

                  <button onClick={() => increaseQty(item.id)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

      {cart.length > 0 && (

        <div className="billing">

          <div className="bill-row">
            <span>Total Price</span>
            <span>₹{total}</span>
          </div>

          <div className="bill-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="total-price">₹{total}</div>

          <button className="proceed-btn" onClick={placeOrder}>
            Proceed
          </button>

        </div>

      )}

    </div>
  );
}

export default Cart;
