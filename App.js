import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraSceen';
import ChatScreen from './screens/ChatScreen';
import CreateChatScreen from './screens/CreateChatScreen';
import IndexScreen from "./screens/IndexScreen"; 
import LoginScreen from './screens/LoginScreen';
import OtherProfileScreen from './screens/OtherProfileScreen';
import PostScreen from './screens/PostScreen'; 
import ProfileScreen from './screens/ProfileScreen';
import FollowersScreen from './screens/FollowersScreen';
import SignUp from './screens/SignUpScreen';
import FollowingScreen from './screens/FollowingScreen';
import ProfileFeedScreen from './screens/ProfileFeedScreen';
import SelectAvatarScreen from './screens/SelectAvatarScreen';

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

          <Stack.Screen
          name="OtherProfileScreen"
          component={OtherProfileScreen}
          options={{
            title: "Other Profile",
            headerTransparent: false,
            headerTintColor: '#000000',
          }}
          />
          <Stack.Screen
          name="FollowersScreen"
          component={FollowersScreen}
          options={{
            title: "Other Profile",
            headerTransparent: false,
            headerTintColor: '#000000',
          }}
          />

        <Stack.Screen
          name="FollowingScreen"
          component={FollowingScreen}
          options={{
            title: "Other Profile",
            headerTransparent: false,
            headerTintColor: '#000000',
          }}
          />
          <Stack.Screen
          name="ProfileFeedScreen"
          component={ProfileFeedScreen}
          options={{
            title: "Post",
            headerTransparent: false,
            headerTintColor: '#000000',
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


