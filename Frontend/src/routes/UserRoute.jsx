import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Loader } from "../components/Common/Loader/Loader";

function UserRoute({ children }) {
  const { user, authLoading } = useContext(AuthContext);

  if(authLoading){
    return <Loader/>
  }

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