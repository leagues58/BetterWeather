import GetLocation from 'react-native-get-location'

const getLongAndLatCoordinates = async () => {
  const location = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  });
return location;
}


export { getLongAndLatCoordinates };