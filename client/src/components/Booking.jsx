import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Booking() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const bookingDetails = { firstName, lastName, contact, date, time };

    try {
      const response = await axios.post(
        "http://localhost:3001/bookings",bookingDetails
      );
      alert("Booking Confirmed: " + response.data.message);
      console.log("Booking Details:", bookingDetails);

      setFirstName("");
      setLastName("");
      setContact("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  return (
    <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg border-0 rounded">
          <div className="card-body">
            <h1 className="text-center mb-4 text-primary">
                Book an Appointment
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    <strong>First Name</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    <strong>Last Name</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    <strong>Contact</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    placeholder="Enter your phone number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    <strong>Appointment Date</strong>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    <strong>Appointment Time</strong>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
