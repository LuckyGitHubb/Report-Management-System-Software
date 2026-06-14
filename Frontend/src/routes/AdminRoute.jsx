import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Loader } from "../components/Common/Loader/Loader";

function AdminRoute({ children }) {
  const { user, authLoading } = useContext(AuthContext);
  
    if(authLoading){
      return <Loader/>
    }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin user
  return children;
}

export default AdminRoute;