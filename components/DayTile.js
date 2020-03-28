import React from 'react';
import {View, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextField from './TextField';


const DayTile = (props) => {
  return(
    <View style={styles(props.isToday).tile}>
      <TouchableOpacity>
        <View style={{paddingBottom: 30}}><TextField>Tomorrow</TextField></View>
        <View><TextField>99 / 70</TextField></View>
        <View style={{paddingTop: 10}}><TextField style={{fontSize: 12}}>Clear</TextField></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = (isToday) => StyleSheet.create({
  tile: {
    padding: 15,
    margin: 10,
    borderRadius: 15,
    backgroundColor: isToday ? '#263651' : '#18253a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  }
});


export default DayTile;