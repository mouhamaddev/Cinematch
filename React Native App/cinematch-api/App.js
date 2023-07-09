import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {React , useState} from 'react';
import { StyleSheet, Image } from 'react-native';
import LoginScreen from './src/components/LoginScreen';
import SignupScreen from './src/components/SignupScreen';
import HomeScreen from './src/components/HomeScreen';
import ProfileScreen from './src/components/ProfileScreen';
import GuestScreen from './src/components/GuestScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsMenu from './src/components/SettingsMenu';
import MovieDetails from './src/components/MovieDetails';
import MovieDetailsGuest from './src/components/MovieDetailsGuest';
import Genre from './src/components/Genre';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const[guest, setGuest] = useState(true);
  return (
    <NavigationContainer>
      { 
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Guest" component={GuestScreen}/>
        <Stack.Screen name="Settings" component={SettingsMenu}/>
        <Stack.Screen name="MovieDetails" component={MovieDetails}/>
        <Stack.Screen name="MovieDetailsGuest" component={MovieDetailsGuest}/>
        <Stack.Screen name="Genre" component={Genre}/>
      </Stack.Navigator>
      }

    </NavigationContainer>
  );
}