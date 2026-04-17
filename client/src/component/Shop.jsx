import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import "../style.css";

function Shop() {

  const [addproducts,setproducts] = useState("");

   useEffect(() => {
      const getProducts = async () => {
        try {
  
          const data = await axios.get(
            "https://minimalist-ecommerce-clone.onrender.com/admin/products"
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
      <Header />
       <div id="shopby"><h1>Collections</h1></div>

      <div className="c1">
        {addproducts && addproducts?.data.map((product) => (
          <div className="card2">
          <img src={`minimalist-ecommerce-clone.onrender.com/uploads/${product.image}`} width="300" height="400" />
          <h2><b>{product.name}</b></h2>
           
        </div>
        ))}
        

      </div>

     

      <Footer />
    </>
  );
}

export default Shop;
