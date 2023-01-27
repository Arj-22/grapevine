import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground} from 'react-native'; 
import { getAuth } from "firebase/auth";

const ProfileScreen = ({navigation}) => {

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