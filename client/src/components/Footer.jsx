import React from "react";
import '../Style/Footer.css'

function Footer() {
    return ( 
        <>
    <footer className="footer">
      <div className="container">
       
        <div className="section">
          <h2 className="logo"> Online Medical Appointment</h2>
          <p>Your trusted partner for easy medical appointments.</p>
        </div>

        <div className="section">
          <h3 className="heading">Quick Links</h3>
          <ul className="list">
            <li><a href="/" className="link">Home</a></li>
            <li><a href="/about" className="link">About Us</a></li>
            <li><a href="/Contact" className="link">Contact</a></li>
            <li><a href="/Login" className="link">Sign In</a></li>
          </ul>
        </div>

        
        <div className="section">
          <h3 className="heading">Contact Us</h3>
          <p>📍 <strong>Address:</strong> 124 Medical Street, City, Country</p>
          <p>📞 <strong>Phone:</strong>  +216 456 789</p>
          <p>📧 <strong>Email:</strong>  contact@medicare.com</p>
        </div>
      </div>
    
           {/*<div className="footer-section newsletter">
            <h2 className="connect_section">Stay Connected</h2>
            
           <form className="newsletter-form">
             
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
             
              <button type="submit" className="newsletter-button">
                <a href="/register">Subscribe</a>
              </button>
            </form>
          </div>*/}
          
          <div className="copyright">
        <p>© {new Date().getFullYear()} Online Medical Appointment. All rights reserved.</p>
      </div>
        
      </footer>
        </>
     );
}

export default Footer;




     