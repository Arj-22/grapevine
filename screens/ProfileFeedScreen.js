import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, get} from "firebase/database";
import PostTile from '../components/PostTile';


const ProfileFeedScreen = ({navigation, route}) => {

  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 
  const [posts, setPosts] = useState([]);
  const item = route.params.item;  
  const user = route.params.user;  

  console.log(route.params);

  useEffect(() => {
    setPosts([item]); 
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

export default ProfileFeedScreen; 