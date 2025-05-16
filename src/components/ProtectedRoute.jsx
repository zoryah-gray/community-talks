import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <div>Loading...</div>
  
  // If not logged in, redirect to login
  if (!currentUser) return <Navigate to="/login" />;
  if (currentUser) return <Navigate to="/" />;  
  
  return children;
}
