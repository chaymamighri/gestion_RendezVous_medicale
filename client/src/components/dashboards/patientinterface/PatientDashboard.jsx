import React, { useEffect, useState } from "react";
//import axios from "axios";
import PatientMenu from "./PatientMenu";
import PatientHome from "./PatientHome";
import "./Patient.css";

function Patient() {
  /*const [patients, setPatients] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    // Fetch patient data from API with query params
    axios.get("http://localhost:3001/bookings", {
        params: { firstName, lastName, contact }, // envoyer les paramètres via "params"
      })
      .then((response) => {
        setPatients(response.data); // Assurez-vous que response.data contient bien les données des patients
      })
      .catch((error) => {
        console.error("There was an error fetching the patient data!", error);
      });
  }, [firstName, lastName, contact]);*/

  return (
    <>
      <div className="patient-interface">
        <div className="sidebar">
          <h1>Patients</h1>
          <PatientMenu />
        </div>

        <div className="home-content">
          <PatientHome />
        </div>
      </div>
    </>
  );
}

export default Patient;
