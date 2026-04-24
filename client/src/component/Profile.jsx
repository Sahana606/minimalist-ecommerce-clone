import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

function Profile() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  console.log("Frontend email:", email);

 
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://minimalist-ecommerce-clone.onrender.com/user/${email}`
        );

        setUser({
          ...res.data,
          email: email, 
        });
      } catch (err) {
        console.log("User fetch error:", err);
      }
    };

    if (email) getUser();
  }, [email]);

 
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `https://minimalist-ecommerce-clone.onrender.com/user-orders/${email}`
        );
        setOrders(res.data);
      } catch (err) {
        console.log("Orders error:", err);
      }
    };

    if (email) getOrders();
  }, [email]);

 
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSave = async () => {
    try {
      await axios.put(
        `https://minimalist-ecommerce-clone.onrender.com/user/${email}`,
        {
          ...user,
          email: email,
        }
      );

      alert("Profile saved successfully");
      setIsEditing(false);
    } catch (err) {
      console.log("Save error:", err.response?.data || err.message);
      alert("Failed to save");
    }
  };

  return (
    <div className="profile-container">

     
      <div className="sidebar">
        <h3>{user.firstName || "User"}</h3>
        <p>{user.email}</p>

        <ul>
          <li onClick={() => setActiveTab("profile")}>Profile</li>
          <li onClick={() => setActiveTab("orders")}>My Orders</li>
          <li>Addresses</li>
          <li
            onClick={() => {
              localStorage.removeItem("email");
              localStorage.removeItem("user_id");
              navigate("/");
            }}
            style={{ color: "red", cursor: "pointer" }}
          >
            Logout
          </li>
        </ul>
      </div>

      <div className="profile-content">

        {activeTab === "profile" && (
          <div>

            {isEditing ? (
              <button className="edit-btn" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}

            <h2>Profile Details</h2>

            <div className="form">
              <input
                name="firstName"
                value={user.firstName || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="First Name"
              />

              <input
                name="lastName"
                value={user.lastName || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Last Name"
              />

              <input value={email} disabled />

              <input
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Phone"
              />
            </div>
          </div>
        )}

       
        {activeTab === "orders" && (
          <div>
            <h2>My Orders</h2>

            {orders.length === 0 ? (
              <p>No orders found</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="order-card">

                  <h4>Total: ₹{order.totalPrice}</h4>
                  <p>{new Date(order.datetime).toLocaleString()}</p>

                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image} width="80" alt="" />
                      <div>
                        <p>{item.productName}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>₹{item.price}</p>
                      </div>
                    </div>
                  ))}

                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;
