import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 

import Socket from '../utils/Socket';
import { useEffect, useState } from 'react';
import  io  from 'socket.io-client';
import React, { Component } from 'react';




const ChatScreen  = ({navigation}) => {
  const [message, setMessage] = useState(""); 
  const [chat, setChat] = useState([]); 
  const socket = io('http://192.168.1.217:3000');




  useEffect(() => {
    //const socket = io('http://192.168.1.217:3000');
    socket.on("message", (data) => {
        setChat(chat => [...chat, data]);
        //socket.emit("another event", { james: "I am Great"});
    })
  }, [])


  const submitMessage = () =>{
    setChat(chat => [...chat, message]); 
    setMessage(""); 
     
    socket.emit("chat message", message); 
  }

    return (
      <View style={styles.container}>
      <ImageBackground
        source={require("../assets/rm222-mind-22.jpg")}
        style={styles.background}
        >
          <View style={styles.containerInside}>
            <View style={styles.chatScreen}>
            <FlatList
                data={chat}
                //keyExtractor={(e) => e.userId.toString()}
                renderItem={({item}) =>{ 
                  //console.log(item.image); 
                  return(
                    <View style={styles.containerInsideChatScreen}>
                        <Text style={styles.message}>{item}</Text>
                    </View>
                  );
              }}
              />
            </View>

          <TextInput
                style={styles.TextInput}
                placeholder='Type Here...'
                value={message}
                onChangeText={(text) =>{
                    setMessage(text); 
                }}
            />
            <Pressable 
            style={styles.button} 
            onPress={submitMessage}
            >
            <Text style={styles.buttonText}>Send</Text>
          </Pressable>
          <StatusBar style="auto" />
          </View>       
      </ImageBackground>
    </View>
      
    
    );
  }


export default ChatScreen; 