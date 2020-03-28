import GetLocation from 'react-native-get-location';
import { OPENCAGEDATA_API_KEY } from 'react-native-dotenv';
import getLocationInfoService from '../services/GetLocationInfoService';

const getLongAndLatCoordinates = async () => {
  const location = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  });

  return {...location, longitude:location.longitude.toFixed(4), latitude:location.latitude.toFixed(4)};
};

const getLocationInformation = async (long, lat) => {
  const locationInfo = await getLocationInfoService(OPENCAGEDATA_API_KEY, long, lat);
  return { city: locationInfo.components.city, state: locationInfo.components.state };
};


export { getLongAndLatCoordinates, getLocationInformation };