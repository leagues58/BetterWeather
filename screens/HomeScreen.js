import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

const HomeScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };


    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>HOME</Text>
      </Layout>
    );

}

export default HomeScreen;