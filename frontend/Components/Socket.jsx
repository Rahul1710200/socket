import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
// import {SendIcon} from "@mui/icons-material/Send";
import { deepPurple } from "@mui/material/colors";
// import { useAuth } from "../Context/Authentication";


function Socket() {
  // const { isAuthenticated } = useAuth();
  
  const socket = useMemo(() => io("http://localhost:3000"), []);
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  
  const [room, setRoom] = useState("");
  const [RoomName, setRoomName] = useState("");
  const [socketId, setSocketId] = useState("");
  
  useEffect(() => {
    
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("received", (data) => {
      setMessages((messages) => [data, ...messages]);
      console.log("received", data);
    });
    
    return () => {
       socket.off("received");
    };
  }, [socket]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };


  const joinHandle = (e) => {
    e.preventDefault();
    socket.emit("join", RoomName);
    setRoom(RoomName);
    setRoomName("");
  };

  return (
    <>
    

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" color="primary" align="center" gutterBottom>
          Socket ID: {socketId}
        </Typography>

        <Box component={Paper} elevation={3} p={3} mb={4} borderRadius={2}>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Join a Room
          </Typography>
          <Box component="form" onSubmit={joinHandle}>
            <TextField
              label="Enter Room Name"
              variant="outlined"
              value={RoomName}
              onChange={(e) => setRoomName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Join
            </Button>
          </Box>
        </Box>

        <Box component={Paper} elevation={3} p={3} borderRadius={2}>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Send a Message
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <TextField
              label="Enter Message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Enter Room ID"
              variant="outlined"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              // endIcon={<SendIcon />}
              sx={{ mt: 1 }}
            >
              Send
            </Button>
          </Box>
        </Box>

        <Box my={4}>
          <Typography
            variant="h5"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            Messages
          </Typography>
          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              p: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            {messages.map((m, i) => (
              <Paper
                key={i}
                elevation={2}
                sx={{ my: 1, p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>{i}</Avatar>
                <Typography variant="body1">{m}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Socket;
