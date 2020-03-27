import React from 'react';
import {StyleSheet, Text} from 'react-native';

const TextField = (props) => {
  return (
  <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
  );
}


const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
  }
});

export default TextField;