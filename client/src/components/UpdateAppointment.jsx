import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { getErrorMessage, toDateInputValue } from "../utils/format";

function UpdateAppointment() {
  const { id } = useParams();
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("pending");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [appointmentRes, patientsRes] = await Promise.all([
          api.get(`/getAppointment/${id}`),
          api.get("/patients"),
        ]);
        const data = appointmentRes.data;
        setPatients(patientsRes.data);
        setPatientId(data.patient?._id || data.patient || "");
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setContact(data.contact || "");
        setDate(toDateInputValue(data.date));
        setTime(data.time || "");
        setStatus(data.status || "pending");
        setNotes(data.notes || "");
      } catch (err) {
        setError(getErrorMessage(err, "Failed to fetch appointment details."));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (!date || !time) {
      setError("Date and time are required.");
      return;
    }

    setSaving(true);
    try {
      const payload = { date, time, status, notes };
      if (patientId) {
        payload.patient = patientId;
      } else {
        payload.firstName = firstName;
        payload.lastName = lastName;
        payload.contact = contact;
      }

      await api.put(`/updateAppointment/${id}`, payload);
      navigate("/ListRdv");
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update appointment."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="mpms-page mpms-state">Loading appointment...</div>;
  }

  return (
    <div className="mpms-page">
      <div className="mpms-page-header">
        <div>
          <h2>Update appointment</h2>
          <p className="mpms-subtitle">Edit schedule details and status</p>
        </div>
        <Link to="/ListRdv" className="btn mo-btn mo-btn--ghost">
          Back
        </Link>
      </div>

      <div className="mo-card" style={{ maxWidth: 520 }}>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="patient" className="mo-label">
              Patient
            </label>
            <select
              id="patient"
              className="form-select"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            >
              <option value="">Use existing name/contact</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.lastName} {p.firstName} — {p.phone}
                </option>
              ))}
            </select>
          </div>

          {!patientId && (
            <>
              <div className="mb-3">
                <label className="mo-label">First name *</label>
                <input
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="mo-label">Last name *</label>
                <input
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="mo-label">Contact *</label>
                <input
                  className="form-control"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="mb-3">
            <label htmlFor="date" className="mo-label">
              Date *
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
            <label htmlFor="status" className="mo-label">
              Status
            </label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
            />
          </div>
          <button
            type="submit"
            className="btn mo-btn mo-btn--primary w-100"
            disabled={saving}
          >
            {saving ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAppointment;
