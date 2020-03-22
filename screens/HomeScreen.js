import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import { getLongAndLatCoordinates, getLocationInformation } from '../logic/Location';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../components/TextField';
import Card from '../components/Card';


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
      <SafeAreaView style={styles.screen}>
        <View style={styles.content}>
          <Card headerText={`${locationInformation?.city}, ${locationInformation?.state}`}>
            <TextField>Weather data goes here</TextField>
          </Card>
        </View>
      </SafeAreaView>
    );
}

const styles = new StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  card: {
    backgroundColor:'lightgray',
    width: '90%',
    color: 'black',
  }
});

export default HomeScreen;