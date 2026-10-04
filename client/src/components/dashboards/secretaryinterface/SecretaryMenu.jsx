import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SecretaryMenu() {
  return (
    <nav className="secretary-menu">
      <ul>
        <li>
          <NavLink
            to="/dashboards/secretaryinterface/SecretaryDashboard"
            end
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <i className="fas fa-home"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/patients"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <i className="fas fa-user-injured"></i> Patients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ListRdv"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <i className="fas fa-calendar-alt"></i> Appointments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Booking"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <i className="fas fa-calendar-plus"></i> New Appointment
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SecretaryMenu;
