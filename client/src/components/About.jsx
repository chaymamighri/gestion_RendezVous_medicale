import { Link } from "react-router-dom";
import medecin from "../images/medecin.jpg";
import medecin2 from "../images/medecin2.jpg";
import medecin3 from "../images/medecin3.jpg";
import "../Style/About.css";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <p className="about-kicker">Medical Office</p>
        <h1>Care built around patients and the practice team</h1>
        <p>
          We provide personalized, high-quality healthcare with compassion,
          trust, and professional excellence in a calm clinical environment.
        </p>
      </section>

      <section className="about-section">
        <div className="about-section__text">
          <h2>About the doctor</h2>
          <p>
            Our doctor is a general practitioner with extensive experience
            caring for patients of all ages, focused on strong relationships and
            clear guidance at every visit.
          </p>
        </div>
        <div className="about-gallery">
          <img src={medecin} alt="Doctor consultation" />
          <img src={medecin2} alt="Medical practice" />
          <img src={medecin3} alt="Patient care" />
        </div>
      </section>

      <section className="about-section about-section--soft">
        <h2>Services we offer</h2>
        <ul className="about-list">
          <li>
            <strong>Preventive checkups</strong> — monitor and maintain overall
            health.
          </li>
          <li>
            <strong>Common illnesses</strong> — diagnosis and treatment for
            acute conditions.
          </li>
          <li>
            <strong>Chronic disease management</strong> — diabetes, hypertension,
            asthma and more.
          </li>
          <li>
            <strong>Minor procedures</strong> — wound care and basic treatments.
          </li>
          <li>
            <strong>Vaccinations</strong> — routine immunizations and flu shots.
          </li>
          <li>
            <strong>Lifestyle counseling</strong> — nutrition and healthy habits.
          </li>
        </ul>
      </section>

      <section className="about-panel">
        <h2>Why choose us</h2>
        <ul className="about-list">
          <li>
            <strong>Personalized care</strong> tailored to each patient.
          </li>
          <li>
            <strong>Organized scheduling</strong> managed by the practice team.
          </li>
          <li>
            <strong>Welcoming atmosphere</strong> for every visit.
          </li>
        </ul>
        <p className="mt-3 mb-0">
          Staff can{" "}
          <Link to="/Login" className="mo-link">
            sign in
          </Link>{" "}
          to manage patients and appointments.
        </p>
      </section>
    </div>
  );
}

export default About;
