import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, Image} from 'react-native';
import { getLongAndLatCoordinates, getLocationInformation, getCurrentWeatherByCoords } from '../logic/Location';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../components/TextField';
import Card from '../components/Card';
import getFormattedDate from '../utilities/Date';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';


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
        <LinearGradient colors={['#243b55', '#141e30']} style={styles.linearGradient}>
          <View style={styles.content}>

            <View style={styles.dateLocationArea}>
              <TextField>{getFormattedDate()}</TextField>
              <TextField>{`${locationInformation?.city}, ${locationInformation?.state}`}</TextField>
            </View>

            <View style={styles.tempAndIconArea}>
              <View>
                <TextField style={{fontSize:80}}>{`${currentForecast?.temperature}\u00b0`}</TextField>
                <TextField>{`${currentForecast?.shortForecast}`}</TextField>
              </View>
              {currentForecast?.isDayTime ? <FontAwesomeIcon icon={ faSun } color='yellow' size={80} /> : <FontAwesomeIcon icon={ faMoon } color='white' size={80} />}
            </View>

            <View style={{borderWidth: 1, borderColor: 'yellow'}}><TextField>Day panels</TextField></View>

            <View style={{borderWidth: 1, borderColor: 'orange'}}><TextField>Temp graph</TextField></View>

            <View style={{borderWidth: 1, borderColor: 'white'}}><TextField>Assorted data bits</TextField></View>
            
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
}





/*<View style={styles.content}>
            {!dataLoaded && <ActivityIndicator size={60}/>}
            {dataLoaded && 
              <View>
                <View style={styles.temperatureContainer}>
                  <TextField style={styles.temperatureText}>
                    {`${currentForecast?.temperature}\u00b0`}
                  </TextField>
                </View>
                <TextField style={styles.forecastText}>{`${locationInformation?.city}, ${locationInformation?.state}`}</TextField>
                  <TextField style={styles.forecastText}>{currentForecast?.detailedForecast}</TextField>
              </View>}
          </View>*/

const styles = new StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1, 
    //borderWidth: .5, 
    //borderColor: 'red', 
    paddingTop: 10
  },
  dateLocationArea: {
    //borderWidth: 1, 
    //borderColor: 'green', 
    paddingLeft: 15
  },
  tempAndIconArea: {
    //borderWidth: 1, 
    //borderColor: 'white', 
    marginTop: '25%', 
    paddingLeft:15, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1,
  },
});

export default HomeScreen;