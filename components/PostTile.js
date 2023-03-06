import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { EvilIcons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import { useState, useEffect } from 'react';


const PostTile = ({navigation, item, hasPic, hasText, user}) => {

    const showText = (hasText, item ) =>{
        console.log(hasText);
        if(hasText){
            return(
                <Text style={styles.postText}>{item.text}</Text> 
            )
        }
    }

    console.log(user);

    return (
        <View style={styles.post}>
            <View style={styles.postHeading}>
            <Image source={{uri: user.avatar}} style={styles.avatar}/>
            <Pressable
            onPress={() => navigation.navigate("OtherProfileScreen", {userID: item.userId, username: item.username})}
            >
                <Text style={styles.username}>{item.username}</Text>
            </Pressable>
            </View>
        <Image source={{uri: item.image}} style={hasPic ? styles.postImage : null}/>
        {showText(hasText, item)}
        <View style={styles.postBottom}>
        {/* <AntDesign name="like2" size={24} color="black" /> */}
        <EvilIcons name="like" size={40} color="black" />
        <EvilIcons name="comment" size={40} color="black" />
        </View>
    </View>
    );
  }


export default PostTile; 