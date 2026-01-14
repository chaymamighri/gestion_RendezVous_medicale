import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please complete all required fields");
      return;
    }

    axios
      .post("/api/messages", {
        name,
        email,
        phone,
        message,
      })
      .then((result) => {
        console.log("Response from server:", result);
        alert("Form submitted successfully!");
    
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        
      })
      .catch((error) => {
        console.error("Error occurred while submitting the form:", error);
        alert("An error occurred while submitting the form.");
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6" >
          <form
            onSubmit={handleSubmit}
            className="p-4 border rounded shadow custom-form-background"
            style={{ background:'white' }}>
            <h1 className="text-center mb-4 text-primary">Contact Us</h1>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <b>Name:</b>
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <b>Email:</b>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                <b>Phone:</b>
              </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                <b>Message:</b>
              </label>
              <textarea
                id="message"
                className="form-control"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
