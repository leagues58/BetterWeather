import React, {useEffect, useState} from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { getLongAndLatCoordinates, getLocationInformation } from '../logic/Location';


const HomeScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const [coordinates, setCoordinates] = useState();
  const [locationInformation, setLocationInformation] = useState();

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
    }

    getData();
  }, []);


    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>HOME</Text>
        <Text>Coordinates: {JSON.stringify(coordinates, null, 2)}</Text>
        <Text>LocationData: {JSON.stringify(locationInformation, null, 2)}</Text>
      </Layout>
    );

}

export default HomeScreen;