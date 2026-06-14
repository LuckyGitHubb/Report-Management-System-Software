import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Loader } from "../components/Common/Loader/Loader";

function PublicRoute({ children }) {
  const { user, authLoading } = useContext(AuthContext);
      
        if(authLoading){
          return <Loader/>
        }

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