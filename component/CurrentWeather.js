// CurrentWeather.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './ShowIcon';

const CurrentWeather = ({ data }) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (data && data.list && data.city) {
      const todayWeather = data.list[0];
      setCurrentWeather({
        city: data.city.name,
        temperature: todayWeather.main.temp,
        description: todayWeather.weather[0].description,
        icon: todayWeather.weather[0].icon,
      });
    }
  }, [data]);

  if (!currentWeather) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{currentWeather.city}</Text>
      <ShowIcon icon={currentWeather.icon} size={100} />
      <Text style={styles.temperature}>{currentWeather.temperature} °C</Text>
      <Text style={styles.description}>{currentWeather.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 32,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default CurrentWeather;
