const express = require("express");
const cors=require("cors");
const mongoose = require("mongoose");
const authRoutes=require("./routes/authRoutes")
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
// app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

mongoose
  .connect("mongodb://localhost:27017/rahuldb4")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(cors())
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  console.log("socket id is", socket.id);

  socket.on("message", ({room,message}) => {
    console.log(data);
    socket.broadcast.to(room).emit("received",message)
  })

  // socket.on("disconnect", () => {
  //   console.log("User Disconnected", socket.id);
  // });

  socket.on("join",(roomname)=>{
    socket.join(roomname)
    console.log(`user joined ${roomname}`);

  })



  // socket.emit("welcome",`Welcome to the server`)
  // socket.broadcast.emit("welcome",`Welcome to the server ${socket.id}`)
});
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  res.send("hello world");
});



const PORT = 3000;
server.listen(PORT, (err) => {
  if (err) {
    throw new err();
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
