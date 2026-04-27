import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

function Address() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    localStorage.setItem("address", JSON.stringify(address));
    navigate("/payment");
  };

  return (
    <div className="address-page">
      <div className="address-box">
        <h2>Delivery Address</h2>

        <div className="form-group">
          <input name="name" placeholder="Full Name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
        </div>

        <div className="form-group">
          <textarea name="address" placeholder="House No, Street, Area" onChange={handleChange}></textarea>
        </div>

        <div className="row">
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="district" placeholder="District" onChange={handleChange} />
        </div>

        <div className="row">
          <input name="state" placeholder="State" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        </div>

        <button className="save-btn" onClick={handleSubmit}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

export default Address;
