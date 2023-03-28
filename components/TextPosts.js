import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import { useState, useEffect } from 'react';





const TextPosts = ({navigation, posts, user}) => {

    const [textPosts, setTextPosts] = useState([]); 


    const sortPosts = () =>{
        setTextPosts([]);
        posts.forEach(post => {
            console.log("Post");
            if(! post.child.hasOwnProperty("image")){
                setTextPosts(textPosts => [...textPosts, post])
            }
        });
    }

    useEffect(() =>{ 
        sortPosts(); 
    }, [posts] )


    return (
        <FlatList
            data={textPosts}
            renderItem={({item}) =>{ 
                console.log(item);
                return(
                <View style={styles.containerInsideProfileText}>
                    <Pressable onPress={() => navigation.navigate("ProfileFeedScreen", {item, user})}>
                        <Text style={styles.quotes}>{item.child.text}</Text>
                    </Pressable>
                </View>
                );
            }}
            numColumns={1}
        />
    );
  }


export default TextPosts; 