import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateAppointment() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getAppointment/${id}`);
        const data = response.data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setContact(data.contact);
        setDate(data.date);
        setTime(data.time);
      } catch (error) {
        console.error("Error fetching appointment:", error);
        setError("Failed to fetch appointment details.");
      }
    };

    fetchAppointment();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateAppointment/${id}`, {
        firstName,
        lastName,
        contact,
        date,
        time,
      })
      .then((result) => {
        console.log(result);
        navigate("/ListRdv");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded">
            <div className="card-body">
              <h1 className="text-center mb-4 text-primary">
                Update Appointment
              </h1>
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    <strong>First Name</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    <strong>Last Name</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    <strong>Contact</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    placeholder="Enter your phone number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    <strong>Appointment Date</strong>
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
                  <label htmlFor="time" className="form-label">
                    <strong>Appointment Time</strong>
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
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAppointment;
