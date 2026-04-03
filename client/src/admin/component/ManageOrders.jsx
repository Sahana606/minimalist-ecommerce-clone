import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("https://github.com/Sahana606/minimalist-ecommerce-clone.git/admin/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    getOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://github.com/Sahana606/minimalist-ecommerce-clone.git/delete-order/${orderId}`);
      setOrders(prev => prev.filter(o => o._id !== orderId));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <div className="manage-product-card">
      <h2 className="manage-card-title">Manage Orders</h2>

      <div className="manage-table-container">
        <table className="table table-bordered product-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Total Orders</th>
              <th>Total Amount</th>
               <th>Date and time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.user_id}</td>
                <td>{o.email}</td>
                <td>{o.items ? o.items.length : 0}</td>
                <td>₹{o.totalPrice}</td>
                
                 
                <td>
                  {o.datetime
                    ? new Date(o.datetime).toLocaleString()
                    : "-"}
                </td>
                

                <td>
                  
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/user-orders/${o._id}`)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteOrder(o._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ManageOrder;
