import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function OurBestSeller({ addToCart }) {

  function ProductPrevArrow({ onClick }) {
    return (
      <div
        className="productarrow productprev"
        onClick={onClick}
      />
    );
  }

  function ProductNextArrow({ onClick }) {
    return (
      <div
        className="productarrow productnext"
        onClick={onClick}
      />
    );
  }

  const productImageSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <ProductPrevArrow />,
    nextArrow: <ProductNextArrow />,
  };

  const bestSeller = [
    {
      id: 1,
      images: [
        "/images/3.avif",
        "/images/s5.avif",
        "/images/s2.avif",
        "/images/s3.avif",
        "/images/s4.avif",
      ],
      name: "Salicylic Acid + LHA 2% Cleanser",
      desc: "Acne, Breakouts & Oiliness",
      price: 250,
      btn: "Add to Cart",
    },
    {
      id: 2,
      images: [
        "/images/spf.avif",
        "/images/s8.avif",
        "/images/s6.avif",
        "/images/s7.avif",
      ],
      name: "SPF 50 Sunscreen",
      desc: "Sun protection, UV exposure/damage",
      price: 370,
      btn: "Add to Cart",
    },
    {
      id: 3,
      images: [
        "/images/Salicylic.avif",
        "/images/Salicylic-2.avif",
        "/images/Salicylic-3.avif",
        "/images/Salicylic-4.avif",
      ],
      name: "Salicylic Acid 2% Face Serum",
      desc: "Acne, Oily skin, Blackheads",
      price: 200,
      btn: "Add to Cart",
    },
    {
      id: 4,
      images: [
        "/images/Vitamin.avif",
        "/images/Vitamin-2.avif",
        "/images/Vitamin-3.avif",
        "/images/Vitamin-4.avif",
      ],
      name: "Vitamin C 10% Face Serum",
      desc: "Dullness, Spots & Elasticity",
      price: 250,
      btn: "Add to Cart",
    },
  ];

  return (
    <>
      <div id="shopby">
        <h1>Our Best Seller</h1>
      </div>

      <div className="productscontainer">

        {bestSeller.map((item) => (

          <div className="productcard" key={item.id}>

            <div className="productimagewrapper">

              <Slider {...productImageSettings}>

                {item.images.map((img, index) => (

                  <div key={index}>
                    <img
                      src={img}
                      alt={item.name}
                      className="productimg"
                    />
                  </div>

                ))}

              </Slider>

            </div>

            <h4 className="product-name">
              <b>{item.name}</b>
            </h4>

            <p className="product-desc">
              {item.desc}
            </p>

            <h3>
              On Sale from {item.price}
            </h3>
         <button
  className="button"
  onClick={() => addToCart(item)}
>
  Add to Cart
</button>


          </div>

        ))}

      </div>
    </>
  );
}

export default OurBestSeller;

