import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Text, View, TextInput, Alert, Pressable, Image, ImageBackground, Keyboard,TouchableWithoutFeedback} from 'react-native'; 
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
  const [uploading, setUploading] = useState(false); 
  const [transferred, setTransferred] = useState(0);

  const userID = getAuth().currentUser.uid; 
  const storage = getStorage();
  const db = getDatabase();  


  const uploadPost = async () =>{
    if (image != null ){
      
      let filename = image.substring(image.lastIndexOf('/') + 1)

      const metadata = {
        contentType: 'image/jpeg'
      };

      let response = await fetch(image);
      let blob = await response.blob();

      setUploading(true)
      const storageRef = ref(storage, "posts/"+ filename);
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
      try{
          uploadTask.on("state_changed", (snapshot) =>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setTransferred(Math.ceil(progress)); 
            

          }, (error) =>{
            console.log(error.code); 
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.log(error); 
                break;
              case 'storage/canceled':
                // User canceled the upload
                console.log(error); 
                break;
        
              // ...
        
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                console.log(error.serverResponse); 
                break;
            }
          }, () =>{
            setUploading(false)
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              post(downloadURL);

            }).catch((e) =>{
              console.log(e); 
            });
      });
    }catch(error){
      console.log(error);
    }

    }else{
      const postRef = refFromURL(db, "https://the-grapevine-9937b-default-rtdb.firebaseio.com/posts/");
      var postKey = push(postRef, {
        image: null,
        text: text,
        userId: userID,
        username: user["username"]
      }).key;
  
      push(refFromURL(db, 'https://the-grapevine-9937b-default-rtdb.firebaseio.com/user-posts/' + userID), {
        postKey
      }).then(navigation.navigate("IndexScreen")).catch((error) =>{
        console.log(error.code); 
      });
    }
  };


  const post = (downloadURL) =>{
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
  }



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
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
      //change onPress function to uploadPost() when storage is not past limit
      <Pressable onPress={() => { uploadPost()}}>
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
              {uploading ? (<Text style={styles.uploadStatus}> {"Uploading " + transferred+"%"}</Text>): null}
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