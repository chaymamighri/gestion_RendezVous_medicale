import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import { formatDate, getErrorMessage } from "../../../utils/format";
import "./Patients.css";

function SecretaryHome() {
  const [stats, setStats] = useState({
    patients: 0,
    today: 0,
    pending: 0,
  });
  const [todayList, setTodayList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [patientsRes, todayRes, allRes] = await Promise.all([
          api.get("/patients"),
          api.get("/bookings", { params: { today: "true" } }),
          api.get("/bookings"),
        ]);

        const pending = (allRes.data || []).filter(
          (a) => a.status === "pending"
        ).length;

        setStats({
          patients: patientsRes.data?.length || 0,
          today: todayRes.data?.length || 0,
          pending,
        });
        setTodayList(todayRes.data || []);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load dashboard."));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="mpms-state">Loading dashboard...</div>;
  }

  return (
    <>
      <h5>Welcome to the Secretary Dashboard</h5>
      <p className="mpms-subtitle mb-4">
        Administrative overview for patients and appointments
      </p>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3 mb-4">
        <div className="col-md-4 col-sm-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="text-muted small">Patients</div>
              <div className="fs-3 fw-semibold text-primary">{stats.patients}</div>
              <Link to="/patients" className="small">
                Manage patients
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="text-muted small">Today</div>
              <div className="fs-3 fw-semibold text-primary">{stats.today}</div>
              <Link to="/ListRdv" className="small">
                View schedule
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="text-muted small">Pending</div>
              <div className="fs-3 fw-semibold text-warning">{stats.pending}</div>
              <Link to="/ListRdv" className="small">
                Review appointments
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h6 className="mb-3">Today&apos;s Appointments</h6>
      {todayList.length === 0 ? (
        <div className="mpms-state">No appointments scheduled for today.</div>
      ) : (
        <div className="table-responsive">
          <table className="table1">
            <thead className="head-table">
              <tr>
                <th>Time</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todayList.map((a) => (
                <tr key={a._id}>
                  <td>{a.time}</td>
                  <td>
                    {a.firstName} {a.lastName}
                  </td>
                  <td>{a.contact}</td>
                  <td>
                    <span className={`status-badge status-${a.status}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-muted small mt-2">Updated for {formatDate(new Date())}</p>
    </>
  );
}

export default SecretaryHome;
