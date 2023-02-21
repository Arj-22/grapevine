import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get, push, set, remove} from "firebase/database";
import { useState, useEffect } from 'react';

const OtherProfileScreen = ({navigation, route}) => {

  const db = getDatabase();
  const currentUserID = getAuth().currentUser.uid;
  const {userID, username } = route.params; 
  const [user, setUser] = useState([]); 
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]); 
  const [following, setFollwing] = useState([]); 

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
        child.exportVal(); 
        const posts = ref(db, 'posts/' + child.toJSON().postKey) ;
        get(posts).then((snapshot) => {
          if (snapshot.exists()) {
            setPosts(posts => [...posts, snapshot.val()]); 
          }}).catch((error) => {
            console.error(error);
          })
      })      
    })
    navigation.setOptions({
      title: username
  })

  const followersRef = ref(db, "followers/" + userID);
  
  onValue(followersRef, (snapshot) =>{
    const data = snapshot.val();
    console.log(data);
    setFollowers([]); 
    snapshot.forEach(child => {
      setFollowers(followers => [...followers, child.exportVal()])
    })
    
  }) 
  const followingRef = ref(db, "following/" + userID);
  onValue(followingRef, (snapshot) =>{
    const data = snapshot.val();
    console.log(data);
    setFollwing([]); 
    snapshot.forEach(child => {
      setFollwing(following => [...following, child.exportVal()])
    })
    
  }) 

  }, [])

    const FollowUser = () =>{
        const followersRef = ref(db, "followers/" + userID)
        push(followersRef, {followerId: currentUserID}); 

        const followingRef = ref(db, "following/" + currentUserID);
        push(followingRef, {followingId: userID}); 
    }

    const unFollowUser = () =>{
      const followersRef = ref(db, "followers/" + userID)
      remove(followersRef, {followerId: currentUserID}); 

      const followingRef = ref(db, "following/" + currentUserID);
      remove(followingRef, {followingId: userID}); 
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
            <FlatList
              data={posts}
              //keyExtractor={(e) => e.userId.toString()}
              renderItem={({item}) =>{ 
                //console.log(posts)
                var hasPic = item.image != null; 
                return(
                  <View style={styles.containerInsideProfile}>
                    <View style={styles.postProfile}>
                        {/* <View style={styles.postHeadingProfile}>
                          <Image source={require("../assets/grape.png")} style={styles.avatar}/>
                          <Text style={styles.username}>{item.username}</Text>
                        </View> */}
                      <Text style={styles.postProfileText}>{item.text}</Text>  
                      <Image source={{uri: item.image}} style={hasPic ? styles.postProfileImage : null}/>
                    </View>
                  </View>
                );
              }}
              numColumns={2}
            />
        </ImageBackground>
      </View>
    );
  }
export default OtherProfileScreen; 