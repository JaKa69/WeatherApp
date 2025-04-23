import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import RainForecastScreen from '../screens/RainForecastScreen';
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Accueil" component={HomeScreen} options={{ tabBarIcon: () => <FontAwesome name="home" size={20} /> }} />
    <Tab.Screen name="Pluie" component={RainForecastScreen} options={{ tabBarIcon: () => <FontAwesome name="cloud" size={20} /> }} />
    <Tab.Screen name="Recherche" component={SearchScreen} options={{ tabBarIcon: () => <FontAwesome name="search" size={20} /> }} />
  </Tab.Navigator>
);

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Navigation" component={BottomTabs} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
