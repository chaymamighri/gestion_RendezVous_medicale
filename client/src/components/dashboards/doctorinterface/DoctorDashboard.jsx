import { useEffect, useState } from "react";
import axios from "axios";
import "./Doctor.css";

function Doctor() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [statut, setStatut] = useState("");

  // Récupérer les rendez-vous depuis l'API
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/bookings");
      setAppointments(response.data);
      setError("");
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
      setError("Unable to fetch appointments. Please try again later.");
    }
  };

  // Filtrer les rendez-vous en fonction du statut sélectionné
  const filteredAppointments = appointments.filter((appointment) =>
    statut ? appointment.status === statut : true
  );

  return (
    <>
      <center>
        <h1>Welcome Doctor</h1>
      </center>

      {/* Barre de recherche avec Select */}
      <div className="text-inline my-3 ms-5">
        <label htmlFor="statusFilter" > <b>Filter by Status:</b> </label>
        <select
          id="statusFilter"
          onChange={(e) => setStatut(e.target.value)}
          value={statut}
          className="form-select w-25 d-inline-block ms-2"
        >
          <option value="">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="container-fluid mt-5">
        <h2 className="text-center">List of Medical Appointments</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <table className="table1">
          <thead className="head-table">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>
                    {booking.firstName} {booking.lastName}
                  </td>
                  <td>{booking.contact}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.time}</td>
                  <td>{booking.status}</td>
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
    </>
  );
}

export default Doctor;
