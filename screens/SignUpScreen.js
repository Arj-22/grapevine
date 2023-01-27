import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Pressable, Image ,ImageBackground} from 'react-native'; 
import app from '../firebase';

import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"; 


import { useState, useEffect} from 'react';




const SignUp = ({navigation}) => {

    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(""); 
    const auth = getAuth(app)

    useEffect(() =>{
      const unsubscribe = auth.onAuthStateChanged(user =>{
        if(user){
          navigation.replace("HomeScreen"); 
        }
      })
      return unsubscribe; 
    }, [])


    const handleSignUp = ()=>{
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) =>{
        const user = userCredential.user; 
        console.log(user.email); 
      }).catch((error) =>{
        console.log(error.code); 
        setError("Form not filled out correctly"); 
      }); 
    }


    return (
      <View style={styles.container}>
        
          <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          >
          <View style={styles.containerInside}>
          <Image
            source={require("../assets/grape.png")}
            style={styles.icon}
            >

          </Image>

          <Text style={styles.greeting}>The Grapevine!</Text>
          <Text style={styles.error}>{error}</Text>
          <View style={styles.form}>
          <TextInput
                style={styles.TextInput}
                placeholder='First Name'
                value={firstName}
                onChangeText={(text) =>{
                  setFirstName(text); 
                }}
            />
            <TextInput
                style={styles.TextInput}
                placeholder='Last Name'
                value={lastName}
                onChangeText={(text) =>{
                  setLastName(text); 
                }}
            />
            <TextInput
                style={styles.TextInput}
                placeholder='Email Address'
                value={email}
                onChangeText={(text) =>{
                  setEmail(text); 
                }}
            />
            <TextInput
                style={styles.TextInput}
                placeholder='Username'
                value={username}
                onChangeText={(text) =>{
                    setUsername(text); 
                }}
            />
            <TextInput
                style={styles.TextInput}
                placeholder='Password'
                secureTextEntry
                value={password}
                onChangeText={(text) =>{
                    setPassword(text); 
                }}
            />
          </View>
          <Pressable 
            style={styles.button} 
            onPress={() => {
              handleSignUp();
              navigation.replace("HomeScreen")
              }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <StatusBar style="auto" />
          </View>
          </ImageBackground>
        
      </View>
    );
  }


export default SignUp; 