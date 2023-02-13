import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { useState, useEffect } from 'react'; 
import  io  from 'socket.io-client';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, push ,child, get, on, onChildAdded, set, query, equalTo} from "firebase/database";

// const tempChats = [
//   {
//     id: 1,
//     username: "test user 1",
//     image: require("../assets/grape.png"),
//     messages: [
//       {
//         id: "1a",
//         text: "Hello", 
//         time: "9:30",
//         username: "test user 2" 

//       },
//       {
//         id: "1b",
//         text: "Hi there", 
//         time: "9:32",
//         username: "test user 1" 

//       }
//     ]
    
//   },
//   {
//     id: 2,
//     username: "test user 2",
//     image: require("../assets/grape.png"),
//     messages: [
//       {
//         id: "2a",
//         text: "Hello mate", 
//         time: "9:35",
//         username: "test user 1" 

//       },
//       {
//         id: "2b",
//         text: "Hi", 
//         time: "9:36",
//         username: "test user 2" 

//       }
//     ]
//   },
// ]; 

const MessagesScreen  = ({navigation}) => {
  const [chats, setChats] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([]); 
  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 
  const [currentUser, setCurrentUser] = useState([]);
  const socket = io('http://192.168.1.217:3000');


  useEffect(() => {
    const chats = ref(db, 'user-chats/' + userID);

    onValue(chats, (snapshot) =>{
      setChats([]);
      console.log(snapshot.val());
      snapshot.forEach(child => {
        const chatKey = child.toJSON().chatKey; 
        //setChats(chats => [...chats, child.toJSON()]);
        console.log(chatKey);
        const chats = ref(db, 'chats/' + chatKey);
        onValue(chats, (snapshot) =>{
          console.log("snapshot");
          console.log(snapshot);
          setChats(chats => [...chats, snapshot.val()]);
          console.log("chats");
          console.log(chats);

          
        })
      })
        
      })

    // onValue(chats, (snapshot) =>{
    //   setChats([]);
    //   snapshot.forEach(child => {
    //     // const chat = {
    //     //   id: child.key,
    //     //   chat: child.toJSON()
    //     // }
    //     const chatKey = child.toJSON().chatKey; 
        
    //     const chats = ref(db, 'chats/' + chatKey);
    //     onValue(chats, (snapshot) =>{
    //       snapshot.forEach(child => {
    //         const chat = {
    //         id: child.key,
    //         chat: child.toJSON()
    //       }
    //       setChats(chats => [...chats, chat]);
    //     }
        
    //     )
        
    //   })
        
    //   })
    // }) 

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
          <Pressable style={styles.button} onPress={() => {navigation.navigate("CreateChatScreen")}}>
            <Text style={styles.buttonText}>New Chat</Text>
          </Pressable>
          <FlatList
                data={chats}
                //keyExtractor={(e) => e.userId.toString()}
                renderItem={({item}) =>{ 
                  console.log("item")
                  console.log(item);
                  //var users = item.chat.users; 
                  var staus = item.users[0] == currentUser.username; 
                  // staus ? "chat 1": "chat 2"
                  //staus ? item.chat[1]: item.chat[0]

                  //var chatName = 
                  return(
                    <View style={styles.containerInsideChats}>

                      <Pressable style={styles.chat} onPress={() =>{
                        socket.emit("open chat", item)
                        navigation.navigate("ChatScreen", {item})
                        }}>
                          <View style={styles.chatHeading}>
                            <Image source={require("../assets/grape.png")} style={styles.chatAvatar}/>
                            <Text style={styles.chatUsername}>{ staus ? item.users[1]: item.users[0]}</Text>
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