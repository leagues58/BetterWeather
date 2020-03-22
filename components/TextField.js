import React from 'react';
import {StyleSheet, Text} from 'react-native';

const TextField = (props) => {
  return (
  <Text style={styles.text}>{props.children}</Text>
  );
}


const styles = StyleSheet.create({
  text: {
    color: 'black',
  }
});

export default TextField;