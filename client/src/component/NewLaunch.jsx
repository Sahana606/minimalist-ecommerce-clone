import { useEffect, useState } from "react";
import axios from "axios";

function NewLaunch({ addToCart }) {

  const [addproducts, setproducts] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {

        const data = await axios.get(
          "http://localhost:3001/products"
        );

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
            <div className="card2" key={product._id}>

              <img
                src={`http://localhost:3001/uploads/${product.image}`}
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