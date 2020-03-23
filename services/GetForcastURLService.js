import {NWS_BASE_URL} from 'react-native-dotenv';


const getForcastURLService = async (lat, long) => {
  const url = `${NWS_BASE_URL}/points/${encodeURIComponent(lat+','+long)}`;
  const response = await fetch(url);
  const data = await response.json()
  return data;
}

export default getForcastURLService;