import React, { useState, useEffect, useReducer } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';

// import HomeScreen from './screens/HomeScreen';
import { AuthContext } from './contexts/AuthContext';
import { UserContext } from './contexts/UserContext';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import AccountStackNavigator from './navigators/AccountStackNavigator';
import AdvertisementsStackNavigator from './navigators/AdvertisementsStackNavigator';
import { useAuth } from './hooks/useAuth';
import Api from './Api';
import jwt_decode from 'jwt-decode';
import { createAction } from './config/createAction';
const Tab = createMaterialBottomTabNavigator();

function App() {
  const { auth, state } = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: '#694fad' }}>
          <Tab.Screen name="Advertisements" component={AdvertisementsStackNavigator} />{console.log(state.user)}
          {(state.user === undefined || state.user.user === undefined) ? (

            <Tab.Screen
              name="Account"
              component={AuthStackNavigator}
              options={{ title: 'Login' }}
              initialParams={{ user: state.user }}
            />
          ) : (
              <Tab.Screen name={'Account'}>
                {() => (
                  <UserContext.Provider value={state.user}>
                    <AccountStackNavigator />
                  </UserContext.Provider>
                )}
              </Tab.Screen>
            )}
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
