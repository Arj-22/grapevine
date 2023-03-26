import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import { useState, useEffect } from 'react';





const ImagePosts = ({navigation, posts, user}) => {

    const [tab, setTab] = useState(true); 
    const [imagePosts, setImagePosts] = useState([]); 


    const sortPosts = () =>{
        setImagePosts([]);
        posts.forEach(post => {
            if(post.child.hasOwnProperty("image")){
                setImagePosts(imagePosts => [...imagePosts, post])
            }
        });
    }
    useEffect(() =>{ 
        sortPosts(); 
    }, [posts] )


    return (
        <FlatList
            data={imagePosts}
            renderItem={({item}) =>{ 
                console.log(item);
                var hasText = item.child.text != ""; 
                return(
                <View style={styles.containerInsideProfile}>
                    <Pressable onPress={() => navigation.navigate("ProfileFeedScreen", {item, user})}>
                        <View style={styles.postProfile}>
                            <Image source={{uri: item.child.image}} style={styles.postProfileImage}/>
                        </View>
                    </Pressable>
                </View>
                );
            }}
            numColumns={2}
        />
    );
  }


export default ImagePosts; 