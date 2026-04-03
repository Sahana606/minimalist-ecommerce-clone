import { Link } from "react-router-dom";
import "../style.css";


function Header({ showCart, setShowCart }) {
  
  return (
    <>
      <div className="top">enjoy free shipping on every order</div>

      <header className="header">
        <div className="logo">
          <img src="/images/Minimalist.webp" width="180" height="35" alt="logo" />
        </div>

        <nav className="nav-links">
          <Link to="/shop">Shop</Link>
          <Link to="/Best">Best Seller</Link>
          <a href="#">Skin and Body Care</a>
          <Link to="/Care">Baby care</Link>
          <a href="#">Hair Care</a>
          <Link to="/Ai">AI Assistants</Link>
          <Link to="/Track">Track order</Link>
        </nav>

        <div className="icons">
          <i className="fa-regular fa-star"></i>
          <i className="fa-solid fa-magnifying-glass"></i>

          <Link to="/login">
            <i className="fa-regular fa-user"></i>
          </Link>

          
        <i
            className="fa-solid fa-cart-arrow-down"
            style={{ cursor: "pointer" }}
            onClick={() => setShowCart(true)}
          ></i>
        </div>
      </header>
    </>
  );
}

export default Header;