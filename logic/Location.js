import GetLocation from 'react-native-get-location'

const getLongAndLatCoordinates = async () => {
  const location = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  });
return {...location, longitude:location.longitude.toFixed(4), latitude:location.latitude.toFixed(4)};
}


export { getLongAndLatCoordinates };