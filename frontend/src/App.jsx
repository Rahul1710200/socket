import React from 'react'
import Socket from '../Components/Socket'
import { useAuth } from '../Context/Authentication'
import Login from '../Components/Login'

function App() {
  
  const {isAuthenticated}=useAuth()
  

  return (
    <div>

    {isAuthenticated ? (
    <Socket/>
    ):(
      <Login/>
    )
     }
    
      
    </div>
  )
}

export default App
