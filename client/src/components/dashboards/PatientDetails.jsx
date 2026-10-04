import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";
import { formatDate, getErrorMessage } from "../../utils/format";
import "./secretaryinterface/Patients.css";

function PatientDetails() {
  const { id } = useParams();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [patientRes, bookingsRes] = await Promise.all([
          api.get(`/patients/${id}`),
          api.get("/bookings"),
        ]);
        setPatient(patientRes.data);
        const related = (bookingsRes.data || []).filter(
          (b) =>
            b.patient?._id === id ||
            b.patient === id ||
            (b.firstName === patientRes.data.firstName &&
              b.lastName === patientRes.data.lastName &&
              b.contact === patientRes.data.phone)
        );
        setAppointments(related);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load patient details."));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <div className="mpms-page mpms-state">Loading patient...</div>;
  }

  if (error) {
    return (
      <div className="mpms-page">
        <div className="alert alert-danger">{error}</div>
        <Link to={role === "Doctor" ? "/doctor/patients" : "/patients"}>
          Back
        </Link>
      </div>
    );
  }

  if (!patient) {
    return <div className="mpms-page mpms-state">Patient not found.</div>;
  }

  return (
    <div className="mpms-page">
      <div className="mpms-page-header">
        <div>
          <h2>
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="mpms-subtitle">Patient record</p>
        </div>
        <div className="d-flex gap-2">
          {role === "Secretary" && (
            <>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/patients/${id}/edit`)}
              >
                Edit
              </button>
              <Link to="/Booking" className="btn btn-outline-primary">
                Book Appointment
              </Link>
            </>
          )}
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-primary">Personal Information</h5>
              <dl className="mpms-dl">
                <dt>Phone</dt>
                <dd>{patient.phone}</dd>
                <dt>Email</dt>
                <dd>{patient.email || "—"}</dd>
                <dt>Date of Birth</dt>
                <dd>{formatDate(patient.dateOfBirth)}</dd>
                <dt>Gender</dt>
                <dd>{patient.gender || "—"}</dd>
                <dt>Address</dt>
                <dd>{patient.address || "—"}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-primary">Medical Information</h5>
              <dl className="mpms-dl">
                <dt>Blood Type</dt>
                <dd>{patient.bloodType || "—"}</dd>
                <dt>Allergies</dt>
                <dd>{patient.allergies || "None recorded"}</dd>
                <dt>Medical Notes</dt>
                <dd>{patient.medicalNotes || "None recorded"}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4>Appointment History</h4>
        {appointments.length === 0 ? (
          <div className="mpms-state">No appointments for this patient.</div>
        ) : (
          <div className="table-responsive">
            <table className="table1">
              <thead className="head-table">
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id}>
                    <td>{formatDate(a.date)}</td>
                    <td>{a.time}</td>
                    <td>
                      <span className={`status-badge status-${a.status}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>{a.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDetails;
