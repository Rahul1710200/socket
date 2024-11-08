import { createContext, useContext, useState } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const login=()=>setIsAuthenticated(true)
    const logout=()=>setIsAuthenticated(false)

    return(
        <AuthContext.Provider value={{login,logout,isAuthenticated,setIsAuthenticated}}>
{children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)