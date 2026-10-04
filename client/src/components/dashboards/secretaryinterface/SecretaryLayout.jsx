import { Outlet, useNavigate } from "react-router-dom";
import SecretaryMenu from "./SecretaryMenu";
import { useAuth } from "../../../context/AuthContext";
import "./secretary.css";

function SecretaryLayout() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.name?.trim() || "Secretary";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="secretary-interface">
      <aside className="sidebar">
        <div className="sidebar__top">
          <h1>Secretary</h1>
          <SecretaryMenu />
        </div>

        <div className="sidebar__footer">
          <div className="sidebar-user-card">
            <span className="sidebar-user-card__label">Logged in as</span>
            <strong className="sidebar-user-card__name">{displayName}</strong>
            <span className="sidebar-user-card__role">{role}</span>
          </div>
          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
            Logout
          </button>
        </div>
      </aside>

      <div className="home-content">
        <Outlet />
      </div>
    </div>
  );
}

export default SecretaryLayout;
