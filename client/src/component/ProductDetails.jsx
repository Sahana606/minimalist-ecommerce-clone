import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `https://minimalist-ecommerce-clone.onrender.com/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="product-page">

     
      <div className="product-left">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      
      <div className="product-right">
        <h1>{product.name}</h1>

        <p className="desc">{product.description}</p>

    
        <div className="price-box">
          <span className="mrp">₹399</span>
          <span className="price">₹{product.price}</span>
          <span className="offer">5% OFF</span>
        </div>

       
        <button
          className="add-btn"
          onClick={() =>
            addToCart({
              id: product._id,
              name: product.name,
              price: product.price,
              desc: product.description,
              images: [
                `https://minimalist-ecommerce-clone.onrender.com/uploads/${product.image}`
              ],
              qty: 1
            })
          }
        >
          ADD TO CART
        </button>

      </div>
    </div>
  );
}

export default ProductDetails;
