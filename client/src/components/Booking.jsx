import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { getErrorMessage } from "../utils/format";

function Booking() {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const res = await api.get("/patients");
        setPatients(res.data);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load patients."));
      } finally {
        setLoading(false);
      }
    };
    loadPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!patientId) {
      setError("Please select a patient.");
      return;
    }
    if (!date || !time) {
      setError("Date and time are required.");
      return;
    }

    setSaving(true);
    try {
      await api.post("/bookings", {
        patient: patientId,
        date,
        time,
        notes,
        status: "pending",
      });
      setSuccess("Appointment created successfully.");
      setPatientId("");
      setDate("");
      setTime("");
      setNotes("");
      setTimeout(() => navigate("/ListRdv"), 800);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to create appointment."));
    } finally {
      setSaving(false);
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="mpms-page">
      <div className="mpms-page-header">
        <div>
          <h2>New appointment</h2>
          <p className="mpms-subtitle">Associate a patient with a date and time</p>
        </div>
        <Link to="/ListRdv" className="btn mo-btn mo-btn--ghost">
          Back
        </Link>
      </div>

      <div className="mo-card" style={{ maxWidth: 520 }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {loading ? (
          <p className="text-muted mb-0">Loading patients...</p>
        ) : patients.length === 0 ? (
          <div className="alert alert-info mb-0">
            No patients registered yet.{" "}
            <Link to="/patients/new" className="mo-link">
              Add a patient
            </Link>{" "}
            first.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="patient" className="mo-label">
                Patient *
              </label>
              <select
                id="patient"
                className="form-select"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
              >
                <option value="">Select patient...</option>
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.lastName} {p.firstName} — {p.phone}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="mo-label">
                Date *
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="mo-label">
                Time *
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
            <div className="mb-3">
              <label htmlFor="notes" className="mo-label">
                Notes
              </label>
              <textarea
                className="form-control"
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Reason for visit, optional notes..."
              />
            </div>
            <button
              type="submit"
              className="btn mo-btn mo-btn--primary w-100"
              disabled={saving}
            >
              {saving ? "Saving..." : "Create appointment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Booking;
