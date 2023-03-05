import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import { useState, useEffect } from 'react';





const ImagePostScreen = ({posts}) => {

    const [tab, setTab] = useState(true); 
    const [imagePosts, setImagePosts] = useState([]); 
   // const [textPosts, setTextPosts] = useState([]); 

    const sortPosts = () =>{
        setImagePosts([]);
        posts.forEach(post => {
            console.log("Post");
            //console.log(post.hasOwnProperty("image"));
            if(post.hasOwnProperty("image")){
                setImagePosts(imagePosts => [...imagePosts, post])
            }
        });
    }

    useEffect(() =>{ 
        sortPosts(); 
    }, [] )

    return (
        <FlatList
            data={imagePosts}
            renderItem={({item}) =>{ 
                var hasPic = item.image != ""; 
                return(
                <View style={styles.containerInsideProfile}>
                    <View style={styles.postProfile}>
                    <Text style={styles.postProfileText}>{item.text}</Text>  
                    <Image source={hasPic ? {uri: item.image} : null} style={hasPic ? styles.postProfileImage : null}/>
                    </View>
                </View>
                );

            }}
            numColumns={2}
        />
    );
  }


export default ImagePostScreen; 