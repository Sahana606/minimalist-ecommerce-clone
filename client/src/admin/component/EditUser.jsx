import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://minimalist-ecommerce-clone.onrender.com/admin/manage-users");
        const user = res.data.find(u => u._id === id);
        if (user) setEmail(user.email);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://minimalist-ecommerce-clone.onrender.com/update-user/${id}`, { email });
      alert("User updated successfully");
      navigate("/admin/manage-users");
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-card-useredit">
      <h2 className="user-edit-card-title">Edit User</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="edit-btn-user">Update</button>
        
      </form>
    </div>
  );
}

export default EditUser;