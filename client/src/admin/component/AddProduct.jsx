import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    section: "",
    quantity: "",
    price: "",
    description: "",
    image: null
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({
        ...product,
        image: e.target.files[0]
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let key in product) {
      formData.append(key, product[key]);
    }

    try {
      await axios.post(
        "https://github.com/Sahana606/minimalist-ecommerce-clone.git/admin/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Product Added Successfully");

     
      setProduct({
        name: "",
        category: "",
        section: "",
        quantity: "",
        price: "",
        description: "",
        image: null
      });

      navigate("/admin/manage-products");

    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-card">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} className="product-form">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          value={product.name}
        />

        <select name="category" onChange={handleChange} value={product.category}>
          <option value="">Select Category</option>
          <option value="Skin & Body Care">Skin & Body Care</option>
          <option value="Hair Care">Hair Care</option>
          <option value="Baby Care">Baby Care</option>
          <option value="Lip Care">Lip Care</option>
        </select>

        <select name="section" onChange={handleChange} value={product.section}>
          <option value="">Select Section</option>
          <option value="newlaunch">New Launch</option>
          <option value="bestseller">Best Seller</option>
          <option value="shop">Shop Page</option>
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
          value={product.quantity}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={product.price}
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>

      </form>
    </div>
  );
}

export default AddProduct;
