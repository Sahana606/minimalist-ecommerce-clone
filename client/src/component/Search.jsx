import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Search() {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://minimalist-ecommerce-clone.onrender.com/products"
        );

        const filtered = res.data.filter((p) =>
          p.name?.toLowerCase().includes(keyword.toLowerCase())
        );

        setProducts(filtered);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="search-page">
      <h2>Search Results for "{keyword}"</h2>

      <div className="products-grid">
        {products.map((item) => (
          <div key={item._id} className="product-card">

            <img
              src={`https://minimalist-ecommerce-clone.onrender.com/uploads/${item.image}`}
              alt=""
            />

            <h4>{item.name}</h4>
            <p>₹{item.price}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;