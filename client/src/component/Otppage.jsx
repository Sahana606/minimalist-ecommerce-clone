import { useEffect, useState } from "react";
import "../style.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Otppage() {
  const location = useLocation();
  const navigate = useNavigate();

 
  const email =
    location.state?.email || localStorage.getItem("otpEmail");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  
  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      setError("Please enter complete OTP");
      return;
    }

    try {
      const res = await axios.post(
        "https://minimalist-ecommerce-clone.onrender.com/verify-otp",
        { email, otp: finalOtp }
      );

      console.log("Response:", res.data);

     
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("user_id", res.data.user_id || "");
      localStorage.removeItem("otpEmail");
      console.log("Going to profile...");
navigate("/profile");
     

    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");

      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };


  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

 
  const handleResend = async () => {
    try {
      await axios.post("http://127.0.0.1:3001/resend-otp", { email });
      setCounter(60); 
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="otp">
      <div className="container">
        <img src="images/LOGIN.avif" width="300" height="300" alt="Login" />
        <h1>Enter OTP</h1>
        <p>OTP sent on {email}</p>

        <div className="otp-boxes">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="otp-input"
            />
          ))}
        </div>

        <button onClick={handleVerify} className="button">
          Verify OTP →
        </button>

        <div style={{ marginTop: "10px" }}>
          {counter > 0 ? (
            <span>Resend OTP in {counter}s</span>
          ) : (
            <button onClick={handleResend}>
              Resend OTP
            </button>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Otppage;
