import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get, on, onChildAdded} from "firebase/database";




tempPosts = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
    image: require("../assets/grape.png"),
    username: "test user 1"
  },
  {
    id: 2,
    text: "This is post 2",
    image: require("../assets/grape.png"),
    username: "test user 2"
  },
  {
    id: 3,
    text: "This is post 3", 
    image: require("../assets/grape.png"),
    username: "test user 3"
  }
]; 

const FeedScreen = ({navigation}) => {

  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = ref(db, 'posts');

    onValue(posts, (snapshot) =>{
      const tempPost = []; 
      const data = snapshot.val();
      snapshot.forEach(child => {
        child.exportVal(); 
        
        tempPost.push(child.toJSON());

      })
      setPosts(tempPost)
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
                  return(
                    <View style={styles.containerInsideFeed}>
                      <View style={styles.post}>
                          <View style={styles.postHeading}>
                            <Image source={require("../assets/grape.png")} style={styles.avatar}/>
                            <Text style={styles.username}>{item.username}</Text>
                          </View>
                        <Text style={styles.postText}>{item.text}</Text>  
                        <Image source={item.image} style={styles.postImage}/>
                        
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