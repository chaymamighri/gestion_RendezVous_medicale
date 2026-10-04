import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/format";
import "../Style/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", { email, password });
      const { role, token, user } = res.data;

      if (!token) {
        setError("Login failed. No token received.");
        return;
      }

      login({ token, role, user });

      if (role === "Secretary") {
        navigate("/dashboards/secretaryinterface/SecretaryDashboard");
      } else if (role === "Doctor") {
        navigate("/dashboards/doctorinterface/DoctorDashboard");
      } else {
        setError("Unknown user role.");
      }
    } catch (err) {
      if (err?.code === "ERR_NETWORK" || !err?.response) {
        setError("Server unreachable. Please start the backend and try again.");
      } else {
        setError(getErrorMessage(err, "Login failed. Please try again."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mo-auth">
      <h1 className="mo-auth__title">Welcome back</h1>
      <div className="mo-card">
        <h2>Staff sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="mo-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="mo-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="btn mo-btn mo-btn--primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="text-center">
            <p className="mb-1 text-muted">New staff member?</p>
            <Link to="/Register" className="mo-link">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
