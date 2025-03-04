// src/components/ProtectedRoute.js
import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    // Redirect to the login page if the user is not signed in
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
