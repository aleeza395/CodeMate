import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null)

    const login = (userData) => {
        setuser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        setuser(null)
        localStorage.removeItem("user")
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
    )
}