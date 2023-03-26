import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get, push, update} from "firebase/database";
import { useEffect, useState } from 'react';
import  io  from 'socket.io-client';
import { helpers } from "../utils/helpers"
import * as Notifications from 'expo-notifications';


const ChatScreen  = ({navigation, route}) => {
  const [message, setMessage] = useState(""); 
  const [chat, setChat] = useState([]); 
  const [user, setUser] = useState([]); 



  
  const userID = getAuth().currentUser.uid; 
  const db = getDatabase();
  const socket = io('http://' + helpers.ip + ":" + helpers.port);
  const {key, image, username} = route.params.item; 
  const currentUsername = user["username"];  
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes()



  useEffect(() => {

    console.log("use Effect")
    console.log('http://' + helpers.ip + helpers.port); 
    const userInfo = ref(db, 'users/' + userID);
    const chatInfo = ref(db, 'messages/' + key );

    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      }})

      get(chatInfo).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(child => { 
            setChat(chat => [child.exportVal(), ...chat]);
          })  
        }});


        socket.on("message", (data)=>{
          setChat(chat => [{
            message: data.message,
            time: data.time, 
            username: data.username
          }, ...chat]); 
        })

  }, [])

  const submitMessage = () =>{
    setMessage(""); 
    socket.emit("chat message",
    { 
      chatId: key,
      message: message,
      time: time,   
      username: currentUsername
    }); 


    push(ref(db, 'messages/' + key), 
    {
      message: message,
      time: time,
      username: currentUsername, 
    }).catch((error) =>{
      console.log(error.code); 
    })
    
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
                inverted
                //keyExtractor={(e) => e.userId.toString()}
                renderItem={({item}) =>{ 
                  var status = item.username == currentUsername;
                  //console.log(item); 
                  return(
                    <View style={styles.containerInsideChatScreen}>
                        <Text style={status ? styles.messageSent: styles.message}>{item.message}</Text>
                        <Text style={status ? styles.messageSentTime: styles.messageTime}>{item.time}</Text>
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