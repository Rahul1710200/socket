import  { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  Paper,
} from "@mui/material";
import { useAuth } from "../Context/Authentication";

const Login = () => {
    
    const {login}=useAuth()
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Reset form fields when switching tabs
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth/login',{email,password})
    .then((response)=>{
       if (response.data) {
        login()
         // Handle successful login
         console.log("Login successful:", response.data);
         // You can add your logic here to show the Socket component
       } else {
         alert("Invalid credentials");
       }
    })
    .catch((error) => {
        console.error("Login error:", error);
    })
    


    // Handle login logic here
    console.log("Login:", { email, password });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:3000/auth/signup", { email, password, confirmPassword })
      .then((response) => {
        if (response.data) {

    login();
          // Handle successful signup
          console.log("Signup successful:", response.data);
        } else {
                console.log("response", response);
                console.log("response data", response.data);
                console.log("response data success", response.data.success);
                console.log("response data  message", response.data.message);
          alert("Signup failed: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
      
    // Handle signup logic here
    console.log("Signup:", { email, password, confirmPassword });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {activeTab === "login" ? "Login" : "Sign Up"}
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab label="Login" value="login" />
          <Tab label="Sign Up" value="signup" />
        </Tabs>

        <Box
          component="form"
          onSubmit={
            activeTab === "login" ? handleLoginSubmit : handleSignupSubmit
          }
        >
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {activeTab === "signup" && (
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {activeTab === "login" ? "Login" : "Sign Up"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
