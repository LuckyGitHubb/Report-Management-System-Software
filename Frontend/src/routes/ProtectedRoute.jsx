import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'
import { Loader } from '../components/Common/Loader/Loader';

function ProtectedRoute({ children }) {
  const { user, authLoading } = useContext(AuthContext);
    
      if(authLoading){
        return <Loader/>
      }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;