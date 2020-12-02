import React, { useReducer } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../contexts/AuthContext';
import AccountScreen from './AccountScreen';
import AuthStackNavigator from '../navigators/AuthStackNavigator';
import Api from '../Api';

import { createAction } from '../config/createAction';
const RootStack = createStackNavigator();

function AuthScreen(state) {
  console.log(state);
  return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name={'RootStack'} component={AuthStackNavigator} />
      </RootStack.Navigator>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  },
});
