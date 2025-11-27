import "./App.css";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Booking from "./components/Booking";
import Patient from "./components/dashboards/patientinterface/PatientDashboard";
import Doctor from "./components/dashboards/doctorinterface/DoctorDashboard";
import Secretary from "./components/dashboards/secretaryinterface/SecretaryDashboard ";
import ListRdv from "./components/dashboards/secretaryinterface/ListRdv";
import PatientHome from "./components/dashboards/patientinterface/PatientHome";
import PatientProfile from "./components/dashboards/patientinterface/PartientProfile";
import PatientAppointments from "./components/dashboards/patientinterface/PatientAppointments";
import UpdateAppointment from "./components/UpdateAppointment";
import Messages from "./components/dashboards/secretaryinterface/Messages";


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/Contact" element={<Contact />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/ListRdv" element={<ListRdv />}></Route>
            <Route path="/Booking" element={<Booking />}></Route>
            <Route path="/PatientHome" element={<PatientHome />}></Route>
            <Route path="/PatientProfile" element={<PatientProfile />}></Route>
            <Route path="/PatientAppointments" element={<PatientAppointments/>}></Route>
            <Route path="/UpdateAppointment/:id" element={<UpdateAppointment/>}></Route>
            <Route path="/Messages" element={<Messages/>}></Route>
            <Route
              path="/dashboards/patientinterface/PatientDashboard"
              element={<Patient />}
            ></Route>
            <Route
              path="/dashboards/doctorinterface/DoctorDashboard"
              element={<Doctor />}
            ></Route>
            <Route
              path="/dashboards/secretaryinterface/SecretaryDashboard"
              element={<Secretary />}
            ></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
