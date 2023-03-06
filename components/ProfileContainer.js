import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, Alert, FlatList} from 'react-native'; 
import { getAuth, reload } from "firebase/auth";
import { getDatabase, refFromURL, onValue, child, get, set} from "firebase/database";
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';


const ProfileContainer = ({user}) => {

    const [image, setImage] = useState(null);
    const [save, setSave] = useState(false)
    const [uploading, setUploading] = useState(false); 
    const [transferred, setTransferred] = useState(0);

    const storage = getStorage();

    const db = getDatabase();  
    const userID = getAuth().currentUser.uid; 
    //setImage(user.avatar);

    useEffect(()=>{
        console.log("profile container")
        setImage(user.avatar);
    }, [])  

    console.log("user"); 
    console.log(user); 

    const uploadAvatar = async () =>{
        if (image != null ){
          let filename = image.substring(image.lastIndexOf('/') + 1)
    
          const metadata = {
            contentType: 'image/jpeg'
          };
    
          let response = await fetch(image);
          let blob = await response.blob();
    
          setUploading(true)
          const storageRef = ref(storage, "avatars/"+ filename);
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
                  setSave(false); 
    
                }).catch((e) =>{
                  console.log(e); 
                });
          });
        }catch(error){  
          console.log(error);
        }
    
        }else{
        //   const postRef = refFromURL(db, "https://the-grapevine-9937b-default-rtdb.firebaseio.com/users/");
        //   var postKey = push(postRef, {
        //     image: null,
        //     text: text,
        //     userId: userID,
        //     username: user["username"]
        //   }).key;
      
        //   push(refFromURL(db, 'https://the-grapevine-9937b-default-rtdb.firebaseio.com/user-posts/' + userID), {
        //     postKey
        //   }).then(navigation.navigate("IndexScreen")).catch((error) =>{
        //     console.log(error.code); 
        //   });
        }
      };


    const post = (downloadURL) =>{
        const postRef = refFromURL(db, "https://the-grapevine-9937b-default-rtdb.firebaseio.com/users/" + userID + "/avatar");
        set(postRef, downloadURL);
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0,
        });
    
        if(!result.canceled) {
          setImage(result.assets[0].uri)
          setSave(true);
        }
        
      }

      const renderSaveButton = () =>{
        return (
            <Pressable onPress={() => uploadAvatar()}>
                <Text>Save</Text>
            </Pressable>
        )
      }

    return (
        <View style={styles.profileTopContainer}>
            <Pressable onPress={() => {pickImage()}}>
                <Image source={image ? {uri: image} : {uri: user.avatar}} style={styles.avatarProfile}/>
            </Pressable>
            {save ? renderSaveButton() : null }
            <Text style={styles.usernameText}>{user.username}</Text>
        </View>
    );
  }


export default ProfileContainer; 