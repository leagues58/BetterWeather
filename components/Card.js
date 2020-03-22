import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerText}>{props.headerText}</Text>
      </View>
      <View style={styles.cardBody}>
        {props.children}
      </View>
  </View>
  );
}


const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'black',
    width: '90%',
    borderRadius: 5
  },
  cardHeader: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  cardBody: {
    padding: 10,
  },
});

export default Card;