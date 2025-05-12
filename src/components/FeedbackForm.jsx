// components/FeedbackForm.jsx
import React, { useState } from "react";
import { submitFeedback } from "./submitFeedback"; // 

const FeedbackForm = ({ department, onClose }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    await submitFeedback(department, text);
    setText("");
    setLoading(false);
    onClose(); 
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Submit Feedback</h3>
        <textarea
          style={styles.textarea}
          placeholder="Write your feedback..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={styles.buttons}>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "20px",
    resize: "vertical",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
};
