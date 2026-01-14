import { useState, useEffect } from "react";
import axios from "axios";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/messages")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages. Please try again later.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Messages </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {messages.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {messages.map((msg, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">{msg.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{msg.email}</h6>
                  <br/>
                  <p className="card-text">
                    <strong>Phone:</strong> {msg.phone || "N/A"}
                  </p>
                  <p className="card-text">
                    <strong>Message:</strong> {msg.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center">
          No messages submitted yet.
        </div>
      )}
    </div>
  );
}

export default Messages;
