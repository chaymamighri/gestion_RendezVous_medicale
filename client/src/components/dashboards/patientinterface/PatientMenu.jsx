import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css"; 

function PatientMenu() {
  return (
    <div className="patient-menu">
      <ul>
        <li>
          <Link to="/PatientProfile">
            <i className="fas fa-user"></i> Patient Profile
          </Link>
        </li>
        <li>
          <Link to="/PatientAppointments">
            <i className="fas fa-calendar-alt"></i> Appointment List
          </Link>
        </li>
        <li>
          <Link to="/Booking">
            <i className="fas fa-calendar-check"></i> Book an Appointment
          </Link>
        </li>
        <li>
          <Link to="#">
            <i className="fas fa-stethoscope"></i> Doctor Availability
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default PatientMenu;
