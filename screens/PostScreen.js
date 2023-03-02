import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, Keyboard,TouchableWithoutFeedback} from 'react-native'; 
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

import {getAuth} from "firebase/auth"; 



import { getDatabase, push, refFromURL, get} from "firebase/database";


const PostScreen = ({navigation, route }) => {

  let { uri } = route.params; 
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");  
  const [user, setUser] = useState([]); 
  const userID = getAuth().currentUser.uid; 
  const storage = getStorage();
  const db = getDatabase();  
  
  const handlePost = async () =>{

    let filename = image.substring(image.lastIndexOf('/') + 1)

    const metadata = {
      contentType: 'image/jpeg'
    };

    const response = await fetch(image);
    const blob = await response.blob();


    const storageRef = ref(storage, "posts/"+ filename);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      // switch (snapshot.state) {
      //   case 'paused':
      //     console.log('Upload is paused');
      //     break;
      //   case 'running':
      //     console.log('Upload is running');
      //     break;
      // }
    }, 
    (error) => {
      console.log(error)
    }, 
   async () => {
      await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        const postRef = refFromURL(db, "https://the-grapevine-9937b-default-rtdb.firebaseio.com/posts/");
        var postKey = push(postRef, {
          image: downloadURL,
          text: text,
          userId: userID,
          username: user["username"]
        }).key;
  
        push(refFromURL(db, 'https://the-grapevine-9937b-default-rtdb.firebaseio.com/user-posts/' + userID), {
          postKey
        }).then(navigation.navigate("IndexScreen")).catch((error) =>{
          console.log(error.code); 
        });


      });
    }
  );



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

    const userInfo = refFromURL(db, "https://the-grapevine-9937b-default-rtdb.firebaseio.com/users/" + userID);

    get(userInfo).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.toJSON())
      }})

    navigation.setOptions({
      headerRight: () => 
      <Pressable onPress={() => { handlePost()}}>
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