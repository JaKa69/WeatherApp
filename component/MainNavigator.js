import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, Drawer } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import RainForecastScreen from '../screens/RainForecastScreen';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <Appbar.Content title="Weather App" />
      </Appbar.Header>

      {drawerOpen && (
        <View style={styles.drawerContainer}>
          <Drawer.Section>
          <Drawer.Item
            label="Accueil"
            onPress={() => {
              navigation.navigate('Accueil');
              setDrawerOpen(false);
            }}
          />

          <Drawer.Item
            label="Recherche"
            onPress={() => {
              navigation.navigate('Recherche');
              setDrawerOpen(false);
            }}
          />

          <Drawer.Item
            label="Précipitations"
            onPress={() => {
              navigation.navigate('Précipitations');
              setDrawerOpen(false);
            }}
          />

          </Drawer.Section>
        </View>
      )}

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Accueil') iconName = 'home';
            else if (route.name === 'Recherche') iconName = 'search';
            else if (route.name === 'Précipitations') iconName = 'cloud';
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Recherche" component={SearchScreen} />
        <Tab.Screen name="Précipitations" component={RainForecastScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    top: 56,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 10,
  },
});
