import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import { useState, useEffect } from 'react';
import ProfileContainer from '../components/ProfileContainer';
import ImagePosts from '../components/ImagePosts';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TextPosts from '../components/TextPosts';


const ProfileScreen = ({navigation}) => {


  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 

  const [user, setUser] = useState([]); 
  const [posts, setPosts] = useState([]);

  const [followers, setFollowers] = useState([]); 
  const [following, setFollowing] = useState([]); 

  const followersRef = ref(db, "followers/" + userID);
  const followingRef = ref(db, "following/" + userID);

  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    const userInfo = ref(db, 'users/' + userID);

    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      }})


    const userPosts = ref(db, 'user-posts/' + userID) ;
    onValue(userPosts, (snapshot) =>{
      setPosts([]);   
      snapshot.forEach(child => { 
        const posts = ref(db, 'posts/' + child.toJSON().postKey) ;
        get(posts).then((snapshot) => {
          if (snapshot.exists()) {
            var post = {
              key: child.toJSON().postKey,
              child: snapshot.val()
            }
            setPosts(posts => [...posts, post]); 
          }}).catch()
      })
    })

    onValue(followersRef, (snapshot) =>{
      const data = snapshot.val();
      console.log(data);
      setFollowers([]); 
      snapshot.forEach(child => {
        setFollowers(followers => [...followers, child.exportVal()])
      })
    }) 
    onValue(followingRef, (snapshot) =>{
      const data = snapshot.val();
      console.log(data);
      setFollowing([]); 
      snapshot.forEach(child => {
        setFollowing(following => [...following, child.exportVal()]);
      })
    }) 
    console.log(posts)
  }, [])

    const handleSignOut = () =>{
        getAuth().signOut().then(navigation.replace("LoginScreen")); 
    }


    return (
        <View style={styles.container}>
        <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          >
          <ProfileContainer user={user} />
          <View style={styles.containerInsideTopProfile}>
            <View style={styles.profileInfo}>
              <Pressable onPress={() => {navigation.navigate("FollowersScreen", {userID: userID})}}>
                <Text style={styles.textLabel}>Followers: {followers.length} </Text>
              </Pressable>
              <Pressable onPress={() => {navigation.navigate("FollowingScreen", {userID: userID})}}>
              <Text style={styles.textLabel}>Following: {following.length} </Text>
              </Pressable>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable 
                style={styles.button} 
                onPress={handleSignOut}
                >
                <Text style={styles.buttonText}>Sign Out</Text>
              </Pressable>
            </View>

            <StatusBar style="auto" />
            </View>  
            <Tab.Navigator>
              <Tab.Screen name='Pictures' 
                children={() =>{
                  return(
                    <ImagePosts navigation={navigation} posts={posts} user={user}/>     
                  )
              }}
              />
              <Tab.Screen name='Quotes'                 
                children={() =>{
                  return(
                    <TextPosts navigation={navigation} posts={posts} user={user}/>     
                  )
              }}/>
            </Tab.Navigator>
        </ImageBackground>
      </View>
    );
  }


export default ProfileScreen; 