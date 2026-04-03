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
            "https://github.com/Sahana606/minimalist-ecommerce-clone.git/admin/products"
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
          <img src={`https://github.com/Sahana606/minimalist-ecommerce-clone.git/uploads/${product.image}`} width="300" height="400" />
          <h2><b>{product.name}</b></h2>
           
        </div>
        ))}
        

      </div>

     

      <Footer />
    </>
  );
}

export default Shop;
