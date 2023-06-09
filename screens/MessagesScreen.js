import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { useState, useEffect } from 'react'; 
import  io  from 'socket.io-client';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, get} from "firebase/database";
import { helpers }  from "../utils/helpers"

const MessagesScreen  = ({navigation}) => {
  const [chats, setChats] = useState([])
  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 
  const [currentUser, setCurrentUser] = useState([]);
  const socket = io('http://' + helpers.ip + ":" + helpers.port);

  useEffect(() => {
    const chats = ref(db, 'user-chats/' + userID);

    onValue(chats, (snapshot) =>{
      setChats([]);
      snapshot.forEach(child => {
        const chatKey = child.toJSON().chatKey; 
        const chats = ref(db, 'chats/' + chatKey);
        onValue(chats, (snapshot) =>{
          setChats(chats => [...chats, {
            key: chatKey,
            chat: snapshot.val(),
          }]);
        })
      })
      })

    const userInfo = ref(db, 'users/' + userID);

    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setCurrentUser(snapshot.val());
      }})

  }, []) 

    return (
      <View style={styles.container}>
      <ImageBackground
        source={require("../assets/rm222-mind-22.jpg")}
        style={styles.background}
        > 
          <Pressable style={styles.newChatButton} onPress={() => {navigation.navigate("CreateChatScreen")}}>
            <Text style={styles.buttonText}>New Chat</Text>
          </Pressable>
          <FlatList 
                data={chats}
                renderItem={({item}) =>{ 
                  var status = item.chat.users[0] == currentUser.username;
                  console.log(item.chat.avatars[0]); 
                  console.log(currentUser.avatar); 
                  return(
                    <View style={styles.containerInsideChats}>
                      <Pressable style={styles.chat} onPress={() =>{
                        socket.emit("open chat", item)
                        navigation.navigate("ChatScreen", {item})
                        }}>
                          <View style={styles.chatHeading}>
                            <Image source={status ? {uri :item.chat.avatars[1]} : {uri: item.chat.avatars[0]}} style={styles.chatAvatar}/>
                            <Text style={styles.chatUsername}>{ status ? item.chat.users[1]: item.chat.users[0]}</Text>
                          </View>
                      </Pressable>
                      
                    </View>
                  );
              }}
              />
          <StatusBar style="auto" />     
      </ImageBackground>
    </View>
      
    );
  }


export default MessagesScreen; 