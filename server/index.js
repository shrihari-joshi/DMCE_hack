const express = require('express');
const app = express();
const http = require('http'); // Import the HTTP module
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const dbConn = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const PORT = 8000;

// Connect to MongoDB
dbConn();

// Create an HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.IO server using the HTTP server
const io = new Server(server, {
    cors: true,
});

// Map to store email to socketId and vice versa
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

// Socket.IO event handlers
io.on("connection", (socket) => {
    console.log(`Socket Connected`, socket.id);

    // Handle room joining
    socket.on("room:join", (data) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    });

    // Other socket event handlers
    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incomming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
        console.log("peer:nego:needed", offer);
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
        console.log("peer:nego:done", ans);
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
});

// Express middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(credentials); // Assuming this middleware is implemented correctly for authentication
app.use(cors(corsOptions)); // Assuming this CORS configuration is appropriate for your application

// API routes
app.use('/register-user', require('./routes/register'));
app.use('/login-user', require('./routes/login'));

// Start the combined HTTP server (Express + Socket.IO)
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
