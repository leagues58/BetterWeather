import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import { getLongAndLatCoordinates, getLocationInformation, getCurrentWeatherByCoords } from '../logic/Location';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../components/TextField';
import Card from '../components/Card';


const HomeScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const [dataLoaded, setDataLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState();
  const [locationInformation, setLocationInformation] = useState();
  const [currentForecast, setCurrentForecast] = useState();

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
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (coordinates) {
        const currentWeatherResponse = await getCurrentWeatherByCoords(coordinates.latitude, coordinates.longitude);
        if (currentWeatherResponse) {
          setCurrentForecast(currentWeatherResponse);
        }
        console.log('current weather: ' + JSON.stringify(currentWeatherResponse, null, 2))
      }
    };

    getData();
  }, [coordinates]);

  useEffect(() => {
    if (coordinates && locationInformation && currentForecast) {
      setDataLoaded(true);
    }
  }, [coordinates, locationInformation, currentForecast]);


    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.content}>
          {!dataLoaded && <ActivityIndicator size={60}/>}
          {dataLoaded && <Card headerText={`${locationInformation?.city}, ${locationInformation?.state}`}>
            <TextField>{currentForecast?.detailedForecast}</TextField>
          </Card>}
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