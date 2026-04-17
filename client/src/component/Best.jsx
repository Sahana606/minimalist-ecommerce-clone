import Header from "./Header";
import Footer from "./Footer";
import "../style.css";

function Best() {
  return (
    <>
      <Header />

       <div><h1>Best Sellers</h1></div>
       <div>

         <div className="c">
        <div className="card">
          <img src="/images/best1.avif" width="300" height="400" />
          <h4><b>Salicylic Acid + LHA 2% Cleanser</b></h4>
          <p>Acne,Breakouts & Oiliness</p>
          <h3>On Sale from ₹250</h3>
          <button id="bt">Add to Cart</button>
        </div>

        <div className="card">
          <img src="/images/best2.avif" width="300" height="400" />
          <h4><b>SPF 50 Sunscreen</b></h4>
          <p>Sun protection,UV exposure/damage</p>
          <h3>On Sale from ₹370</h3>
          <button id="bt">Select Size</button>
        </div>

        <div className="card">
          <img src="/images/best3.avif" width="300" height="400" />
          <h4><b>Salicylic Acid 2% Face Serum</b></h4>
          <p>Acne,Oilyskin,Blackheads & Irritation</p>
          <h3>On Sale from ₹200</h3>
          <button id="bt">Select Size</button>
        </div>
      </div>

       <div className="c">
        <div className="card">
          <img src="/images/best4.avif" width="300" height="400" />
          <h4><b>Salicylic Acid + LHA 2% Cleanser</b></h4>
          <p>Acne,Breakouts & Oiliness</p>
          <h3>On Sale from ₹250</h3>
          <button id="bt">Add to Cart</button>
        </div>

        <div className="card">
          <img src="/images/best5.avif" width="300" height="400" />
          <h4><b>SPF 50 Sunscreen</b></h4>
          <p>Sun protection,UV exposure/damage</p>
          <h3>On Sale from ₹370</h3>
          <button id="bt">Select Size</button>
        </div>

        <div className="card">
          <img src="/images/best6.avif" width="300" height="400" />
          <h4><b>Salicylic Acid 2% Face Serum</b></h4>
          <p>Acne,Oilyskin,Blackheads & Irritation</p>
          <h3>On Sale from ₹200</h3>
          <button id="bt">Select Size</button>
        </div>
      </div>



      </div>

      

     

      <Footer />
    </>
  );
}

export default Best;
