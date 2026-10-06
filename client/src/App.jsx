import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnly from "./components/PublicOnly";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Booking from "./components/Booking";
import Doctor from "./components/dashboards/doctorinterface/DoctorDashboard";
import DoctorLayout from "./components/dashboards/doctorinterface/DoctorLayout";
import SecretaryLayout from "./components/dashboards/secretaryinterface/SecretaryLayout";
import SecretaryHome from "./components/dashboards/secretaryinterface/SecretaryHome";
import ListRdv from "./components/dashboards/secretaryinterface/ListRdv";
import Patients from "./components/dashboards/secretaryinterface/Patients";
import PatientForm from "./components/dashboards/secretaryinterface/PatientForm";
import PatientDetails from "./components/dashboards/PatientDetails";
import UpdateAppointment from "./components/UpdateAppointment";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Header />
          <div className="app-main">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/Register"
                element={
                  <PublicOnly>
                    <Register />
                  </PublicOnly>
                }
              />
              <Route
                path="/Login"
                element={
                  <PublicOnly>
                    <Login />
                  </PublicOnly>
                }
              />

              <Route
                element={
                  <ProtectedRoute roles={["Secretary"]}>
                    <SecretaryLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="/dashboards/secretaryinterface/SecretaryDashboard"
                  element={<SecretaryHome />}
                />
                <Route path="/ListRdv" element={<ListRdv />} />
                <Route path="/Booking" element={<Booking />} />
                <Route
                  path="/UpdateAppointment/:id"
                  element={<UpdateAppointment />}
                />
                <Route path="/patients" element={<Patients />} />
                <Route path="/patients/new" element={<PatientForm />} />
                <Route path="/patients/:id/edit" element={<PatientForm />} />
                <Route path="/patients/:id" element={<PatientDetails />} />
              </Route>

              <Route
                element={
                  <ProtectedRoute roles={["Doctor"]}>
                    <DoctorLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="/dashboards/doctorinterface/DoctorDashboard"
                  element={<Doctor />}
                />
                <Route path="/doctor/appointments" element={<Doctor />} />
                <Route path="/doctor/patients" element={<Patients />} />
                <Route
                  path="/doctor/patients/:id"
                  element={<PatientDetails />}
                />
                <Route
                  path="/doctor/schedule"
                  element={
                    <Navigate
                      to="/dashboards/doctorinterface/DoctorDashboard"
                      replace
                    />
                  }
                />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
