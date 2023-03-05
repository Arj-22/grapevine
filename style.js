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
      width: "90%",
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
      width: "70%",
      margin: 10,
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

    // Posts
    postImagePreview:{
      flex: 1, 
      alignSelf:'stretch',
      borderRadius: 10,
    },     
    photoContainer: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20, 
      marginBottom: 20,
    },    
    containerInsideFeed: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      // padding: 15, 
      margin: 10,
    },
    postHeading:{ 
      flexDirection: 'row',
      borderBottomWidth: StyleSheet.hairlineWidth, 
      height: 50,
      width: '100%',
      marginTop: 10,
    },
    postBottom:{
      // borderTopWidth: StyleSheet.hairlineWidth, 
      flexDirection: 'row',
      padding: 15,
      width: "100%",
    },
    avatar:{
      marginLeft: 15,
      height: 30, 
      width: 30,
    },
    username: {
      paddingTop: 6,
      paddingLeft: 10,
      fontSize: 15,
    },
    post: {
      alignItems: 'flex-start',
      padding: 0,
      paddingTop: 10,
      backgroundColor: 'white',
      width: "100%",
      borderRadius: 10,
    },
    postText:{
      paddingVertical: 15,
      marginTop: 10,
      fontSize: 16,
      paddingLeft: 20, 
    },
    postImage:{
      height: 300, 
      width: "100%",
    },

    // Chats
    containerInsideChats: {
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    chat: {
      alignItems: 'flex-start',
      padding: 30,
      backgroundColor: 'white',
      borderBottomWidth: '1px', 
      width: "100%",
    },
    chatHeading:{ 
      flexDirection: 'row',
      height: 30,
      width: '100%',
    },    
    chatAvatar:{
      height: 40, 
      width: 40,
    },
    chatUsername: {
      paddingLeft: 10,
      paddingTop: 5, 
      fontSize: 20
    },
    chatScreen: {
      width: '100%',
      height: '60%', 
      borderRadius: 10, 
      marginTop: -30,
      fontSize: 20, 
      backgroundColor: 'white'
    },
    containerInsideChatScreen: {
      paddingLeft: 10,
      paddingTop: 5,
    }, 
    message: {
      padding: 5,
      fontSize: 20,
      color: "grey"
    },
    messageSent: {
      padding: 5,
      alignSelf: "flex-end",
      fontSize: 20,
      marginRight: 10,
      
    },

    messageTime: {
      padding: 5,
      fontSize: 10
    },
    messageSentTime: {
      padding: 5,
      alignSelf: "flex-end",
      fontSize: 10,
      marginRight: 10,
    },

    newChatButton:{
      backgroundColor: "#D591F2",
      justifyContent: 'center',
      alignSelf: 'center', 
      borderRadius: 4,
      paddingVertical: 20, 
      width: "100%" 
    },

    //profile
    containerInsideProfile: {
      flex: 1,
      flexDirection: 'column', 
      margin: 1,
      width: "50%", 
    },    
    postProfile: {
      alignItems: 'center',
      //padding: 5,
      backgroundColor: 'white',
      //width: "100%",
      borderRadius: 10,
      height: 200, 
    },
    postProfileText:{
      paddingVertical: 10,
      fontSize: 16,
    },
    postProfileImage:{
       height: "100%", 
       width: "100%",
       borderRadius: 10,
    },
    buttonContainer: {
      flexDirection: 'row', 
    },
    containerInsideTopProfile: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20, 
      borderBottomWidth: 1
    },
    profileInfo:{
      flexDirection: 'row', 
    },
    profileTopContainer:{ 
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 10 
    },
    avatarProfile:{
      borderRadius: 40,
      height: 100, 
      width: 100,
      marginBottom: 20
    },
    usernameText:{
      fontSize: 30,
    },
    containerInsideProfileText: {
      // flex: 1,
      flexDirection: 'column', 
      margin: 1,
      justifyContent: 'flex-start',
      backgroundColor: "white", 
      padding: 15,  

    },   
    quotes:{
      fontSize: 15,
    }
    
  });