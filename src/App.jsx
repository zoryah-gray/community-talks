// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IssuePage from './Pages/issue';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IssuePage />} />
      </Routes>
    </Router>
  );
}

export default App;
