import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function UserRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not user
  if (user?.role !== "USER") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
}

export default UserRoute;