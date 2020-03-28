import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, Image, StatusBar, ScrollView} from 'react-native';
import { getLongAndLatCoordinates, getLocationInformation } from '../logic/Location';
import { getCondensedWeeklyForcastByCoords, getCurrentWeatherByCoords } from '../logic/Forecast';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../components/TextField';
import DayTile from '../components/DayTile';
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
  const [futureWeather, setFutureWeather] = useState();

  // get coordinates from gps
  useEffect(() => {
    const getData = async () => {
      const retrievedCoordinates = await getLongAndLatCoordinates();
      if (retrievedCoordinates) {
        setCoordinates(retrievedCoordinates);
      }
    };

    getData();
  }, []);

  // get location infomation based off gps coordinates
  useEffect(() => {
    const getData = async () => {
      if (coordinates) {
        const locationInformationResponse = await getLocationInformation(coordinates.longitude, coordinates.latitude);
        if (locationInformationResponse) {
          setLocationInformation(locationInformationResponse);
        }
      }
    }
    
    getData();
  }, [coordinates]);

  // get weather from gps coordinates
  useEffect(() => {
    const getData = async () => {
      if (coordinates) {
        const currentWeatherResponse = await getCurrentWeatherByCoords(coordinates.latitude, coordinates.longitude);
        if (currentWeatherResponse) {
          setCurrentForecast(currentWeatherResponse);
        }

        const futureWeatherData = await getCondensedWeeklyForcastByCoords(coordinates.latitude, coordinates.longitude);
        if (futureWeatherData) {
          setFutureWeather(futureWeatherData);
        }
      }
    };

    getData();
  }, [coordinates]);

  useEffect(() => {
    if (coordinates && locationInformation && currentForecast && futureWeather) {
      setDataLoaded(true);
    }
  }, [coordinates, locationInformation, currentForecast, futureWeather]);

  const isDaytime = currentForecast?.isDaytime;


    return (
      <SafeAreaView style={styles.screen}>
        {isDaytime ? <StatusBar barStyle='dark-content' backgroundColor='#7dd3f0' /> : <StatusBar barStyle="light-content" backgroundColor='#243b55' />}
        <LinearGradient colors={isDaytime ? ['#7dd3f0', '#0c9ecf'] : ['#243b55', '#141e30']} style={styles.linearGradient}>
        {!dataLoaded && <ActivityIndicator size={60}/>}
          {dataLoaded && <View style={styles.content}>

            <View style={styles.dateLocationArea}>
              <TextField>{getFormattedDate()}</TextField>
              <TextField>{`${locationInformation?.city}, ${locationInformation?.state}`}</TextField>
            </View>

            <View style={styles.tempAndIconArea}>
              <View>
                <TextField style={{fontSize:80}}>{`${currentForecast?.temperature}\u00b0`}</TextField>
                <TextField>{`${currentForecast?.shortForecast}`}</TextField>
              </View>
              {isDaytime ? <FontAwesomeIcon icon={ faSun } color='white' size={80} /> : <FontAwesomeIcon icon={ faMoon } color='white' size={80} />}
            </View>

            <View style={{marginTop: '5%'}}>
              <ScrollView horizontal >
                {futureWeather.map(
                  (period) => (<DayTile data={period} key={period.number}/>)
                )}
                
              </ScrollView>
            </View>

            <View style={{borderWidth: 1, borderColor: 'orange',  marginTop: '5%'}}><TextField>Temp graph</TextField></View>

            <View style={{borderWidth: 1, borderColor: 'white',  marginTop: '5%'}}><TextField>Assorted data bits</TextField></View>
            
          </View>}
        </LinearGradient>
      </SafeAreaView>
    );
}


const styles = new StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    
    //borderWidth: .5, 
    //borderColor: 'red', 
    paddingTop: '2%'
  },
  dateLocationArea: {
    //borderWidth: 1, 
    //borderColor: 'green', 
    paddingLeft: '5%'
  },
  tempAndIconArea: {
    //borderWidth: 1, 
    //borderColor: 'white', 
    marginTop: '15%', 
    paddingLeft:'5%', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1,
  },
});

export default HomeScreen;