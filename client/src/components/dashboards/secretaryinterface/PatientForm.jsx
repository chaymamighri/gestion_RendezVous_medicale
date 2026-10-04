import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../api";
import { getErrorMessage, toDateInputValue } from "../../../utils/format";
import "./Patients.css";

const emptyForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  bloodType: "",
  allergies: "",
  medicalNotes: "",
};

function PatientForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    const load = async () => {
      try {
        const res = await api.get(`/patients/${id}`);
        const p = res.data;
        setForm({
          firstName: p.firstName || "",
          lastName: p.lastName || "",
          dateOfBirth: toDateInputValue(p.dateOfBirth),
          gender: p.gender || "",
          phone: p.phone || "",
          email: p.email || "",
          address: p.address || "",
          bloodType: p.bloodType || "",
          allergies: p.allergies || "",
          medicalNotes: p.medicalNotes || "",
        });
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load patient."));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim()) {
      setError("First name, last name and phone are required.");
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/patients/${id}`, form);
        navigate(`/patients/${id}`);
      } else {
        const res = await api.post("/patients", form);
        navigate(`/patients/${res.data._id}`);
      }
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save patient."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="mpms-page mpms-state">Loading patient...</div>;
  }

  return (
    <div className="mpms-page">
      <div className="mpms-page-header">
        <div>
          <h2>{isEdit ? "Edit Patient" : "Add Patient"}</h2>
          <p className="mpms-subtitle">
            {isEdit
              ? "Update patient personal and medical information"
              : "Register a new patient in the practice"}
          </p>
        </div>
        <Link to="/patients" className="btn btn-outline-secondary">
          Back to list
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="mpms-form card shadow-sm p-4" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name *</label>
            <input
              name="firstName"
              className="form-control"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name *</label>
            <input
              name="lastName"
              className="form-control"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              value={form.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-select"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">—</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Blood Type</label>
            <input
              name="bloodType"
              className="form-control"
              value={form.bloodType}
              onChange={handleChange}
              placeholder="e.g. A+"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone *</label>
            <input
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              name="address"
              className="form-control"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Allergies</label>
            <textarea
              name="allergies"
              className="form-control"
              rows={2}
              value={form.allergies}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Medical Notes</label>
            <textarea
              name="medicalNotes"
              className="form-control"
              rows={3}
              value={form.medicalNotes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Patient" : "Create Patient"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientForm;
