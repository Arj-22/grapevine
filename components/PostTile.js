import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get, push, remove} from "firebase/database";
import { useState, useEffect } from 'react';


const PostTile = ({navigation, item, user}) => {

    const hasPic = item.child.image != null; 
    const hasText = item.child.text != ""; 

    const [liked, setLiked] = useState(false); 
    const db = getDatabase(); 

    const [postUser, setPostUser] = useState([]); 
    const currentUserID = getAuth().currentUser.uid;

    const likeRef = ref(db, "likes/" + item.key)

    const showText = (hasText, item) =>{
        console.log(hasText);
        if(hasText){
            return(
                <Text style={styles.postText}>{item.child.text}</Text> 
            )
        }
    }

    console.log(user);

    
    useEffect(()=>{
        const userInfo = ref(db, 'users/' + item.child.userId);
        get(userInfo).then((snapshot) => {
            if (snapshot.exists()) {
                setPostUser(snapshot.val());
            }})
    }, [])



    const handleLike = () =>{
        if(liked == true){
            setLiked(false);
            //push(likeRef, {likedBy: currentUserID}); 
            //push(currentFollowingRef, {followingId: userID}); 
            remove(likeRef,{likedBy: currentUserID});
        }else if(liked == false){
            setLiked(true)
            push(likeRef, {likedBy: currentUserID}); 
        }
        
    }


    return (
        <View style={styles.post}>
            <View style={styles.postHeading}>
            <Image source={{uri: postUser.avatar}} style={styles.avatar}/>
            <Pressable
            onPress={() => navigation.navigate("OtherProfileScreen", {userID: item.child.userId, username: item.child.username})}
            >
                <Text style={styles.username}>{item.child.username}</Text>
            </Pressable>
            </View>
        <Image source={{uri: item.child.image}} style={hasPic ? styles.postImage : null}/>
        {showText(hasText, item)}
        <View style={styles.postBottom}>
            <Pressable onPress={ () =>  handleLike()}>
                <AntDesign name={liked ? "heart": "hearto"} size={30} color="black" style={{paddingRight: 15}}/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("CommentsScreen", {item})}>
                <AntDesign name="message1" size={30} color="black" />
            </Pressable>
        
        </View>
    </View>
    );
  }


export default PostTile; 