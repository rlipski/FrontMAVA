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

import Api from '../src/Api';

function RegisterForm() {

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  myfun = async () => {console.log(`${Api.getURL()}/user/signUp`);
    await fetch(`${Api.getURL()}/user/signUp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, email: email, password: password}),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        if (resData.signedUp !== undefined) {
          Toast.show(`User registered `, Toast.LONG);
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
        placeholder="name"
        value={name}
        onChangeText={(value) => setName(value)}
      />
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
      <TextInput
        style={styles.inputBox}
        placeholder="password"
        secureTextEntry={true}
        value={password2}
        onChangeText={(value) => setPassword2(value)}
      />
      <TouchableOpacity onPress={myfun}>
        <Text style={styles.buttonText}>Sign up</Text>
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

export default RegisterForm;
