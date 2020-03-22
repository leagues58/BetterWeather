import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import { getLongAndLatCoordinates, getLocationInformation } from '../logic/Location';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const [coordinates, setCoordinates] = useState();
  const [locationInformation, setLocationInformation] = useState();

  useEffect(() => {
    const getData = async () => {
      const retrievedCoordinates = await getLongAndLatCoordinates();
      if (retrievedCoordinates) {
        setCoordinates(retrievedCoordinates);
        const locationInformationResponse = await getLocationInformation(retrievedCoordinates.longitude, retrievedCoordinates.latitude);

        if (locationInformationResponse) {
          setLocationInformation(locationInformationResponse);
        }
      }
    }

    getData();
  }, []);


    return (
      <SafeAreaView>
        <Text style={{color:'black'}}>Coordinates: {JSON.stringify({longitude: coordinates?.longitude, latitude: coordinates?.latitude}, null, 2)}</Text>
        <Text style={{color:'black'}}>LocationData: {JSON.stringify(locationInformation, null, 2)}</Text>
      </SafeAreaView>
    );
}

const styles = new StyleSheet.create({
  card: {
    backgroundColor:'lightgray',
    width: '90%',
    color: 'black',
  }
});

export default HomeScreen;