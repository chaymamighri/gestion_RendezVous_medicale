import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Style/Footer.css";

function Footer() {
  const { isAuthenticated } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">Medical Office</p>
          <p className="site-footer__tagline">
            Internal practice management for secretaries and doctors.
          </p>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Quick links</h3>
          <ul className="site-footer__list">
            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/About">About</Link>
                </li>
                <li>
                  <Link to="/Login">Staff login</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {year} Medical Office. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
