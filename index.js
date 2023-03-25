const app = require('./app');
const http = require('http');
const socketio = require('socket.io');
const connectDatabase = require("./config/database");
const privateChat = require('./routes/Message.rout');



const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 5000;
require('dotenv').config();

// Connecting to database
connectDatabase();
privateChat (io);


// Start the server
server.listen(port, () => console.log(`Listening on port ${port}...`));