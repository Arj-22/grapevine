import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, push, get, onChildAdded, set, update} from "firebase/database";
import  io  from 'socket.io-client';
import { useState, useEffect } from 'react';
import {helpers} from "../utils/helpers"; 

const CreateChatScreen = ({navigation}) => {

  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 
  const socket = io('http://' + helpers.ip + ":" + helpers.port);
  const [users, setUsers] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);

  const createChat = (user) =>{

    console.log(user);
    const secondUser = user.id;
    const secondUsername = user.user.username; 

    const chatRef = ref(db, 'chats/');

    var chatKey = push(chatRef, {
      image: "",
      users: [currentUser.username, secondUsername],
      avatars: [currentUser.avatar, user.user.avatar]
    }).key; 

    const userChatRef1 = ref(db, "user-chats/" + userID )
    push(userChatRef1, {
      chatKey
    });
    const userChatRef2 = ref(db, "user-chats/" + secondUser)
    push(userChatRef2, {
      chatKey
    });
    navigation.navigate("IndexScreen");
  }

  useEffect(() => {
    const userInfo = ref(db, 'users/' + userID);
    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setCurrentUser(snapshot.val());
      }})

    const users = ref(db, 'users');
    setUsers([]);
    onValue(users, (snapshot) =>{
      const data = snapshot.val();
      snapshot.forEach(child => { 
        const user = {
          id: child.key,
          user: child.toJSON()
        }
        setUsers(users => [...users, user]);
      })
    }) 

  }, []) 
  
    return (
        <View style={styles.container}>
        <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          >
            <FlatList
                data={users}
                renderItem={({item}) =>{ 
                  return(
                    <View style={styles.containerInsideChats}>
                      <Pressable style={styles.chat} onPress={() =>{createChat(item)}}>
                          <View style={styles.chatHeading}>
                            <Image source={{uri: item.user.avatar}} style={styles.chatAvatar}/>
                            <Text style={styles.chatUsername}>{item.user.username}</Text>
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
export default CreateChatScreen; 