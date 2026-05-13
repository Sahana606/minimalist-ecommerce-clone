import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function OurBestSeller({ addToCart }) {
  const [addproducts, setproducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`
        );

        setproducts(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

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

  return (
    <>
      <div id="shopby">
        <h1>Our Best Seller</h1>
      </div>

      <div className="productscontainer">
        {Array.isArray(addproducts) &&
          addproducts
            .filter(
              (product) =>
                product.section === "bestseller"
            )
            .map((product) => (
              <div
                className="productcard"
                key={product._id}
                onClick={() =>
                  navigate(`/product/${product._id}`)
                }
              >
                <div className="productimagewrapper">
                  <Slider {...productImageSettings}>
                    {(product.images || [
                      product.image,
                    ]).map((img, index) => (
                      <div key={index}>
                        <img
                          src={img}
                          alt={product.name}
                          className="productimg"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                <h4 className="product-name">
                  <b>{product.name}</b>
                </h4>

                <p className="product-desc">
                  {product.description}
                </p>

                <h3>
                  On Sale from ₹{product.price}
                </h3>

                <button
                  className="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    addToCart({
                      ...product,
                      images:
                        product.images || [
                          product.image,
                        ],
                    });
                  }}
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
