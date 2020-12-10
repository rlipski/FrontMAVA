import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import AdvertisementsListScreen from '../screens/AdvertisementsListScreen';
import AdvertisementDetailsScreen from '../screens/AdvertisementDetailsScreen';
import AdvertisementEditScreen from '../screens/AdvertisementEditScreen';
import LoginScreen from '../screens/LoginScreen';

const AdvertisementsStack = createStackNavigator();

const LoginStack = createStackNavigator();

const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
}
function  AdvertisementsStackNavigator() {
  console.log(getToken(), "tokenn");
  console.log('ssssssssssssssssssssssssssssssssss');
  return (
    <AdvertisementsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode={'modal'}
    >
      <AdvertisementsStack.Screen name={'Advertisements'} component={AdvertisementsListScreen} />
      <AdvertisementsStack.Screen name={'AdvertisementDetails'} component={AdvertisementDetailsScreen} />
      <AdvertisementsStack.Screen name={'AdvertisementEdit'} component={AdvertisementEditScreen} />
    </AdvertisementsStack.Navigator>
  );
}

export default AdvertisementsStackNavigator;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  }
});