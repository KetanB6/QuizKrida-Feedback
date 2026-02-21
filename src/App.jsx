import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    type: "feedback",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.name.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please complete all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      user_name: formData.name,
      type: formData.type,
      message: formData.message,
    };

    try {
      await emailjs.send(
        "service_xhwtgtr",
        "template_6gtypco",
        templateParams,
        "jp1kKylHfMwN1_cja"
      );

      setSubmitStatus({
        type: "success",
        message: "Thank you for your submission. We appreciate your feedback!",
      });

      setFormData({
        name: "",
        type: "feedback",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Unable to submit at this time. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>QuizKrida</h1>
        <p className="subtitle">Feedback & Support Center</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">
            Your Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name as it appears in the quiz"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">
            Submission Type <span className="required">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            disabled={isSubmitting}
          >
            <option value="feedback">General Feedback</option>
            <option value="issue">Technical Issue</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">
            {formData.type === "issue"
              ? "Issue Description"
              : "Your Feedback"}{" "}
            <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder={
              formData.type === "issue"
                ? "Please describe the issue you encountered in detail..."
                : "We value your feedback. Please share your thoughts and suggestions..."
            }
            value={formData.message}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
          ></textarea>
          <span className="char-count">{formData.message.length} characters</span>
        </div>

        {submitStatus && (
          <div className={`status-message ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>

        <p className="footer-note">
          All submissions are reviewed within 24-48 hours.
        </p>
      </form>
    </div>
  );
}

export default App;