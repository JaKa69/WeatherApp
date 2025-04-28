import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './ShowIcon';

const Weather = ({ forecast }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.hour}>{forecast.hour}:00</Text>
      <ShowIcon icon={forecast.icon} size={50} />
      <Text style={styles.temp}>
        {Math.round(forecast.temp * 2) / 2} °C {/* arrondir la temp à x.5 */}
        </Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
