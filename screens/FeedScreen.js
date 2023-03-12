import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, get} from "firebase/database";
import PostTile from '../components/PostTile';


const FeedScreen = ({navigation}) => {

  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const posts = ref(db, 'posts');
    
    onValue(posts, (snapshot) =>{
      setPosts([]);
      const data = snapshot.val();
      snapshot.forEach(child => {
        console.log("child");
        console.log(child.key);
        var key = child.key; 
        var post = {
          key: key,
          child: child.exportVal()
        }
        //child.exportVal(); 
        setPosts(posts => [post, ...posts]); 
      })
    }) 

    const userInfo = ref(db, 'users/' + userID);

    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      }})

}, []) 

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          >
              <FlatList
                data={posts}
                renderItem={({item}) =>{ 
                  return(
                    <View style={styles.containerInsideFeed}>
                      <PostTile navigation={navigation} item={item} user={user}/>
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