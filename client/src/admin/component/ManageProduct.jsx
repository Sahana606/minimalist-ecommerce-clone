import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ManageProduct() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "https://github.com/Sahana606/minimalist-ecommerce-clone.git/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://github.com/Sahana606/minimalist-ecommerce-clone.git/delete-product/${id}`
      );
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="manage-product-card">

      <h2 className="manage-card-title">Manage Products</h2>

      <div className="table-scroll">
        <table className="product-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Section</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.section}</td>
                  <td>{p.description}</td>
                  <td>{p.quantity}</td>
                  <td>{p.price}</td>

                  <td>
                    <img
                      src={`https://github.com/Sahana606/minimalist-ecommerce-clone.git/uploads/${p.image}`}
                      alt={p.name}
                      width="60"
                    />
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/update-product/${p._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No products found</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ManageProduct;
