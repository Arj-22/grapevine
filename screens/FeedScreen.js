import { StatusBar } from 'expo-status-bar';
import styles from '../style';
import {Text, View, TextInput, Button, Pressable, Image, ImageBackground} from 'react-native'; 

const FeedScreen = ({navigation}) => {
    return (

      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/rm222-mind-22.jpg")}
          style={styles.background}
          >
            <View style={styles.containerInside}>

            <Text style={styles.textLabel}>Your Feed!</Text>
            <StatusBar style="auto" />
            </View>       
        </ImageBackground>
      </View>
    );
  }


export default FeedScreen; 