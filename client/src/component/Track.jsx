import Header from "./Header";
import Footer from "./Footer";
import "../style.css";

function Track() {
  return (
    <>
      <Header />

       <div id="shopby"><h1>Collections</h1></div>

      <div className="c1">
        <div className="card2">
          <img src="/images/shop1.avif" width="300" height="400" />
          <h2><b>Skin Care</b></h2>
        </div>

        <div className="card2">
          <img src="/images/shop2.avif" width="300" height="400" />
          <h2><b>Hair Care</b></h2>
        </div>

        <div className="card2">
          <img src="/images/shop3.avif" width="300" height="400" />
          <h2><b>Body Care</b></h2>
        </div>

        <div className="card2">
          <img src="/images/shop4.avif" width="300" height="400" />
          <h2><b>Lip Care</b></h2>
        </div>
      </div>

      <div className="c1">
        <div className="card2">
          <img src="/images/shop5.avif" width="300" height="400" />
          <h2><b>Best sellers</b></h2>
        </div>

        <div className="card2">
          <img src="/images/shop6.avif" width="300" height="400" />
          <h2><b>New launches</b></h2>
        </div>

        <div className="card2">
          <img src="/images/shop7.avif" width="300" height="400" />
          <h2><b>All products</b></h2>
        </div>

      </div>

     

      <Footer />
    </>
  );
}

export default Track;
