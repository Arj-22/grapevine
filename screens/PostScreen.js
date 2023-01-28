import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, Keyboard,TouchableWithoutFeedback} from 'react-native'; 
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import {getAuth} from "firebase/auth"; 

import { getDatabase, ref, set, push} from "firebase/database";



const PostScreen = ({navigation, route }) => {

  const { uri } = route.params; 
  const [image, setImage] = useState(null);
  const [text, setText] = useState(""); 
  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 



  const handlePost = () =>{
    push(ref(db, 'posts/'), {
      image: image,
      text: text,
      userId: userID,
    }).catch((error) =>{
      console.log(error.code); 
    }).then(navigation.navigate("IndexScreen"));

  }
 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  useEffect(() => {
    if (uri != null){ 
      setImage(uri); 
    };
    navigation.setOptions({
      headerRight: () => 
      <Pressable onPress={() => { handlePost() }}>
        <FontAwesome name="send" size={30} style={styles.postScreenIcons} />
      </Pressable>
  })
  }, [route, image, text]) 


    return (
      <View style={styles.container}>
        
        <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          > 
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.containerInsidePost}>
            <TextInput style={styles.TextInputPost} 
              multiline={true} 
              placeholder='Whats on your mind...'
              value={text}
              onChangeText={(text) =>{
                  setText(text); 
              }}
              />
            <View style={styles.iconContainer}>
            <Pressable onPress={() => {pickImage()}}>
                <FontAwesome name="photo" size={38} style={styles.postScreenIcons } />
              </Pressable>
              <Pressable onPress={() => { 
                navigation.navigate("CameraScreen");
                }}>
                <MaterialIcons name="photo-camera" size={35} style={styles.postScreenIcons }/>
              </Pressable>
              
            </View>
            <View style={styles.photoContainer}>
              <Image style={styles.postImagePreview} source={{uri: image}}/>
            </View>
            
            <StatusBar style="auto" />
            </View>      
            
          </TouchableWithoutFeedback>
        </ImageBackground>
        
      </View>
    );
  }


export default PostScreen; 