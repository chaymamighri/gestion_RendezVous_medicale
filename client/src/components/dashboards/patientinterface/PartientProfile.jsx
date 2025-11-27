import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the patient ID from the URL
import axios from "axios";
//import "./PatientProfile.css"; // Optional styling

function PatientProfile() {
  //const { id } = useParams(); // Extract ID from URL
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatientProfile();
  }, []);

  const fetchPatientProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/profile`);
      setPatient(response.data);
    } catch (err) {
      setError("Unable to fetch patient profile. Please try again later.");
      console.error(err);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="patient-profile container mt-5">
      <h2 className="text-center">Patient Profile</h2>
      {patient ? (
        <div className="profile-card">
          <h3>{patient.firstName} {patient.lastName}</h3>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Appointment Date:</strong> {patient.date}</p>
          <p><strong>Appointment Time:</strong> {patient.time}</p>
        </div>
      ) : (
        <p className="text-center">Loading profile...</p>
      )}
    </div>
  );
}

export default PatientProfile;
