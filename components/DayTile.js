import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextField from './TextField';


const DayTile = ({data}) => {
  return(
    <View style={styles(data.isDaytime).tile}>
      <TouchableOpacity>
        <View style={{paddingBottom: 30}}><TextField>{data.name}</TextField></View>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <TextField>{`${data.high}\u00b0`}</TextField>
          <TextField style={{fontSize: 15}}>{` / ${data.low}\u00b0`}</TextField>
        </View>
        <View style={{paddingTop: 10}}>
          <TextField style={{fontSize: 12}}>{data.shortForecast}</TextField>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = (isDaytime) => StyleSheet.create({
  tile: {
    padding: 15,
    margin: 8,
    borderRadius: 15,
    backgroundColor: isDaytime ? '#263651' : '#18253a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '15%',

  }
});


export default DayTile;