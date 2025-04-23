import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import RainForecastScreen from './screens/RainForecastScreen';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
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
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
