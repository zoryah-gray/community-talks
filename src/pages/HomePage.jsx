import React from "react";

export default function HomePage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Community Talks</h1>
        <p>Your hub for engaging discussions</p>
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