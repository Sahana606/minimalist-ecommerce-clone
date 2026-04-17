import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageUsers() {

  const [users,setUsers] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
   
    const getUsers = async () => {
      try {
        const res = await axios.get("https://minimalist-ecommerce-clone.onrender.com/admin/manage-users");
        setUsers(res.data); 
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    getUsers(); 
  }, []);

  const handleDelete = async (id) => {
  try {
    await axios.delete(`https://minimalist-ecommerce-clone.onrender.com/delete-user/${id}`);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};

  return (

    <div className="manage-product-card">

      <h2 className="manage-card-title">Manage Users</h2>

      <div className="manage-table-container">

        <table className="table table-bordered product-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>OTP</th>
              <th>OTP Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((u)=>(
              <tr key={u._id}>

                <td>{u._id}</td>
                <td>{u.email}</td>
                <td>{u.otp}</td>
                <td>{new Date(u.otpExpires).toLocaleString()}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={()=>navigate(`/admin/edit-user/${u._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>handleDelete(u._id)}
                  >
                    Delete
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

export default ManageUsers;