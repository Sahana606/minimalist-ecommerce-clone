import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {

  const { id } = useParams();
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


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/products/${id}`
        );

        setProduct({
          name: res.data.name || "",
          category: res.data.category || "",
          section: res.data.section || "",
          quantity: res.data.quantity || "",
          price: res.data.price || "",
          description: res.data.description || "",
          image: null
        });

      } catch (err) {
        console.log("GET ERROR:", err);
      }
    };

    if (id) getProduct();

  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({ ...product, image: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let key in product) {
      if (product[key] !== null) {
        formData.append(key, product[key]);
      }
    }

    try {
      await axios.put(
        `http://localhost:3001/admin/update-product/${id}`,
        formData
      );

      alert("Product Updated Successfully");
      navigate("/admin/manage-products");

    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  return (
    <div className="add-card">
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate} className="product-form">

        <input name="name" value={product.name} onChange={handleChange} placeholder="Name" />

        <select name="category" value={product.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Skin & Body Care">Skin & Body Care</option>
          <option value="Hair Care">Hair Care</option>
          <option value="Baby Care">Baby Care</option>
          <option value="Lip Care">Lip Care</option>
        </select>

        <select name="section" value={product.section} onChange={handleChange}>
          <option value="">Select Section</option>
          <option value="newlaunch">New Launch</option>
          <option value="bestseller">Best Seller</option>
          <option value="shop">Shop Page</option>
        </select>

        <input name="description" value={product.description} onChange={handleChange} placeholder="Description" />

        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" />

        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" />

        <input type="file" name="image" onChange={handleChange} />

        <button type="submit">Update Product</button>

      </form>
    </div>
  );
}

export default EditProduct;