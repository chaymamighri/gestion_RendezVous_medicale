import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  if (roles && roles.length > 0 && !roles.includes(role)) {
    const fallback =
      role === "Doctor"
        ? "/dashboards/doctorinterface/DoctorDashboard"
        : "/dashboards/secretaryinterface/SecretaryDashboard";
    return <Navigate to={fallback} replace />;
  }

  return children;
}

export default ProtectedRoute;
