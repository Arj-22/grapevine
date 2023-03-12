import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get, push, set, remove, off} from "firebase/database";
import { useState, useEffect } from 'react';
import ProfileContainer from '../components/ProfileContainer';
import ImagePosts from '../components/ImagePosts';
import TextPosts from '../components/TextPosts';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const OtherProfileScreen = ({navigation, route}) => {

  const db = getDatabase();
  const currentUserID = getAuth().currentUser.uid;
  const {userID, username } = route.params; 
  const [user, setUser] = useState([]); 
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]); 
  const [following, setFollowing] = useState([]); 

  const userInfo = ref(db, 'users/' + userID);
  const userPosts = ref(db, 'user-posts/' + userID);

  const followersRef = ref(db, "followers/" + userID);
  const followingRef = ref(db, "following/" + userID);

  const currentFollowingRef = ref(db, "following/" + currentUserID);

  const Tab = createMaterialTopTabNavigator();


  useEffect(() => {
    
    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      }})
      
    onValue(userPosts, (snapshot) =>{
      setPosts([]);  
      snapshot.forEach(child => { 
        child.exportVal(); 
        const posts = ref(db, 'posts/' + child.toJSON().postKey) ;
        get(posts).then((snapshot) => {
          if (snapshot.exists()) {
            var post = {
              key:  child.toJSON().postKey,
              child: snapshot.val()
            }
            setPosts(posts => [...posts, post]); 
          }}).catch((error) => {
            console.error(error);
          })
      })      
    })
    navigation.setOptions({
      title: username
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
      setFollowing(following => [...following, child.exportVal()])
    })
  }) 
  }, [])

    const FollowUser = () =>{
        push(followersRef, {followerId: currentUserID}); 
        push(currentFollowingRef, {followingId: userID}); 
    }

    const unFollowUser = () =>{

      get(followersRef).then((snapshot)=>{
        snapshot.forEach(child =>{
          if(child.toJSON().followerId == currentUserID){
            const followersToRemoveRef = ref(db, "followers/" + userID +"/"+ child.key);
            remove(followersToRemoveRef, {followerId: currentUserID});
            console.log(child.key);
            console.log(child.toJSON().followerId);
          }
        }).catch((error)=>{
          console.log(error); 
        })
      });

      get(currentFollowingRef).then((snapshot)=>{
        snapshot.forEach(child =>{
          console.log("Current Following child");
          console.log(child.toJSON().followingId);
          if(child.toJSON().followingId == userID){
            const followersToRemoveRef = ref(db, "following/" + currentUserID +"/"+ child.key);
            remove(followersToRemoveRef, {followingId: userID});
            console.log(child.key);
            console.log(child.toJSON().followerId);
          }
        }).catch((error)=>{
          console.log(error); 
        })

      });
    }

    const isFollowing = () =>{
      const found = followers.find(element => element.followerId == currentUserID);
      if(found){
        return true;
      }
      else{
        console.log("Not found")
        return false; 
      }
    }
    return (

        <View style={styles.container}>
        <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          >
          <ProfileContainer user={user}/>
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
                onPress={isFollowing() ? unFollowUser: FollowUser}
                >
                <Text style={styles.buttonText}>{isFollowing() ?  "Following" : "Follow"}</Text>
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
export default OtherProfileScreen; 