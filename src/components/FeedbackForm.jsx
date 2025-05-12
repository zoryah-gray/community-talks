import React, { useState } from "react";
import { submitFeedback } from "./submitFeedback";

const FeedbackForm = ({ department, onClose }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false); // ✅ 错误提示状态

  const handleSubmit = async () => {
    if (!text.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 1500); // 自动关闭错误提示
      return;
    }

    setLoading(true);
    await submitFeedback(department, text);
    setLoading(false);
    setText("");

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {showSuccess ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h3>🎉 Thank you for your feedback!</h3>
          </div>
        ) : (
          <>
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
            {/* ❗错误提示弹出框 */}
            {showError && (
              <div style={styles.errorBox}>⚠️ Feedback cannot be empty.</div>
            )}
          </>
        )}
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
    position: "relative",
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
  errorBox: {
    marginTop: "10px",
    backgroundColor: "#ffe5e5",
    color: "#cc0000",
    padding: "8px",
    borderRadius: "4px",
    fontSize: "14px",
    textAlign: "center",
  },
};
