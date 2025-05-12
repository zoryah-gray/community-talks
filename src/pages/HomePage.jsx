import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ 导入跳转 hook

export default function HomePage() {
  const navigate = useNavigate(); // ✅ 创建跳转函数

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Community Talks</h1>
        <p>Your hub for engaging discussions</p>
        <button onClick={() => navigate("/profile")} style={styles.button}>
          Go to Profile
        </button>
      </header>
      <main className="homepage-main">
        <section className="homepage-section">
          <h2>Featured Topics</h2>
          <p>Coming soon...</p>
        </section>
        <section className="homepage-section">
          <h2>Recent Posts</h2>
          <p>Stay tuned for updates!</p>
        </section>
      </main>
    </div>
  );
}

const styles = {
  button: {
    marginTop: "10px",
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
