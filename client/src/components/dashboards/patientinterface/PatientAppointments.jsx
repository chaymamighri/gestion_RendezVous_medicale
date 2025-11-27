import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchAppointments();
  }, []);


  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bookings");
      setAppointments(response.data);
      setError("");
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
      setError("Unable to fetch appointments. Please try again later.");
    }
  };


  const handleDeleteAppointment = async (id) => {
    try {

      await axios.delete(`http://localhost:3001/deleteAppointment/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous:", error);
      setError("Failed to delete the appointment.");
    }
  };

  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Medical Appointments</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3 text-end">
        <Link to="/Booking" className="btn btn-success btn-sm">
          Add +
        </Link>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Contact</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>
                  {booking.firstName} {booking.lastName}
                </td>
                <td>{booking.contact}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
               <td>{booking.status}</td>
                <td>
                  <Link
                    to={`/UpdateAppointment/${booking._id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteAppointment(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientAppointments;
