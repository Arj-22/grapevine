import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, Keyboard,TouchableWithoutFeedback} from 'react-native'; 
import { useEffect, useState } from 'react';

import { Camera } from "expo-camera"; 

const PostScreen = ({navigation, route }) => {

  const { uri } = route.params; 

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => 
      <Pressable onPress={() => { navigation.navigate("IndexScreen")}}>
        <FontAwesome name="send" size={30} style={styles.postScreenIcons} />
      </Pressable>
  })
  }, []) 


    return (
      <View style={styles.container}>
        
        <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          > 
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.containerInsidePost}>
            <TextInput style={styles.TextInputPost} multiline={true} placeholder='Whats on your mind...'>
            </TextInput>
            <View style={styles.iconContainer}>
              <Pressable onPress={() => {navigation.navigate("CameraScreen")}}>
                <MaterialIcons name="photo-camera" size={35} style={styles.postScreenIcons }/>
              </Pressable>
            </View>
            <View style={styles.photoContainer}>
              <Image style={styles.postImagePreview} source={{uri: uri}}/>
            </View>
            
            <StatusBar style="auto" />
            </View>      
            
          </TouchableWithoutFeedback>
        </ImageBackground>
        
      </View>
    );
  }


export default PostScreen; 