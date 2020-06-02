import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = (props) => (
  <Text style={styles.text}>{props.children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'primary',
  },
});

export default DefaultText;
