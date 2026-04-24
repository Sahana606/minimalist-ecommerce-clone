import "../style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const lastEmail = localStorage.setItem("otpEmail", email);
    if (lastEmail) {
      setEmail(lastEmail);
    }
  }, []);

  const validateEmail = (value) => {
    if (!validator.isEmail(value)) {
      setEmailError("Enter valid Email!");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return;

    try {
      await axios.post("https://minimalist-ecommerce-clone.onrender.com/login", { email });

      
      localStorage.setItem("otpEmail", email);

      navigate("/otp", { state: { email } });

    } catch (err) {
      console.log("Error:", err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <img src="images/LOGIN.avif" width="300" height="300" alt="Login" />

        <h2>Login</h2>
        <p>Enter your Email</p>

        <div>
          <input
            type="email"
            placeholder="enter email example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>

        <br /><br />

        <button type="submit" className="button">
          Request OTP
        </button>

        <h6>
          I accept that I have read & understand <br />
          Privacy Policy and T&Cs.
        </h6>
      </div>
    </form>
  );
}

export default Login;
