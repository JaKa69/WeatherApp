// Weather.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ShowIcon from './ShowIcon';

const Weather = ({ forecast }) => {
  const formattedDate = forecast.date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  return (
    <View style={styles.container}>
      <Text style={styles.hour}>{formattedDate}</Text>
      <Text style={styles.hour}>{forecast.hour}:00</Text>
      <ShowIcon icon={forecast.icon} size={50} />
      <Text style={styles.temp}>{forecast.temp} °C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hour: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 18,
    marginTop: 5,
  },
});

export default Weather;
