import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground, FlatList} from 'react-native'; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import { useState, useEffect } from 'react';


const ProfileContainer = ({username}) => {

    return (
        <View style={styles.profileTopContainer}>
            <Image source={require("../assets/avatar.png")} style={styles.avatarProfile}/>
            <Text style={styles.usernameText}>{username}</Text>
        </View>
    );
  }


export default ProfileContainer; 