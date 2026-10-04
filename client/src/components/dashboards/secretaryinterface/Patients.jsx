import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import { formatDate, getErrorMessage } from "../../../utils/format";
import "./Patients.css";

function Patients() {
  const { role } = useAuth();
  const isSecretary = role === "Secretary";
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const patientBase = isSecretary ? "/patients" : "/doctor/patients";

  const fetchPatients = async (q = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/patients", { params: q ? { q } : {} });
      setPatients(res.data);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load patients."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPatients(search.trim());
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete patient ${name}? This cannot be undone.`)) {
      return;
    }
    try {
      await api.delete(`/patients/${id}`);
      setSuccess("Patient deleted successfully.");
      fetchPatients(search.trim());
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete patient."));
    }
  };

  return (
    <div className="mpms-page">
      <div className="mpms-page-header">
        <div>
          <h2>Patients</h2>
          <p className="mpms-subtitle">
            {isSecretary
              ? "Search, view and manage patient records"
              : "Look up patient information for consultations"}
          </p>
        </div>
        {isSecretary && (
          <Link to="/patients/new" className="btn btn-primary">
            Add Patient
          </Link>
        )}
      </div>

      <form className="mpms-search-bar" onSubmit={handleSearch}>
        <input
          type="search"
          className="form-control"
          placeholder="Search by name, phone or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-outline-primary">
          Search
        </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {loading ? (
        <div className="mpms-state">Loading patients...</div>
      ) : patients.length === 0 ? (
        <div className="mpms-state">No patients found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table1">
            <thead className="head-table">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient._id}>
                  <td>{index + 1}</td>
                  <td>
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td>{patient.phone}</td>
                  <td>{patient.email || "—"}</td>
                  <td>{formatDate(patient.dateOfBirth)}</td>
                  <td className="mpms-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`${patientBase}/${patient._id}`)}
                    >
                      View
                    </button>
                    {isSecretary && (
                      <>
                        <button
                          className="btn-edit"
                          onClick={() =>
                            navigate(`/patients/${patient._id}/edit`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={() =>
                            handleDelete(
                              patient._id,
                              `${patient.firstName} ${patient.lastName}`
                            )
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Patients;
