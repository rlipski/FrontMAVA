import React, { useReducer } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../contexts/AuthContext';
import AuthStackNavigator from '../navigators/AdvertisementsStackNavigator';
import Api from '../Api';

const RootStack = createStackNavigator();

function AdvertisementScreen(state) {
  console.log(state);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name={'RootStack'} component={AdvertisementsStackNavigator} />
    </RootStack.Navigator>
  );
}

export default AdvertisementScreen;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  },
});
