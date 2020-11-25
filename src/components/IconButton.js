import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-ionicons';

function IconButton({ name, style, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Icon name={name} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});

export default IconButton;
