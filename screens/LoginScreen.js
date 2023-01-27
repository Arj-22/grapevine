import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground} from 'react-native'; 
import app from '../firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from 'react';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(""); 
    const auth = getAuth(app)


    useEffect(() =>{
      const unsubscribe = auth.onAuthStateChanged(user =>{
        if(user){
          navigation.replace("IndexScreen"); 
        }
      })
      return unsubscribe; 
    }, [])

    handleLogin = () =>{
      signInWithEmailAndPassword(auth, email, password).then((userCredentials) =>{
        const user = userCredentials.user; 
        console.log(user.email); 
      }).catch((error) =>{
        console.log(error.code); 
        setError("Invalid Login Details"); 
      })
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

          <Text style={styles.greeting}>Welcome to the Grapevine!</Text>
          <Text style={styles.error}>{error}</Text>

          
          <View style={styles.form}>
            <TextInput
                style={styles.TextInput}
                placeholder='Email'
                value={email}
                onChangeText={(text) =>{
                    setEmail(text); 
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
            onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Text style={styles.textLabel}>New to the Grapevine?</Text>
          <Button title={"Sign Up"} onPress={()=>{
            navigation.navigate("SignUp")
            }}/>
          <StatusBar style="auto" />
          </View>
        </ImageBackground>
        
      </View>
    );
  }


export default LoginScreen; 