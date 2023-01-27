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
    TextInput: {
      fontSize: 20, 
      height: 40,
      margin: 20, 
      borderBottomWidth: StyleSheet.hairlineWidth, 
      width: 300
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
    background:{
      flex: 1,
      justifyContent: 'center',
      width: '100%',

    },    
    tabIcon:{
      height: 20, 
      width: 20
    },

  });