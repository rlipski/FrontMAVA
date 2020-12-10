import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

function TextList({ style, name, value, onPress }) {

  return (
    <View style={[styles.container, style]}>
      <Text
        style={[style, styles.name]}
      >
        {name}
      </Text>
      <Text
        style={[style, styles.value]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  name: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    paddingRight: 5,
    height: 30
  },
  value: {
    fontSize: 20,
    color: 'grey',
    height: 30
  },
});

export default TextList;
