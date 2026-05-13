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

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

 useEffect(() => {
  const getUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${email}`
      );

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (email) getUser();
}, [email]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user-orders/${email}`
        );

        setOrders(res.data);
      } catch (err) {
        console.log("Orders error:", err);
      }
    };

    if (email) {
      getOrders();
    }
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
        `${import.meta.env.VITE_API_URL}/user/${email}`,
        {
          ...user,
          email,
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
          <li onClick={() => setActiveTab("profile")}>
            Profile
          </li>

          <li onClick={() => setActiveTab("orders")}>
            My Orders
          </li>

          <li onClick={() => setActiveTab("address")}>
            Addresses
          </li>

          <li
            onClick={() => {
              localStorage.removeItem("email");
              localStorage.removeItem("user_id");

              navigate("/");
            }}
            style={{
              color: "red",
              cursor: "pointer",
            }}
          >
            Logout
          </li>
        </ul>
      </div>

      <div className="profile-content">

        {activeTab === "profile" && (
          <div>

            {isEditing ? (
              <button
                className="edit-btn"
                onClick={handleSave}
              >
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
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <input
                type="email"
                value={email || ""}
                disabled
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={user.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
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
                <div
                  key={order._id}
                  className="order-card"
                >
                  <h4>
                    Total: ₹{order.totalPrice}
                  </h4>

                  <p>
                    {new Date(
                      order.datetime
                    ).toLocaleString()}
                  </p>

                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="order-item"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        width="80"
                      />

                      <div>
                        <p>{item.productName}</p>

                        <p>
                          Qty: {item.quantity}
                        </p>

                        <p>₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "address" && (
          <div>

            <h2>Saved Address</h2>

            {user.address ? (
              <div className="address-card">

                <p>
                  <strong>Name:</strong>{" "}
                  {user.address.name}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {user.address.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {user.address.address}
                </p>

                <p>
                  <strong>City:</strong>{" "}
                  {user.address.city}
                </p>

                <p>
                  <strong>District:</strong>{" "}
                  {user.address.district}
                </p>

                <p>
                  <strong>State:</strong>{" "}
                  {user.address.state}
                </p>

                <p>
                  <strong>Pincode:</strong>{" "}
                  {user.address.pincode}
                </p>

              </div>
            ) : (
              <p>No address saved</p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;
