import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Doctor.css";

function DoctorLayout() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.name?.trim() || "Doctor";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="doctor-layout">
      <aside className="doctor-sidebar">
        <div className="sidebar__top">
          <h1>Doctor</h1>
          <ul className="doctor-menu">
            <li>
              <NavLink
                to="/dashboards/doctorinterface/DoctorDashboard"
                end
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Today&apos;s Schedule
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctor/appointments"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                All Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctor/patients"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Patient Lookup
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar-user-card">
            <span className="sidebar-user-card__label">Logged in as</span>
            <strong className="sidebar-user-card__name">{displayName}</strong>
            <span className="sidebar-user-card__role">{role || "Doctor"}</span>
          </div>
          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="doctor-main">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorLayout;
