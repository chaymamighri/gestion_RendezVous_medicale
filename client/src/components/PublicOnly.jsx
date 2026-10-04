import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Redirects authenticated staff away from public auth pages */
function PublicOnly({ children }) {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    const dest =
      role === "Doctor"
        ? "/dashboards/doctorinterface/DoctorDashboard"
        : "/dashboards/secretaryinterface/SecretaryDashboard";
    return <Navigate to={dest} replace />;
  }

  return children;
}

export default PublicOnly;
