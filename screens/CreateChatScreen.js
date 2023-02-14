import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, push, get, onChildAdded, set, update} from "firebase/database";
import  io  from 'socket.io-client';
import { useState, useEffect } from 'react';

const CreateChatScreen = ({navigation}) => {


  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 
  const socket = io('http://192.168.1.217:3000');
  const [users, setUsers] = useState([]); 
  const [currentUsername, setCurrentUsername] = useState("");

  const createChat = (user) =>{
    const secondUser = user.id;
    const secondUsername = user.user.username; 

    const chatRef = ref(db, 'chats/');

    var chatKey = push(chatRef, {
      image: "",
      users: [currentUsername, secondUsername]
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
        setCurrentUsername(snapshot.val().username);
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
                //keyExtractor={(e) => e.userId.toString()}
                renderItem={({item}) =>{ 
                  return(
                    <View style={styles.containerInsideChats}>

                      <Pressable style={styles.chat} onPress={() =>{createChat(item)}}>
                          <View style={styles.chatHeading}>
                            <Image source={require("../assets/grape.png")} style={styles.chatAvatar}/>
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