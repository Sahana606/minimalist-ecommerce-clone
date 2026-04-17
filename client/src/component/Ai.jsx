import Header from "./Header";
import Footer from "./Footer";
import "../style.css";

function Ai() {
  return (
    <>
      <Header />

       

      <h1>SkinInsights</h1>
      <div className="img">
        <img src="/images/aiassistant.avif" width="500" />
        
        
          <h4><b>Salicylic Acid + LHA 2% Cleanser</b></h4>
          <p>Acne,Breakouts & Oiliness</p>
          <h3>On Sale from ₹250</h3>
          <button id="bt">Add to Cart</button>
        </div>
      
      

     

      <Footer />
    </>
  );
}

export default Ai;
