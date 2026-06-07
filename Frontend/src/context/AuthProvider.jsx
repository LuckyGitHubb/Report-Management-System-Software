import React, { createContext } from 'react'

export const AuthContext = createContext()
function AuthProvider({children}) {
    const [user,setUser] = useState(null)
    const loggedInUser = { user,setUser }
  return (
    <AuthContext.Provider value={loggedInUser}>{children}</AuthContext.Provider>
  )
}   

export default AuthProvider