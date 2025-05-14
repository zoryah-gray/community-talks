import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import React from 'react';
import IssuePage from './Pages/issue';
import ProfilePage from './Pages/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/Issue" element={<IssuePage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
