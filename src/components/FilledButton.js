import React, {Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

function FilledButton({title, style, onPress}) {

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText]}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(200, 200, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 300,
    margin: 10,
    padding: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ccc',
    textAlign: 'center',
  },
});

export default FilledButton;
