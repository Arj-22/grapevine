import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, Keyboard,TouchableWithoutFeedback} from 'react-native'; 
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import {getAuth} from "firebase/auth"; 

import { getDatabase, ref, set, get ,push} from "firebase/database";

//import { getStorage, uploadBytes } from "firebase/storage"; 

const PostScreen = ({navigation, route }) => {

  let { uri } = route.params; 
  const [image, setImage] = useState(null);
  const [text, setText] = useState(""); 
  const db = getDatabase();
  const userID = getAuth().currentUser.uid; 

  //const storage = getStorage();

  const [user, setUser] = useState([]); 



  const handlePost = () =>{

    // const imageRef = ref(storage, "images/"+image)

    // const storageRef = ref(storage, 'images');

    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });

    const postRef = ref(db, 'posts/'); 

    // push(ref(db, 'posts/'), {
    //   image: image,
    //   text: text,
    //   userId: userID,
    //   username: user["username"]
    // }).catch((error) =>{
    //   console.log(error.code); 
    // }).then(navigation.navigate("IndexScreen"));

    var postKey = push(postRef, {
      image: image,
      text: text,
      userId: userID,
      username: user["username"]
    }).key; 

    push(ref(db, 'user-posts/' + userID), {
      postKey
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

    if (!result.canceled) {
      route.params.uri = null;
      setImage(result.assets[0].uri);
    }
  }

  useEffect(() => {
    if (uri != null){ 
      setImage(uri); 
    };

    const userInfo = ref(db, 'users/' + userID);

    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      }})

    navigation.setOptions({
      headerRight: () => 
      <Pressable onPress={() => { handlePost() }}>
        <FontAwesome name="send" size={30} style={styles.postScreenIcons} />
      </Pressable>
  })
  }, [image, route, text]) 


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