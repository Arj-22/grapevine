import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground} from 'react-native'; 
import { Entypo } from '@expo/vector-icons';

import { useEffect, useState } from 'react';

import { Camera } from "expo-camera"; 
const CameraScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null); 
    const getPermission = async () =>{
     const { status } = await Camera.requestCameraPermissionsAsync(); 
     setHasPermission( status === 'granted'); 
    }; 
    useEffect(() =>{
        getPermission(); 
    }, [])
   
    if(hasPermission === null){
        return <Text>Awaiting Permission</Text>
    }
    if(hasPermission === false){
        return <Text>Permission Denied</Text>
    }

    let camera; 
    const getPicture = async () =>{
        if(camera){
            const photo = await camera.takePictureAsync(); 
            navigation.navigate("PostScreen",{uri: photo.uri}); 
        }
    }
    return (

      <View style={styles.container}>
            <Camera style={styles.camera} ref={(ref) => {camera = ref}}> 
                <Pressable onPress={() =>{getPicture()}}>
                    <Entypo name="circle" size={60} color="white" style={styles.cameraButton} />
                </Pressable>
            </Camera>   
      </View>
    );
  }


export default CameraScreen; 