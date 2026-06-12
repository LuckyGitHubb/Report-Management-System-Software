import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <Navigate
        to={user.role === "ADMIN"
          ? "/admin-dashboard"
          : "/dashboard"}
        replace
      />
    );
  }

  return children;
}

export default PublicRoute