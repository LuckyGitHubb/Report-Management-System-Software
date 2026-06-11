import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const { user } = useContext(AuthContext)
    if(!user){
        return children
    }
  else{
    return <Navigate to='/login' />
  }
}

export default ProtectedRoute