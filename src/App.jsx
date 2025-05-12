// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IssuePage from './Pages/issue';
import ProfilePage from './Pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IssuePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
