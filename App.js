import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import PlacesScreen from './screens/PlacesScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNavBar from './components/BottomNavBar';

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
<BottomTab.Navigator tabBar={props => <BottomNavBar {...props}/>}>
    <BottomTab.Screen name='Home' component={HomeScreen}/>
    <BottomTab.Screen name='Places' component={PlacesScreen}/>
    <BottomTab.Screen name='Settings' component={SettingsScreen}/>
  </BottomTab.Navigator>
);

const App = () => (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
);

export default App;