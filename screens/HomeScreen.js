import React, {useEffect, useState} from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { getLongAndLatCoordinates } from '../logic/Location';
import { OPENCAGEDATA_API_KEY } from 'react-native-dotenv'


const HomeScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    const getData = async () => {
      const retrievedCoordinates = await getLongAndLatCoordinates();
      if (retrievedCoordinates) {
        setCoordinates(retrievedCoordinates);
      }
    }

    getData();
  }, []);


    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>HOME</Text>
        <Text>Coordinates: {JSON.stringify(coordinates, null, 2)}</Text>
        <Text>API KEY: {OPENCAGEDATA_API_KEY}</Text>
      </Layout>
    );

}

export default HomeScreen;