import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import HomeScreen from './screens/HomeScreen';
import PlacesScreen from './screens/PlacesScreen';
import SettingsScreen from './screens/SettingsScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {

  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title='HOME'/>
        <BottomNavigationTab title='PLACES'/>
        <BottomNavigationTab title='SETTINGS'/>
      </BottomNavigation>
    </SafeAreaView>
  );
};

const TabNavigator = () => (
<BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen name='Home' component={HomeScreen}/>
    <BottomTab.Screen name='Places' component={PlacesScreen}/>
    <BottomTab.Screen name='Settings' component={SettingsScreen}/>
  </BottomTab.Navigator>
);

const App = () => (
  <ApplicationProvider mapping={mapping} theme={darkTheme}>
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  </ApplicationProvider>
);

export default App;