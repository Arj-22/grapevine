import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 0, 
    },  
    containerInside: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20, 
    },
    containerInsidePost: {
      flex: 1,
    },
    TextInput: {
      fontSize: 20, 
      height: 40,
      margin: 20, 
      borderBottomWidth: StyleSheet.hairlineWidth, 
      width: 300
    },
    TextInputPost: {
      marginTop: "30%",
      justifyContent: 'flex-start',
      fontSize: 20, 
      height: 150,
      margin: 20, 
      width: 350,
      backgroundColor: "#FFFFFF",
      borderRadius: 5,
      paddingTop:30,
      paddingBottom: 30,
      paddingLeft: 30, 
      paddingRight: 30

    },
    greeting: {
      marginTop: 32, 
      marginBottom: 10,
      fontSize: 18, 
      fontWeight: "400", 
      textAlign: 'center'
    }, 
    error: {
      marginTop: 32, 
      marginBottom: 10,
      fontSize: 20, 
      fontWeight: "300", 
      textAlign: 'center', 
      color: 'red'
    }, 
    form:{
      marginBottom: 48, 
    },
    textLabel:{
      marginHorizontal: 30,
      margin: 15, 
      fontSize: 16, 
    }, 
    button:{
      backgroundColor: "#D591F2",
      justifyContent: 'center', 
      borderRadius: 4,
      paddingVertical: 20, 
      width: "70%" 
    },
    buttonText: {
      textAlign: 'center',
      color: "#FFFFFF",
    }, 
    icon:{
      position: 'relative', 
      marginTop: 10,  
      height: 100, 
      width: 100
    },
    iconContainer:{
      flexDirection: "row-reverse",
      paddingHorizontal: 10,  
      alignItems: "flex-end",
    },
    postScreenIcons:{
      paddingHorizontal: 10,
      color: "#4E0DD9"
    } ,
    background:{
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },    
    tabIcon:{
      height: 20, 
      width: 20
    },    
    camera:{
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'row-reverse',
      alignItems: 'flex-end'
    },
    cameraButton:{
      marginBottom: 50
    },
    postImagePreview:{
      flex: 1, 
      alignSelf:'stretch'
    },     
    photoContainer: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20, 
      marginBottom: 20,
    },


  });