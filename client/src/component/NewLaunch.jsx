import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewLaunch({ addToCart }) {

  const [addproducts, setproducts] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      try {

        const res = await axios.get("https://minimalist-ecommerce-clone.onrender.com/products");
setproducts(res.data);

        setproducts(data);

      } catch (err) {
        console.log(err);
      }
    };

    getProducts();

  }, []);

  return (
    <>
      <div id="shopby">
        <h1>New Launches</h1>
      </div>

      <div className="c1">
        {addproducts && addproducts?.data
          .filter((product) => product.section === "newlaunch")
          .map((product) => (
         <div
  className="card2"
  key={product._id}
  onClick={() => {
    console.log("clicked"); 
    navigate(`/product/${product._id}`);
  }}
>

              <img
                src={product.image}
                width="300"
                height="400"
                alt=""
              />

              <h2><b>{product.name}</b></h2>
              <h4>{"₹" + product.price}</h4>
               <h4>{product.description}</h4>
              

               <button
  className="button"
  onClick={() =>
    addToCart({
      ...product,
      images: [product.image] // wrap the single image in an array
    })
  }
>
                Add to Cart
              </button>

            </div>
          ))}
      </div>
    </>
  );
}

export default NewLaunch;
