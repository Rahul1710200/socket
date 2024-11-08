import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {CssBaseline} from "@mui/material"
import { AuthProvider } from '../Context/Authentication.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CssBaseline />
      <App />
    </AuthProvider>
  </StrictMode>
);
