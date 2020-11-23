import 'react-native-gesture-handler';

import React, {useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage'

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignUpScreen from './screens/SignUpScreen';

const STORAGE_KEY = '@save_token';

const Tab = createMaterialBottomTabNavigator();

function App() {
  const [token, setToken] = useState('');

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Account" component={SettingsScreen} />
        <Tab.Screen name="SignUp" component={SignUpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;