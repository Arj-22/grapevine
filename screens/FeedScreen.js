import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, get} from "firebase/database";


const FeedScreen = ({navigation}) => {

  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(""); 

  const getUsername = (id) =>{
    const userInfo = ref(db, 'users/' + id);

    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.toJSON().username);
        setUsername(snapshot.toJSON().username);
      }})
  }

  useEffect(() => {
    const posts = ref(db, 'posts');
    
    onValue(posts, (snapshot) =>{
      setPosts([]);
      const data = snapshot.val();
      snapshot.forEach(child => {
        child.exportVal(); 
        setPosts(posts => [child.toJSON(), ...posts]);
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
                data={posts}
                //keyExtractor={(e) => e.userId.toString()}
                renderItem={({item}) =>{ 
                  var hasPic = item.image != null; 
                  //console.log(item.userId);
                  //var username = getUsername(item.userId);
                  //getUsername(item.userId); 
                  return(
                    <View style={styles.containerInsideFeed}>
                      <View style={styles.post}>
                          <View style={styles.postHeading}>
                            <Image source={require("../assets/grape.png")} style={styles.avatar}/>
                            <Pressable
                            onPress={() => navigation.navigate("OtherProfileScreen", {userID: item.userId, username: item.username})}
                            >
                              <Text style={styles.username}>{item.username}</Text>
                            </Pressable>
                          </View>
                        <Text style={styles.postText}>{item.text}</Text>  
                        <Image source={{uri: item.image}} style={hasPic ? styles.postImage : null}/>
                      </View>
                    </View>
                  );
              }}
              />
            <StatusBar style="auto" />
        </ImageBackground>
      </View>
    );
  }

export default FeedScreen; 