import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const BottomNavBar = ({navigation, state}) => {

  const onPressHandler = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <View style={styles.barContainer} onSelect>

      <TouchableOpacity style={styles.barItem} onPress={() => onPressHandler(0)}>
        <Text style={{}}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.barItem} onPress={() => onPressHandler(1)}>
        <Text style={{}}>Places</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.barItem} onPress={() => onPressHandler(2)}>
        <Text style={{}}>Settings</Text>
      </TouchableOpacity>

  </View>
  );
}


const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }, 
  barItem: {
    margin: 5,
    padding: 10,
  }
});

export default BottomNavBar;