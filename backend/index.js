const express = require("express");
const app = express(); 
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log("Server is running on port " + port);
});


io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('message', 'hey how are you?');
    socket.on('chat message', (data) => {
        console.log(data);
    })
})
