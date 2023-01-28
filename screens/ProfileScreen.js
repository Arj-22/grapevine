import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import { useState, useEffect } from 'react';

const ProfileScreen = ({navigation}) => {


  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 

  const [user, setUser] = useState([]); 


  // useEffect(() => {
  //   const userInfo = ref(db, 'users/' + userID);

  //   get(userInfo).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       setUser(snapshot.val());
  //     }})

    
  // }, []) 

  console.log(user); 


    

    const handleSignOut = () =>{
        getAuth().signOut().then(navigation.replace("LoginScreen")); 
    }
    return (

        <View style={styles.container}>
        <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          >
            <View style={styles.containerInside}>

            <Text style={styles.textLabel}>The Grapevine!</Text>
            <Text style={styles.textLabel}>Email: {getAuth().currentUser?.email} </Text>
            <Text style={styles.textLabel}>Username: {user["username"]} </Text>
            <Pressable 
              style={styles.button} 
              onPress={handleSignOut}
              >
              <Text style={styles.buttonText}>Sign Out</Text>
            </Pressable>
            <StatusBar style="auto" />
            </View>       
        </ImageBackground>
      </View>
    );
  }


export default ProfileScreen; 