import React, {Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

function Heading({children, style, ...props}) {



  return (
      <Text
        {...props}
        style={[style, styles.text]}
      >
        {children}
      </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
});

export default Heading;
