import styles from '../style';
import {Image, Pressable} from 'react-native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import MessagesScreen from './MessagesScreen';
import PostScreen from './PostScreen';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';


const Tab = createBottomTabNavigator(); 

const IndexScreen = ({navigation})=> {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => 
      <Pressable onPress={ () =>{ navigation.navigate(PostScreen)}}>
        {/* <Ionicons name="add-circle" size={35} color="white" /> */}
        <Ionicons name="add-circle-outline" size={34} color="black" />
      </Pressable>
  })
  }, []) 

    return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} 
      options={{
        title: "Feed", 
        headerShown: false,
        tabBarActiveTintColor: "#4E0DD9",
        tabBarIcon:()=>(  
          <Image source={require("../assets/Home.png")} style={styles.tabIcon}/>
          )
          }} 
          />
      <Tab.Screen name="Messages" component={MessagesScreen}
        options={{
          title: "Messages", 
          headerShown: false,
          tabBarActiveTintColor: "#4E0DD9",
          tabBarIcon:()=>(  
            <Image source={require("../assets/Messages.png")} style={styles.tabIcon}/>
            )}} 
          />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          title: "Profile", 
          headerShown: false,
          tabBarActiveTintColor: "#4E0DD9",
          tabBarIcon:()=>(  
            <Image source={require("../assets/Profile.png")} style={styles.tabIcon}/>
            )}}  
        />
    </Tab.Navigator>
      

      
    );
  }
export default IndexScreen; 