import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Not logged in → redirect to login
  if (!currentUser) return <Navigate to="/login" />;

  // Logged in → allow access
  return children;
}
