import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

function Profile() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(true);
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
          `https://minimalist-ecommerce-clone.onrender.com/user/${email}`
        );
       setUser({
  ...res.data,
  email: email, // force email from localStorage
});
      } catch (err) {
        console.log(err);
      }
    };

    if (email) getUser();
  }, [email]);

  
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  
const handleSave = async () => {
  try {
    console.log("Sending data:", user);

    const res = await axios.put(
      `https://minimalist-ecommerce-clone.onrender.com/user/${email}`,
      user
    );

    console.log("Response:", res.data);

    alert("Profile saved successfully");
    setIsEditing(false);

  } catch (err) {
    console.log("FULL ERROR:", err.response);
    alert("Failed to save");
  }
};

  return (
    <div className="profile-container">

     
      <div className="sidebar">
        <h3>{user.firstName || "User"}</h3>
        <p>{user.email}</p>

        <ul>
          <li className="active">Profile</li>
          <li>My Orders</li>
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
<input
  value={email}
  disabled
  placeholder="Email"
/>

          <input
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Phone"
          />

        </div>
      </div>

    </div>
  );
}

export default Profile;
