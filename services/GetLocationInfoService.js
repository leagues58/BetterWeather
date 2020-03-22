import {OPENCAGEDATA_BASE_URL} from 'react-native-dotenv';


const getLocationInfoService = async (apiKey, long, lat) => {
  const url = `${OPENCAGEDATA_BASE_URL}?key=${apiKey}&q=${encodeURIComponent(lat+','+long)}&no_annotations=1`;
  const response = await fetch(url);
  const data = await response.json()
  return data.results[0];
}

export default getLocationInfoService;