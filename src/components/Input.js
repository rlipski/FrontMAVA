import React, {Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Input({style, ...props}) {



  return (
      <TextInput
        {...props}
        style={[style, styles.input]}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: 300,
    borderRadius: 15,
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
    borderRadius: 15,
    backgroundColor: 'rgba(200, 200, 255, 0.3)',
    margin: 10,
    textAlign: 'center',
  },
});

export default Input;
