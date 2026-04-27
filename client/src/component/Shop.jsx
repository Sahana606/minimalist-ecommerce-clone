import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import "../style.css";

function Shop() {
  const [addproducts, setproducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://minimalist-ecommerce-clone.onrender.com/products"
        );

        setproducts(res.data); 
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <Header />
      <div id="shopby"><h1>Collections</h1></div>

      <div className="c1">
        {addproducts.map((product) => (
          <div
            key={product._id}
            className="card2"
            onClick={() => navigate(`/product/${product._id}`)} 
            style={{ cursor: "pointer" }}
          >
            <img
              src={`https://minimalist-ecommerce-clone.onrender.com/uploads/${product.image}`}
              width="300"
              height="400"
            />
            <h2><b>{product.name}</b></h2>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Shop;
