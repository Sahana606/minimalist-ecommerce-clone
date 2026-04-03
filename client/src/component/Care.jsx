import Header from "./Header";
import Footer from "./Footer";
import "../style.css";

function Care() {
  return (
    <>
      <Header />

       <div id="shopby"><h1>Baby Care</h1>
       <p>A curated range of pediatrician-approved baby care products formulated with the most sensitive skin in mind. Our hypoallergenic and dermatologically-tested line gently cleanses, soothes, protects, and nourishes your little ones</p></div>

      

      <div className="c">
        <div className="card">
          <img src="/images/baby1.avif" width="300" height="400" />
          <h4><b>Salicylic Acid + LHA 2% Cleanser</b></h4>
          <p>Acne,Breakouts & Oiliness</p>
          <h3>On Sale from ₹250</h3>
          <button id="bt">Add to Cart</button>
        </div>

        <div className="card">
          <img src="/images/baby2.avif" width="300" height="400" />
          <h4><b>SPF 50 Sunscreen</b></h4>
          <p>Sun protection,UV exposure/damage</p>
          <h3>On Sale from ₹370</h3>
          <button id="bt">Select Size</button>
        </div>

        <div className="card">
          <img src="/images/baby3.avif" width="300" height="400" />
          <h4><b>Salicylic Acid 2% Face Serum</b></h4>
          <p>Acne,Oilyskin,Blackheads & Irritation</p>
          <h3>On Sale from ₹200</h3>
          <button id="bt">Select Size</button>
        </div>
      </div>

     

      <Footer />
    </>
  );
}

export default Care;
