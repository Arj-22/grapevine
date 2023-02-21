import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, Image, ImageBackground, FlatList} from 'react-native'; 
import { getDatabase, ref, onValue} from "firebase/database";
import { useState, useEffect } from 'react';

const FollowersScreen = ({navigation, route}) => {


  const db = getDatabase();
  const [followers, setFollowers] = useState([]); 
  const {userID} = route.params;

  useEffect(() => {

    navigation.setOptions({
        title: "Followers"
    })

    const followersRef = ref(db, 'followers/' + userID);
    
    
    onValue(followersRef, (snapshot) =>{
      const data = snapshot.val();
      setFollowers([]);
      console.log(data)
      snapshot.forEach(child => { 
        console.log();
        const userRef = ref(db, 'users/' + child.toJSON().followerId);
        onValue(userRef, (snapshot) =>{
            const data = snapshot.val();
            console.log(data); 
            setFollowers(followers => [...followers, data]);
        })
      })
    });
  }, []) 

    return (
        <View style={styles.container}>
        <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          >
            <FlatList
                data={followers}
                renderItem={({item}) =>{ 
                  return(
                    <View style={styles.containerInsideChats}>
                        <View style={styles.chat}>
                          <View style={styles.chatHeading}>
                            <Image source={require("../assets/grape.png")} style={styles.chatAvatar}/>
                            <Text style={styles.chatUsername}>{item.username}</Text>
                          </View>
                        </View>
                    </View>
                  );
              }}
              />
            <StatusBar style="auto" />     
        </ImageBackground>
      </View>
    );
  }
export default FollowersScreen; 