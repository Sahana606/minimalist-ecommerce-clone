import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Header({ setShowCart }) {
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();
 const email = localStorage.getItem("email");
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(
          "https://minimalist-ecommerce-clone.onrender.com/products"
        );

      const filtered = res.data.filter((p) =>
  p.name?.toLowerCase().includes(keyword.toLowerCase())
);

        setResults(filtered.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <>
      <div className="top">enjoy free shipping on every order</div>

      <header className="header">
        <div className="logo">
          <img src="/images/Minimalist.webp" width="180" alt="logo" />
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

         
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => setShowSearch(true)}
            style={{ cursor: "pointer" }}
          ></i>

         

<Link to={email ? "/profile" : "/login"}>
  <i className="fa-regular fa-user"></i>
</Link>

          <i
            className="fa-solid fa-cart-arrow-down"
            onClick={() => setShowCart(true)}
          ></i>
        </div>
      </header>

      
      {showSearch && (
        <div className="search-overlay">
          <div className="search-panel">

         
            <div className="search-top">
              <input
                type="text"
                placeholder="Search for products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                autoFocus
              />
              <button onClick={() => setShowSearch(false)}>✕</button>
            </div>

            <div className="search-content">

              
              <div className="search-left">
                <h4>Search Suggestions</h4>
                <p>Summer Collection</p>
                <p>Hydrated Skin</p>
                <p>Hair Care</p>
              </div>

              
              <div className="search-right">
                {results.map((item) => (
                  <div
                    key={item._id}
                    className="search-card"
                    onClick={() => {
                      navigate(`/product/${item._id}`);
                      setShowSearch(false);
                    }}
                  >
                   <img src={`https://minimalist-ecommerce-clone.onrender.com/uploads/${item.image}`} />
<p>{item.name}</p>
<p>₹{item.price}</p>
                  </div>
                ))}
              </div>

            </div>

          
            {keyword && (
              <div
                className="view-all"
                onClick={() => {
                  navigate(`/search/${keyword}`);
                  setShowSearch(false);
                }}
              >
                View All
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
