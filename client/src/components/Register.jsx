import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { getErrorMessage } from "../utils/format";
import "../Style/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!role) {
      setError("Please select a role (Secretary or Doctor).");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/register", { name, email, password, role });
      setSuccess("Account created. You can sign in now.");
      setTimeout(() => navigate("/Login"), 800);
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mo-auth">
      <h1 className="mo-auth__title">Create staff account</h1>
      <div className="mo-card">
        <h2>Sign up</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="mo-alert--success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="mo-label">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="mo-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="mo-label">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="mo-label">Confirm password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="form-control"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <div className="mo-role-row">
            <button
              type="button"
              className={`mo-role-btn ${role === "Secretary" ? "is-active" : ""}`}
              onClick={() => setRole("Secretary")}
            >
              Secretary
            </button>
            <button
              type="button"
              className={`mo-role-btn ${role === "Doctor" ? "is-active" : ""}`}
              onClick={() => setRole("Doctor")}
            >
              Doctor
            </button>
          </div>

          {role && (
            <p className="small text-muted mb-3">
              Selected role: <strong>{role}</strong>
            </p>
          )}

          <button
            type="submit"
            className="btn mo-btn mo-btn--primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <div className="text-center">
            <p className="mb-1 text-muted">Already have an account?</p>
            <Link to="/Login" className="mo-link">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
