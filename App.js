import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen'; // Adjust path if needed
import LoginScreen from './screens/LoginScreen'; // Adjust path if needed
import RegisterScreen from './screens/RegisterScreen';
import ForgotPassScreen from './screens/ForgotPassScreen'; // Import ForgotPassScreen
import HomePageScreen from './screens/HomePageScreen'; // Import HomePageScreen
import ClockPageScreen from './screens/ClockPageScreen'; // Import ClockPageScreen
import StopWatchScreen from './screens/StopWatchScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"  // Registered as HomePage here
          component={HomePageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClockPage"
          component={ClockPageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StopwatchPage"
          component={StopWatchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
