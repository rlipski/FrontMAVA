import React, {Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../Api';

function Form() {
  const STORAGE_KEY = '@save_token';
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  myfun = async () => {
    console.log(`${Api.getURL()}/user/login`);
    await fetch(`${Api.getURL()}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password}),
    })
      .then((res) => res.json())
      .then(async (resData) => {
        console.log(resData);
        if (resData.user !== undefined) {
          await AsyncStorage.setItem(STORAGE_KEY, resData.access_token);
          Toast.show(`Logged in ${resData.user.name}`, Toast.LONG);
        } else {
          Toast.show('Incorrect data');
        }
      })
      .catch((error) => {
        console.log('Api call error');
        alert(error.message);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={styles.inputBox}
        placeholder="email"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="password"
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <TouchableOpacity onPress={myfun}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 300,
    borderRadius: 25,
    backgroundColor: 'rgba(200, 200, 255, 0.3)',
    paddingHorizontal: 16,
    margin: 10,
  },

  buttonText: {
    width: 150,
    fontSize: 16,
    fontWeight: '500',
    padding: 16,
    color: '#ccc',
    borderRadius: 25,
    backgroundColor: 'rgba(200, 200, 255, 0.3)',
    margin: 10,
    textAlign: 'center',
  },
});

export default Form;
