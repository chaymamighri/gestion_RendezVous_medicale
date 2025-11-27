import medecin from '../images/medecin.jpg'
import medecin2 from '../images/medecin2.jpg'
import medecin3 from '../images/medecin3.jpg'
import '../Style/About.css'

function About() {
    return (
        <>
        <span>
        <div className='welcome_section'>
            <h1>Welcome To Our Medical Office 🩺</h1>
            <p1> we are committed to providing personalized, high-quality healthcare to every patient. With a focus on compassion, trust, and professional excellence, we aim to meet your medical needs in a welcoming and supportive environment.</p1>
        </div>
        </span>
        <div className='doctor_section'>
        <div className='text_section'>
        <h1>About doctor</h1>
          <p1> Our Doctor is a general practitioner with a extensive experience in providing exceptional medical care to patients of all ages.</p1>
          <p1> Our Doctor is committed to building strong, trusting relationships with her patients <strong>&#38;</strong> ensuring they receive compassionate, expert care in every visit <strong>&#38;</strong> guide you on your journey to better health💪❤.</p1>
          </div>
        <div className='doctor_images'>
        <img src={medecin} alt="doctor image" className="img_doctor1"></img>
        <img src={medecin2}  alt="doctor image" className="img_doctor2"></img>
        <img src={medecin3}  alt="doctor image" className="img_doctor3"></img>
        </div>
        </div>
        <span>
        <div className='service_section'>
          <h1>Services We Offer</h1>
          <h6><b>We offer a range of medical services designed to address your healthcare needs, including:</b></h6>
        <br></br>
        <p1><strong>Preventive Health Checkups:</strong> Regular examinations to monitor and maintain your overall health.</p1>
        <p1><strong>Diagnosis and Treatment of Common Illnesses: </strong> Expert care for conditions like colds, flu, infections, and other acute issues.
</p1>
        <p1><strong>Chronic Disease Management:</strong> Comprehensive care plans for diabetes, hypertension, asthma, and other long-term conditions.</p1>
        <p1><strong>Minor Procedures: </strong> Wound care, removal of stitches, draining abscesses, or treating minor injuries.</p1>
        <p1><strong>Vaccinations and Immunizations:</strong> Protect yourself and your family with up-to-date vaccines, including flu shots and routine immunizations.</p1>
        <p1><strong>Nutritional and Lifestyle Counseling: </strong>  Guidance on diet, exercise, and habits to promote a healthy lifestyle.</p1>
        <p1><strong>Medical Certificates and Reports: </strong> Issuance of certificates for school, work, or travel purposes.</p1>
        <p1>If you have specific health concerns, Dr. Doctor.Name will work closely with you to develop a personalized treatment plan tailored to your needs.</p1>
        </div>
        </span>

        <span className='verticalDiv'>
        <div className='why_section'>
        <h1>Why Choose Us?</h1>
       <p1>&#x2022; <strong>Personalized Care:</strong> Individual attention and tailored treatment for every patient.</p1> 
       <p1>&#x2022; <strong>Convenient Scheduling: </strong>Easily book appointments online at your convenience.</p1>
       <p1>&#x2022; <strong>Welcoming Atmosphere:</strong> A friendly, supportive environment for all your healthcare needs.</p1>
       </div>
       
        <div className='contact_section'>
          <div className='contact'>
          <h1>Contact Us</h1>
          <p1>We are here to serve you.<br/> Visit us <br/><strong>&#38;</strong> <br/> book your appointment online today to start your journey to better health.</p1>
          </div>
          <div className='btn_contact'>
            <button><a href="/Contact">Contact us</a></button>
          </div>
        </div>
        </span>
        </>
      );
}

export default About;