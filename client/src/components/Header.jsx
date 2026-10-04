import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Style/Header.css";

function Header() {
  const { isAuthenticated, role, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardPath =
    role === "Doctor"
      ? "/dashboards/doctorinterface/DoctorDashboard"
      : "/dashboards/secretaryinterface/SecretaryDashboard";

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);
  const displayName = user?.name?.trim() || role || "User";

  return (
    <header className={`site-header ${isAuthenticated ? "is-auth" : ""}`}>
      <div className="site-header__inner">
        <Link
          to={isAuthenticated ? dashboardPath : "/"}
          className="site-brand"
          onClick={closeMenu}
        >
          <span className="site-brand__mark" aria-hidden="true">
            M
          </span>
          <span className="site-brand__name">Medical Office</span>
        </Link>

        {!isAuthenticated && (
          <button
            type="button"
            className={`site-nav-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        )}

        {!isAuthenticated && (
          <nav className={`site-nav ${menuOpen ? "is-open" : ""}`}>
            <ul className="site-nav__links">
              <li>
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About" onClick={closeMenu}>
                  About
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div
          className={`site-nav__actions ${
            !isAuthenticated && menuOpen ? "is-open" : ""
          }`}
        >
          {isAuthenticated ? (
            <>
              <div className="site-nav__user-block">
                <span className="site-nav__user-label">Logged in</span>
                <strong className="site-nav__user">{displayName}</strong>
              </div>
              <button
                type="button"
                className="site-btn site-btn--ghost"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/Login"
                className="site-btn site-btn--ghost"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/Register"
                className="site-btn site-btn--primary"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
