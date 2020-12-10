import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const MainStack = createStackNavigator();

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode={'modal'}
    >
      <MainStack.Screen name={'Advertisements'} component={AdvertisementsList} />
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  }
});