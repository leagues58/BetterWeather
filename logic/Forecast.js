import getForcastURLService from '../services/GetForcastURLService';
import getForcastService from '../services/GetForcastService';
import AsyncStorage from '@react-native-community/async-storage';

const getWeeklyForecastByCoords = async(lat, long) => {
  let forecast = JSON.parse(await AsyncStorage.getItem('weeklyForecast'));
  const currentDateTime = new Date();
  let dateFromStorage;

  if (forecast) {
    dateFromStorage = new Date(forecast.properties.generatedAt);

    if (currentDateTime < dateFromStorage.setMinutes(dateFromStorage.getMinutes() + 15)) {
      console.log('got the forecast from storage1')
    } else {
      console.log('got the forecast from api1')
      const forecastDataURL = await getForcastURLService(lat, long);
      forecast = await getForcastService(forecastDataURL.properties.forecast);
      AsyncStorage.setItem('weeklyForecast', JSON.stringify(forecast))
    }
  }

  return forecast.properties.periods;
}

const getCondensedWeeklyForcastByCoords = async (lat, long) => {
  const forecast = await getWeeklyForecastByCoords(lat, long);
  let condensedForecast = [];
  // {number, name, high, low, shortForecast}

  let high = 0;
  let low = 0;
  let name = '';
  let number = 0;
  let shortForecast = '';

  forecast.map((element) => {
    if (element.isDaytime || element.number == 1) {
      high = element.temperature;
      name = element.name;
      number = element.number;
      shortForecast = element.shortForecast;
    } else {
      low = element.temperature;
      condensedForecast.push({number, name, high, low, shortForecast});
    }
  });

  return condensedForecast;
}

const getCurrentWeatherByCoords = async (lat, long) => {
  const forecast = await getWeeklyForecastByCoords(lat, long);
  return forecast[0];
};

export {getWeeklyForecastByCoords, getCondensedWeeklyForcastByCoords, getCurrentWeatherByCoords}