import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/ProfileScreen';
import EditAccountScreen from '../screens/EditAccountScreen';

const AccountStack = createStackNavigator();

const LoginStack = createStackNavigator();

function AccountStackNavigator(props) {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode={'modal'}
    >
{console.log(props)}
      <AccountStack.Screen name={'Profile'} component={ProfileScreen} />
      <AccountStack.Screen name={'EditAccount'} component={EditAccountScreen} />
    </AccountStack.Navigator>
  );
}

export default AccountStackNavigator;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  }
});