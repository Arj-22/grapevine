import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get, push, update} from "firebase/database";
import { useEffect, useState } from 'react';


const CommentsScreen  = ({navigation, route}) => {
  const [comment, setComment] = useState(""); 
  const [comments, setComments] = useState([]); 
  const [user, setUser] = useState([]); 
  const userID = getAuth().currentUser.uid; 
  const db = getDatabase();
  const key = route.params.item.key;  
  
  const currentUsername = user["username"];  
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes()
  const userInfo = ref(db, 'users/' + userID);
  const commentsRef = ref(db, 'post-comments/' + key );

  useEffect(() => {

    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      }})

    onValue(commentsRef, (snapshot) =>{
        setComments([]);
        const data = snapshot.val();
        snapshot.forEach(child => {
          setComments(comments => [child.exportVal(), ...comments]); 
        })
      }) 

  }, [])

  const submitComment = () =>{

    push(commentsRef, {
        userId: userID,
        comment: comment,
        username: currentUsername,
        time: time,
    }).catch((error) =>{
        console.log(error.code); 
    });
    setComment("");
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
                data={comments}
                inverted
                renderItem={({item}) =>{ 
                  var status = item.username == currentUsername;
                  return(
                    <View style={styles.containerInsideChatScreen}>
                        <Text style={status ? styles.messageSent: styles.message}>{item.comment}</Text>
                        <Text style={status ? styles.messageSentTime: styles.messageTime}>{item.username + " " + item.time}</Text>
                    </View>
                  );
              }}
              />
            </View>

          <TextInput
                style={styles.TextInput}
                placeholder='Type Here...'
                value={comment}
                onChangeText={(text) =>{
                    setComment(text); 
                }}
            />
            <Pressable 
            style={styles.button} 
            onPress={submitComment}
            >
            <Text style={styles.buttonText}>Send</Text>
          </Pressable>
          <StatusBar style="auto" />
          </View>       
      </ImageBackground>
    </View>
      
    );
  }

export default CommentsScreen; 