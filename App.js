import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from "./screens/IndexScreen"; 
import LoginScreen from './screens/LoginScreen';
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
            headerTransparent: true,
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
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}


