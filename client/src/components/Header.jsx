import { Link } from "react-router-dom";
import logo from "../images/logo1.png";
import "../Style/Header.css";

function Header() {
  return (
    <>
      <nav className="navbar">
        <div>
          <img src={logo} alt="logo du cabinet" className="logo_cabinet"></img>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About Us</Link>
            </li>
            <li>
              <Link to="/Contact">Contact Us</Link>
            </li>
            <li>
              <button className="log_button">
                <Link to="/Login">Login</Link>
              </button>
            </li>
            <li>
              <button className="booking_button">
                <Link to="/Register">S'inscrire</Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
