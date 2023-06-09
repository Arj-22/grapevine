import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, Alert, FlatList} from 'react-native'; 
import { getAuth, reload } from "firebase/auth";
import { getDatabase, refFromURL, onValue, child, get, set} from "firebase/database";
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage';


const ProfileContainer = ({user, otherProfile}) => {

    const [image, setImage] = useState(null);
    const [save, setSave] = useState(false)
    const [cantChangeAvatar] = useState(otherProfile); 
    const [uploading, setUploading] = useState(false); 
    const [transferred, setTransferred] = useState(0);

    const storage = getStorage();

    const db = getDatabase();  
    const userID = getAuth().currentUser.uid; 

    useEffect(()=>{
        console.log("profile container")
        setImage(user.avatar);
    }, [])  


    const uploadAvatar = async () =>{
      var deleteRef = ref(storage, user.avatar)
        deleteObject(deleteRef).then(() => {
          console.log("deleted")
        }).catch((error) => {
          console.log(error)
      });
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
              <View style={styles.saveAvatar}>
              <Text style={styles.buttonText}>Save</Text>
              </View>
            </Pressable>
        )
      }

    return (
        <View style={styles.profileTopContainer}>
            <Pressable onPress={() => {cantChangeAvatar ? null : pickImage()}}>
                <Image source={image ? {uri: image} : {uri: user.avatar}} style={styles.avatarProfile}/>
            </Pressable>
            {save ? renderSaveButton() : null }
            {uploading ? (<Text style={styles.uploadStatus}> {"Uploading " + transferred+"%"}</Text>): null}
            <Text style={styles.usernameText}>{user.username}</Text>
        </View>
    );
  }


export default ProfileContainer; 