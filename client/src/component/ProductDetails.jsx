import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <img
        src={`https://minimalist-ecommerce-clone.onrender.com/uploads/${product.image}`}
        width="400"
        alt=""
      />

      <h1>{product.name}</h1>
      <h2>{"₹" + product.price}</h2>
      <p>{product.description}</p>

      <button
        onClick={() =>
          addToCart({
            ...product,
            images: [product.image]
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;