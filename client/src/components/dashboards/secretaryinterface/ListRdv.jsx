import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";
import { formatDate, getErrorMessage } from "../../../utils/format";
import "./ListRdv.css";
import "./secretary.css";
import "./Patients.css";

function ListRdv() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (dateFilter) params.date = dateFilter;
      const response = await api.get("/bookings", { params });
      setAppointments(response.data);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to fetch appointments."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, dateFilter]);

  const confirmAppointment = async (id) => {
    try {
      await api.patch(`/confirmAppointment/${id}`);
      setSuccess("Appointment confirmed.");
      fetchAppointments();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to confirm the appointment."));
    }
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await api.patch(`/cancelAppointment/${id}`);
      setSuccess("Appointment cancelled.");
      fetchAppointments();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to cancel the appointment."));
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Permanently delete this appointment?")) return;
    try {
      await api.delete(`/deleteAppointment/${id}`);
      setSuccess("Appointment deleted.");
      fetchAppointments();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete the appointment."));
    }
  };

  const handleEdit = (id) => {
    navigate(`/UpdateAppointment/${id}`);
  };

  return (
    <div className="mpms-page">
      <div className="mpms-page-header">
        <div>
          <h2>Appointments</h2>
          <p className="mpms-subtitle">Manage the practice schedule</p>
        </div>
        <Link to="/Booking" className="btn btn-primary">
          New Appointment
        </Link>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-3 align-items-end">
        <div>
          <label className="form-label mb-1">
            <b>Status</b>
          </label>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="form-label mb-1">
            <b>Date</b>
          </label>
          <input
            type="date"
            className="form-control"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        {dateFilter && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDateFilter("")}
          >
            Clear date
          </button>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {loading ? (
        <div className="mpms-state">Loading appointments...</div>
      ) : (
        <div className="table-responsive">
          <table className="table1">
            <thead className="head-table">
              <tr>
                <th>#</th>
                <th>Patient</th>
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
                      {booking.patient ? (
                        <Link to={`/patients/${booking.patient._id}`}>
                          {booking.firstName} {booking.lastName}
                        </Link>
                      ) : (
                        `${booking.firstName} ${booking.lastName}`
                      )}
                    </td>
                    <td>{booking.contact}</td>
                    <td>{formatDate(booking.date)}</td>
                    <td>{booking.time}</td>
                    <td>
                      <span className={`status-badge status-${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="mpms-actions">
                      {booking.status === "pending" && (
                        <button
                          className="btn-warning"
                          onClick={() => confirmAppointment(booking._id)}
                        >
                          Confirm
                        </button>
                      )}
                      {booking.status !== "cancelled" && (
                        <button
                          className="btn-cancel"
                          onClick={() => cancelAppointment(booking._id)}
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(booking._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => handleDeleteAppointment(booking._id)}
                      >
                        Delete
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
      )}
    </div>
  );
}

export default ListRdv;
