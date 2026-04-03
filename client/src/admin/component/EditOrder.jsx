import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const getOrder = async () => {
      try {
        console.log("Fetching Order ID:", id);
        const res = await axios.get(`http://localhost:3001/user-orders/${id}`);
        setOrder(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error("GET ERROR:", err.response?.data || err.message);
      }
    };

    if (id) getOrder();
  }, [id]);

  const updateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/admin/update-order/${id}`, {
        status
      });
      alert("Order updated successfully");
      navigate("/admin/manage-order");
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-container">
      <h2>Edit Order</h2>

      <table className="order-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Products</th>
             <th>Products</th>
            
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.user_id}</td>
            <td>{order.email}</td>
            <td>₹{order.totalPrice}</td>
            <td>{new Date(order.datetime).toLocaleString()}</td>
            <td>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", marginBottom: "5px" }}>
                    <td><img
                      src={`http://localhost:3001/uploads/${item.image}`}
                      
                      width="50"
                      style={{ marginRight: "5px" }}
                    /></td>
                    <div>
                      <strong>{item.productName}</strong>
                      <p style={{ margin: 0 }}>
                        Qty: {item.quantity} | ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                "-"
              )}
            </td>
            <td>{order.status}</td>
          </tr>
        </tbody>
      </table>

      <form onSubmit={updateOrder} style={{ marginTop: "20px" }}>
        <label>Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Processed">Processed</option>
          <option value="Delivered">Delivered</option>
        </select>

        <button type="submit" style={{ marginLeft: "10px" }}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditOrder;