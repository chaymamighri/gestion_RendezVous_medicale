import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../../api";
import { formatDate, getErrorMessage } from "../../../utils/format";
import "./Doctor.css";
import "../secretaryinterface/Patients.css";

function DoctorDashboard() {
  const location = useLocation();
  const isToday =
    location.pathname.includes("DoctorDashboard") ||
    location.pathname.endsWith("/doctor") ||
    location.pathname === "/doctor/schedule";

  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [statut, setStatut] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError("");
      setSelected(null);
      try {
        const params = isToday ? { today: "true" } : {};
        const response = await api.get("/bookings", { params });
        setAppointments(response.data);
      } catch (err) {
        setError(getErrorMessage(err, "Unable to fetch appointments."));
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isToday]);

  const filteredAppointments = useMemo(
    () =>
      appointments.filter((appointment) =>
        statut
          ? appointment.status === statut
          : appointment.status !== "cancelled"
      ),
    [appointments, statut]
  );

  return (
    <div className="mpms-page">
      <div className="mpms-page-header">
        <div>
          <h2>
            {isToday ? "Today's Appointments" : "Appointment Schedule"}
          </h2>
          <p className="mpms-subtitle">
            Follow the consultation schedule and open patient information
          </p>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-3 align-items-end">
        <div>
          <label htmlFor="statusFilter" className="form-label mb-1">
            <b>Filter by Status</b>
          </label>
          <select
            id="statusFilter"
            onChange={(e) => setStatut(e.target.value)}
            value={statut}
            className="form-select"
          >
            <option value="">Active (pending + confirmed)</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="mpms-state">Loading schedule...</div>
      ) : (
        <div className="row g-4">
          <div className={selected ? "col-lg-7" : "col-12"}>
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
                    <th></th>
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
                        <td>{formatDate(booking.date)}</td>
                        <td>{booking.time}</td>
                        <td>
                          <span
                            className={`status-badge status-${booking.status}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => setSelected(booking)}
                          >
                            Consult
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
          </div>

          {selected && (
            <div className="col-lg-5">
              <div className="card shadow-sm consultation-panel">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="text-primary mb-3">Consultation</h5>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setSelected(null)}
                    >
                      Close
                    </button>
                  </div>
                  <p>
                    <strong>
                      {selected.firstName} {selected.lastName}
                    </strong>
                  </p>
                  <p className="mb-1">
                    <strong>When:</strong> {formatDate(selected.date)} at{" "}
                    {selected.time}
                  </p>
                  <p className="mb-1">
                    <strong>Contact:</strong> {selected.contact}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong> {selected.status}
                  </p>
                  <p className="mb-3">
                    <strong>Notes:</strong> {selected.notes || "—"}
                  </p>

                  {selected.patient ? (
                    <>
                      <hr />
                      <h6>Patient Information</h6>
                      <p className="mb-1">
                        <strong>DOB:</strong>{" "}
                        {formatDate(selected.patient.dateOfBirth)}
                      </p>
                      <p className="mb-1">
                        <strong>Blood type:</strong>{" "}
                        {selected.patient.bloodType || "—"}
                      </p>
                      <p className="mb-1">
                        <strong>Allergies:</strong>{" "}
                        {selected.patient.allergies || "None recorded"}
                      </p>
                      <p className="mb-3">
                        <strong>Medical notes:</strong>{" "}
                        {selected.patient.medicalNotes || "None recorded"}
                      </p>
                      <Link
                        to={`/doctor/patients/${selected.patient._id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Open full patient record
                      </Link>
                    </>
                  ) : (
                    <p className="text-muted mb-0">
                      No linked patient record. Contact details are shown above.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;
