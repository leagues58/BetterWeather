import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import TextField from './TextField';

const BottomNavBar = ({ state, descriptors, navigation }) => {

  return (
    <View style={styles.barContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity onPress={onPress} style={{...styles.barItem, ...(isFocused ? styles.selectedItem : null)}} key={index}>
            <TextField style={isFocused ? styles.selectedItemText : {color: 'white'}}>
              {label}
            </TextField>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#141e30',
  }, 
  barItem: {
    margin: 5,
    padding: 15,
  },
  selectedItem: {
    //borderColor: '#673ab7',
    //borderWidth: 1,
  },
  selectedItemText: {
    color: '#673ab7',
  },
});

export default BottomNavBar;