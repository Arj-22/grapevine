import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import { useState, useEffect } from 'react';





const TextPosts = ({navigation, posts, user}) => {

    console.log("props")
    //console.log(posts);
    console.log(posts);

    //console.log(props)
    // const posts = props

    const [tab, setTab] = useState(true); 
    //const [imagePosts, setImagePosts] = useState([]); 
    const [textPosts, setTextPosts] = useState([]); 


    const sortPosts = () =>{
        setTextPosts([]);
        posts.forEach(post => {
            console.log("Post");
            //console.log(post.hasOwnProperty("image"));
            if(! post.hasOwnProperty("image")){
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
                        <Text style={styles.quotes}>{item.text}</Text>
                    </Pressable>
                </View>
                );
            }}
            numColumns={1}
        />
    );
  }


export default TextPosts; 