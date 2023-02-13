const express = require("express");
const app = express(); 
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;


var activeChats = []; 


server.listen(port, () => {
    console.log("Server is running on port " + port);
});

io.on('connection', (socket) => {

    console.log("connected"); 
    
    // socket.on('new user', (newUserId) =>{
    //     if(!activeUsers.some((user) => user.userId === newUserId)){
    //         activeUsers.push({
    //             userId: newUserId, 
    //             socket: socket.id
    //         })
    //     }
    // console.log('connected users', activeUsers);
    // io.emit('get users', activeUsers); 
    // })
    //socket.emit('chats', activeChats);

    socket.on('chat message', (data) => {
        // console.log("message");
        // console.log(activeChats);
        // console.log(data);
        // if(activeChats.find(item => item.id === data.chatId)){
        //     console.log("chat in array");
        //     var currentChat = activeChats.find(item => item.id === data.chatId)
        //     currentChat.messages.push({
        //         message: data.message,
        //         time: data.time,
        //         username: data.username
        //     });

        //     console.log(activeChats);
        // }
        io.emit("message", data)

    });

    socket.on('chat created', (data)=>{
        console.log("chat created")
        activeChats.push(data); 
        console.log(activeChats);
        io.emit("chats", activeChats);
        
    })



    socket.on('open chat', (data)=>{
        console.log("opened chat")
        var currentChat = activeChats.find(item => item.id === data.chatId)
        if(currentChat){
            //activeChats.push(data); 
            //io.emit(currentChat); 
        }
        console.log(activeChats)
    })

    socket.on('disconnect', () =>{
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("user disconnected", activeUsers);
        io.emit('get users', activeUsers); 
    });

})

console.log(activeChats); 





        // if(activeChats.find(item => item.id === data.chatId)){
        //     console.log("chat in array")
        //     var currentChat = activeChats.find(item => item.id === data.chatId)
        //     if(!currentChat.chat['messages']){
        //         currentChat.chat['messages'] = []; 
        //         currentChat.chat['messages'].push({
        //             message: data.message,
        //             time: data.time,
        //             username: data.username
        //         });
                
        //     }else{
        //         currentChat.chat['messages'].push({
        //             message: data.message,
        //             time: data.time,
        //             username: data.username
        //         });
        //         console.log(currentChat.chat['messages']); 
        //     }
    
        // }   