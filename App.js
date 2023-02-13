import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraSceen';
import ChatScreen from './screens/ChatScreen';
import CreateChatScreen from './screens/CreateChatScreen';
import IndexScreen from "./screens/IndexScreen"; 
import LoginScreen from './screens/LoginScreen';
import PostScreen from './screens/PostScreen'; 
import SignUp from './screens/SignUpScreen';


export default function App() {

  const Stack = createNativeStackNavigator(); 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen
          name="IndexScreen"
          component={IndexScreen}
          options={{
            title: "Grapevine", 
            headerTransparent: false,
          }}
          />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
             headerShown: false
          }}
          />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: null,
            headerTransparent: true,
            headerTintColor: '#000000'
            
          }}
          />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={{
            title: null,
            headerTransparent: true,
            headerTintColor: '#000000'
            
          }}
          />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{
            title: null,
            headerTransparent: true,
            headerTintColor: '#FFFFFF'
            
          }}
          />
          <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            title: null,
            headerTransparent: true,
            headerTintColor: '#000000',
          }}
          />
          <Stack.Screen
          name="CreateChatScreen"
          component={CreateChatScreen}
          options={{
            title: "New Chat",
            headerTransparent: false,
            headerTintColor: '#000000',
          }}
          />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}


