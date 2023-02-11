import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 

import { useState } from 'react';


tempChats = [
  {
    id: 1,
    text: "chat 1",
    image: require("../assets/grape.png"),
    username: "test user 1"
  },
  {
    id: 2,
    text: "chat 2",
    image: require("../assets/grape.png"),
    username: "test user 2"
  },
  {
    id: 3,
    text: "chat 3",
    image: require("../assets/grape.png"),
    username: "test user 3"
  }
]; 




const MessagesScreen  = ({navigation}) => {
  const [chats, setChats] = useState(tempChats)
    return (
      <View style={styles.container}>
      <ImageBackground
        source={require("../assets/rm222-mind-22.jpg")}
        style={styles.background}
        >
          <FlatList
                data={chats}
                //keyExtractor={(e) => e.userId.toString()}
                renderItem={({item}) =>{ 
                  //console.log(item.image); 
                  return(
                    <View style={styles.containerInsideChats}>
                      <Pressable style={styles.chat} onPress={() =>{navigation.navigate("ChatScreen")}}>
                          <View style={styles.chatHeading}>
                            <Image source={require("../assets/grape.png")} style={styles.chatAvatar}/>
                            <Text style={styles.chatUsername}>{item.username}</Text>
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