import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import { useState, useEffect } from 'react';

const ProfileScreen = ({navigation}) => {


  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 

  const [user, setUser] = useState([]); 
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const userInfo = ref(db, 'users/' + userID);

    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      }})


    const userPosts = ref(db, 'user-posts/' + userID) ;
    onValue(userPosts, (snapshot) =>{
      setPosts([]);  
      console.log(posts);    
      snapshot.forEach(child => { 
        child.exportVal(); 
        const posts = ref(db, 'posts/' + child.toJSON().postKey) ;
        get(posts).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setPosts(posts => [...posts, snapshot.val()]); 
          }}).catch()


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
          <View style={styles.containerInsideTopProfile}>
            <Text style={styles.textLabel}>Username: {user["username"]} </Text>
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
            <FlatList
              data={posts}
              //keyExtractor={(e) => e.userId.toString()}
              
              renderItem={({item}) =>{ 
                console.log(posts)
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


export default ProfileScreen; 