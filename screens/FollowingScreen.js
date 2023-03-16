import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, Image, ImageBackground, FlatList} from 'react-native'; 
import { getDatabase, ref, onValue} from "firebase/database";
import { useState, useEffect } from 'react';

const FollowingScreen = ({navigation, route}) => {


  const db = getDatabase();
  const [following, setFollwing] = useState([]); 
  const {userID} = route.params;

  useEffect(() => {

    navigation.setOptions({
        title: "Following"
    })

    const followersRef = ref(db, 'following/' + userID);
    
    onValue(followersRef, (snapshot) =>{
        setFollwing([]);
      const data = snapshot.val();
      console.log(data)
      snapshot.forEach(child => { 
        console.log();
        const userRef = ref(db, 'users/' + child.toJSON().followingId);
        onValue(userRef, (snapshot) =>{
            const data = snapshot.val(); 
            setFollwing(following => [...following, data]);
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
                data={following}
                renderItem={({item}) =>{ 
                  console.log(item); 
                  return(
                    <View style={styles.containerInsideChats}>
                        <View style={styles.chat}>
                          <View style={styles.chatHeading}>
                            <Image source={{uri: item.avatar}} style={styles.chatAvatar}/>
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
export default FollowingScreen; 