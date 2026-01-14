import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/Login.css";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required!");
      return;
    }

    try {
      const res = await axios.post("/api/login", { email, password });

      const { role, token } = res.data;
      if (token) localStorage.setItem("token", token);
     
     

      if (role === "Secretary") navigate("/dashboards/secretaryinterface/SecretaryDashboard");
      else if (role === "Doctor") navigate("/dashboards/doctorinterface/DoctorDashboard");
    } catch (error) {
      if (error?.code === "ERR_NETWORK" || !error?.response) {
        setError("Server unreachable. Please start the backend and try again.");
      } else if (error?.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
      console.error(error);
      
    }
  };

  return (

  <div className="container d-flex flex-column align-items-center vh-100">
  <h1 className="title-h1"> Welcome Back </h1>
  <div className="card p-5 shadow" style={{ maxWidth: "500px", width: "100%" }}>

        <h2 className="text-center mb-4">Sign In here</h2>
        
        <form onSubmit={handleSubmit}>
       
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>} 

          <div className="d-grid mb-3">
            <button type="submit" className="btn login-btn">
              Login
            </button>
          </div>

          <div className="text-center">
            <p className="mb-0">New Here?</p>
            <Link to="/Register" className="text-decoration-none">
              Create an Account
            </Link>
          </div>
        </form>
    
    </div>
    </div>
  );
}
export default Login;
