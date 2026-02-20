import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState("feedback");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !message) {
      alert("Please fill all fields");
      return;
    }

    const templateParams = {
      user_name: name,
      type: type,
      message: message,
    };

    emailjs
      .send(
        "service_xhwtgtr",
        "template_6gtypco",
        templateParams,
        "jp1kKylHfMwN1_cja"
      )
      .then(() => {
        alert("Thank You for your feedback!");
        setName("");
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send feedback!");
      });
  };

  return (
    <div className="container">
      <h1>QuizKrida</h1>
      <h2>Quiz Feedback & Issue Form</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>Name (entered while playing quiz)</label>
        <input
          type="text"
          placeholder="Enter your quiz name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Are you facing an issue or giving normal feedback?</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="feedback">Normal Feedback</option>
          <option value="issue">Issue</option>
        </select>

        <label>
          {type === "issue" ? "Describe the Issue" : "Give Your Feedback"}
        </label>

        <textarea
          placeholder={
            type === "issue"
              ? "Explain the issue clearly..."
              : "Share your feedback..."
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
