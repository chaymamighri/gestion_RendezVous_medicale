import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css"; 

function SecretaryMenu() {
  return (
    <div className="secretary-menu">
    <ul>
      <li>
        <Link to="../ListRdv">
          <i className="fas fa-calendar-alt"></i> Manage Appointments
        </Link>
      </li>
      <li>
        <Link to="/Booking">
          <i className="fas fa-calendar-check"></i> Add Appointment
        </Link>
      </li>
      {/*<li>
        <Link to="/patients">
          <i className="fas fa-user-cog"></i> Manage Availability
        </Link>
      </li>*/}
      <li>
        <Link to="/Messages">
          <i className="fas fa-envelope"></i> Show Messages
        </Link>
      </li>
    </ul>
  </div>
  );
}

export default SecretaryMenu;
