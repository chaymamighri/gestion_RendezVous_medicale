import { Link } from "react-router-dom";
import photoAccueil from "../images/photoAcceuil.jpg";
import { useAuth } from "../context/AuthContext";
import "../Style/Home.css";

function Home() {
  const { isAuthenticated, role } = useAuth();

  const dashboardPath =
    role === "Doctor"
      ? "/dashboards/doctorinterface/DoctorDashboard"
      : "/dashboards/secretaryinterface/SecretaryDashboard";

  return (
    <section className="home-hero" aria-label="Welcome">
      <div className="home-hero__media" aria-hidden="true">
        <img src={photoAccueil} alt="" className="home-hero__image" />
        <div className="home-hero__veil" />
      </div>

      <div className="home-hero__content">
        <p className="home-hero__brand">Medical Office</p>
        <h1 className="home-hero__title">
          Internal practice management for your team
        </h1>
        <p className="home-hero__lead">
          Secretaries manage patients and appointments. Doctors follow the daily
          consultation schedule — all in one secure workspace.
        </p>

        <div className="home-hero__actions">
          {isAuthenticated ? (
            <Link to={dashboardPath} className="home-btn home-btn--primary">
              Open {role === "Doctor" ? "Doctor" : "Secretary"} panel
            </Link>
          ) : (
            <>
              <Link to="/Login" className="home-btn home-btn--primary">
                Staff login
              </Link>
              <Link to="/About" className="home-btn home-btn--ghost">
                About the practice
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
