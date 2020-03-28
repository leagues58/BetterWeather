import getForcastURLService from '../services/GetForcastURLService';
import getForcastService from '../services/GetForcastService';
import AsyncStorage from '@react-native-community/async-storage';

const getWeeklyForecast = async(lat, long) => {
  const forecastDataURL = await getForcastURLService(lat, long);
  const forecastData = await getForcastService(forecastDataURL.properties.forecast);
  //console.log(JSON.stringify(forecastData, null, 2));
  AsyncStorage.setItem('weeklyForecast', JSON.stringify(forecastData))
  return forecastData;
}

const getCurrentWeatherByCoords = async (lat, long) => {
  let forecast = await AsyncStorage.getItem('weeklyForecast');

  if (forecast) {
    console.log('got the forecast from storage')
  } else {
    console.log('got the forecast from api')
    forecast = await getWeeklyForecast(lat, long);
  }
  return forecast.properties.periods[0];
};

export {getCurrentWeatherByCoords}