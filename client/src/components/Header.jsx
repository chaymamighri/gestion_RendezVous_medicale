import { Link } from "react-router-dom";
import logo2 from "../images/logo2.jpg";
import "../Style/Header.css";

function Header() {
  return (
    <>
      <nav className="navbar">
        <div>
          <img src={logo2} alt="logo du cabinet" className="logo_cabinet"></img>
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
                <Link to="/Booking">Book An Appointment</Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
