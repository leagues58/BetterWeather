import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

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
          <TouchableOpacity onPress={onPress} style={{...styles.barItem, ...(isFocused ? styles.selectedItem : null)}}>
            <Text style={isFocused ? styles.selectedItemText : {} }>
              {label}
            </Text>
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