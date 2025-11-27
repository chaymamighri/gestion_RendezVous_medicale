import { Link } from 'react-router-dom';
import photoAccueil from '../images/photoAcceuil.jpg';
import '../Style/Home.css';

function Home() {
    return (  
        <>
            <div className="home-container">
               
                <div className="text-section">
                    <h1>Welcome To Our Medical Center</h1>
                    <h3>Simplify your medical appointments</h3>
                    <p>Book an appointment with your doctor in just a few clicks</p>
                    <button className="register-btn">
                        <Link to="/contact">Contact Us</Link>
                    </button>
                </div>

                
                <div className="img-section">
                    <img src={photoAccueil} alt="Medical Center" />
                </div>
            </div>
        </>
    );
}

export default Home;
