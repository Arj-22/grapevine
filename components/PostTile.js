import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList, RefreshControl} from 'react-native'; 
import { AntDesign } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get, push, remove, set, orderByChild} from "firebase/database";
import { useState, useEffect } from 'react';


const PostTile = ({navigation, item, user}) => {

    const hasPic = item.child.image != null; 
    const hasText = item.child.text != ""; 

    const [liked, setLiked] = useState(false); 
    const [likes, setLikes] = useState([]); 
    const db = getDatabase(); 

    const [postUser, setPostUser] = useState([]); 
    const currentUserID = getAuth().currentUser.uid;

    const likeRef = ref(db, "likes/" + item.key)

    const postRef = ref(db, "posts/" + item.key)

    const showText = (hasText, item) =>{
        console.log(hasText);
        if(hasText){
            return(
                <Text style={styles.postText}>{item.child.text}</Text> 
            )
        }
    }

    const showLikes = () =>{
        if(likes.length == 1){
            return(
                <Text style={styles.likesNumber}>{likes.length + " "}like</Text>
            )
        }else if(likes.length == 0){
            return(
                null
            )
        }
        else{
            return(
                <Text style={styles.likesNumber}>{likes.length + " "}likes</Text>
            )
        }
    }

    
    useEffect(()=>{
        const userInfo = ref(db, 'users/' + item.child.userId);
        get(userInfo).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("postuser")
                console.log(snapshot.val())
                setPostUser(snapshot.val());
            }})


        get(likeRef).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach(child =>{
                    if(child.val() == currentUserID){
                        setLiked(true); 
                    }
                })
            }}).catch((error)=>{
                console.log(error);
            })


            onValue(likeRef, (snapshot) =>{
                setLikes([]); 
                const data = snapshot;
                snapshot.forEach(child => {
                  console.log("child");
                  console.log(child.key);
                  var key = child.key; 
                  setLikes(likes => [key, ...likes]); 
                })
              }) 
        
    }, [])



    const handleLike = () =>{
        if(liked == true){
            setLiked(false);
            get(likeRef).then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach(child =>{
                        console.log(child.key); 
                        if(child.val() == currentUserID){
                            var removeRef = ref(db, "likes/" + item.key+ "/" + child.key); 
                           remove(removeRef, currentUserID);
                        }
                    })
                }}).catch((error)=>{
                    console.log(error);
                })
        }else if(liked == false){
            setLiked(true)
            push(likeRef, currentUserID); 
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
                <AntDesign name="message1" size={30} color="black" style={{paddingRight: 15}}/>
            </Pressable>
        </View>
        <View style={styles.likesContainer}>
            {showLikes()}
        </View>

    </View>
    );
  }


export default PostTile; 