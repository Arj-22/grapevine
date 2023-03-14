import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { AntDesign } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get, push, remove, set, orderByChild} from "firebase/database";
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


            get(likeRef).then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach(child =>{
                        console.log("child use effect ")
                        console.log(child.key); 
                        if(child.val() == currentUserID){
                            setLiked(true); 
                        }
                    })
                }}).catch((error)=>{
                    console.log(error);
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
                            var removeRef = ref(db, "likes/" + item.key+ "/"+child.key); 
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
                <AntDesign name="message1" size={30} color="black" />
            </Pressable>
        
        </View>
    </View>
    );
  }


export default PostTile; 