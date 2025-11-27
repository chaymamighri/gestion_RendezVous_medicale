import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/Register.css";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [role, setRole] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();
 


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match!"); 
      return;
    }
    setError("");

    axios.post("http://localhost:3001/register", {name, email, password, role })
      .then((result) => { console.log(result);
        navigate("/Login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
   <div className="container d-flex flex-column align-items-center vh-100">
  <h1 className="title-h1"> Create Your Administration Account </h1>
  <div className="card p-3 shadow" style={{ maxWidth: "500px", width: "100%" }}>
       
          <h2 className="text-center mb-4">Sign Up</h2>
         
          {error && <div className="text-danger mb-3">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                <strong>Name:</strong>
              </label>
              <input
                type="text"
                placeholder="Enter you Name"
                name="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                placeholder="Enter you email"
                name="email"
                className="form-control"
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
                placeholder="password"
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                <strong>Confirm Password:</strong>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="Confirm Password"
                className="form-control"
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <div className="d-flex gap-4 mb-3">
              <button
                type="button"
                className="btn secrétaire-btn"
                onClick={() => setRole("Secretary")}
              >
                Secretary
              </button>
             
              <button
                type="button"
                className="btn doctor-btn"
                onClick={() => setRole("Doctor")}
              >
                Doctor
              </button>
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>

            <div className="text-center">
              <p className="mb-0">Already have an Account?</p>
              <Link to="/Login" className="text-decoration-none">
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
