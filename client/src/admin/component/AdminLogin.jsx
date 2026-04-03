import { useNavigate } from "react-router-dom";
import { useState } from "react";


function AdminLogin() {
  const ADMIN_EMAIL="admin@example.com";
  const ADMIN_PASS = "Dhvani12@";
  const [email,setEmail] = useState('');
  const [password,setpassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();
 

  try {

    if(email === ADMIN_EMAIL && password ===  ADMIN_PASS ){
    navigate("/admin/admindashboard");
    }
    
  } catch (err) {
    console.log(err.response?.data);
  }
};

  

  return (
    <>
      <form onSubmit={handleSubmit}>
       <div class="adminlogin">
        <div className="container1">
         

          <h2>Login</h2>
          
<div className="card0">
          <div>
            
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter email example@gmail.com"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
           
          </div>

        
        
          < input type="password" id="password" name="password"   placeholder="enter password"    onChange={(e)=>setpassword(e.target.value)}/>

          <br /><br />

          
           
  <button type="submit" className="button">
    Submit
  </button>


       </div>  
        </div></div>
       
      </form>
    </>
  );
}

export default AdminLogin;