import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NewLaunch from "./NewLaunch";
import OurBestSeller from "./OurBestSeller";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style.css";
import CartSidebar from "./CartSidebar"; 

function Home() {

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(item => item.id === product.id);

    if (existingItem) {
      
      return prevCart.map(item =>
        item.id === product.id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      );
    } else {
     
      return [...prevCart, { ...product, qty: 1 }];
    }
  });

  setShowCart(true); 
};

  const images = [
    { id: 1, src: "/images/top2.avif" },
    { id: 2, src: "/images/2.avif" },
    { id: 3, src: "/images/top3.avif" },
    { id: 4, src: "/images/top4.avif" },
  ];

  function PrevArrow({ onClick }) {
    return (
      <div className="heroarrow prevarrow" onClick={onClick}>
        ❮
      </div>
    );
  }

  function NextArrow({ onClick }) {
    return (
      <div className="heroarrow nextarrow" onClick={onClick}>
        ❯
      </div>
    );
  }

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <Header showCart={showCart} setShowCart={setShowCart} />

      <div className="carousel-container">
        <Slider {...settings}>
          {images.map((item) => (
            <div key={item.id}>
              <img
                src={item.src}
                alt="slide"
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      <OurBestSeller addToCart={addToCart} />

      <Link to="/Best">
        <button id="t">View All Product</button>
      </Link>

      <img src="/images/2500x1080.avif" width="100%" alt="" />
      <img src="/images/Try_Now_1.avif" width="100%" alt="" />

      <div id="shopby">
        <h1>Shop By Category</h1>
      </div>

      <div className="c1">
        <div className="card2">
          <img src="/images/skincare.avif" width="280" height="210" alt="" />
          <h2><b>Skin Care</b></h2>
        </div>

        <div className="card2">
          <img src="/images/haircare.avif" width="280" height="210" alt="" />
          <h2><b>Hair Care</b></h2>
        </div>

        <div className="card2">
          <img src="/images/body care.avif" width="280" height="210" alt="" />
          <h2><b>Body Care</b></h2>
        </div>

        <div className="card2">
          <img src="/images/lipcare.avif" width="280" height="210" alt="" />
          <h2><b>Lip Care</b></h2>
        </div>
      </div>

      <NewLaunch addToCart={addToCart} />

      <Link to="/shop">
        <button id="t">View All Product</button>
      </Link>

      <div className="future">
        <h1>The Future Of Personal Care is Here</h1>
        <p>
          Embrace Minimalist, where each element is chosen for its scientific merit,
          offering you authentic, effective skincare solutions
        </p>
      </div>

      <Footer />

      <CartSidebar
        cart={cart}
        setCart={setCart}
        showCart={showCart}
        setShowCart={setShowCart}
      />
    </>
  );
}

export default Home;