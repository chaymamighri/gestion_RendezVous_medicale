import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ListRdv.css";
import "./Secretary.css";

function ListRdv() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const confirmAppointment = async (id) => {
    try {
      //patch : faire une modification partiel du donnee comme le status dnas ce cas./*put remplacer tout les donnee  */
      await axios.patch(`/api/confirmAppointment/${id}`, {
        status: "confirmed",
      });

      // mettre a jour l'état local après la confirmation
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id
            ? { ...appointment, status: "confirmed" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Erreur lors de la confirmation du rendez-vous:", error);
      setError("Failed to confirm the appointment.");
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`/api/deleteAppointment/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous:", error);
      setError("Failed to delete the appointment.");
    }
  };

  //redirection vers 
  const handleEdit = (id) => {
    navigate(`/UpdateAppointment/${id}`);
  };


  return (
   
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
                  {booking.status !== "confirmed" && (
                    <button
                      className="btn-warning"
                      onClick={() => confirmAppointment(booking._id)}
                    >
                      Confirm
                    </button>
                  )}

                  <button
                    className="btn-cancel"
                    onClick={() => handleDeleteAppointment(booking._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(booking._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListRdv;
