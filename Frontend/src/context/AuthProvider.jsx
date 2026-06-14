import React, { createContext, useEffect, useState } from 'react'
import { getMe } from '../services/api/userApi'

export const AuthContext = createContext()
function AuthProvider({children}) {
    const [user,setUser] = useState([])
    const [authLoading,setAuthLoading] = useState(false)

    const fetchUser = async()=>{
      try {
        const res = await getMe()
        setUser(res?.data?.data)
      } catch (error) {
        console.log('error: ',error)
      }
    }

    useEffect(()=>{
      fetchUser()
    },[])

    const loggedInUser = { user,setUser }
  return (
    <AuthContext.Provider value={{ user, setUser, authLoading }}>{children}</AuthContext.Provider>
  )
}   

export default AuthProvider