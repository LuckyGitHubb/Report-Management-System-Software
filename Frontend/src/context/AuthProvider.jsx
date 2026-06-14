import React, { createContext, useEffect, useState } from 'react'
import { getMe } from '../services/api/userApi'

export const AuthContext = createContext()
function AuthProvider({children}) {
    const [user,setUser] = useState(null)
    const [authLoading,setAuthLoading] = useState(true)

    const fetchUser = async()=>{
      try {
        setAuthLoading(true)
        const res = await getMe()
        setUser(res?.data?.data)
      } catch (error) {
        setUser(null)
        console.log('error: ',error)
      }
      finally{
        setAuthLoading(false)
      }
    }

    useEffect(()=>{
      fetchUser()
    },[])

    const loggedInUser = { user,setUser }
  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, fetchUser }}>{children}</AuthContext.Provider>
  )
}   

export default AuthProvider