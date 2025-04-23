import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import CurrentWeather from '../component/CurrentWeather';
import ForecastWeather from '../component/ForecastWeather';
import { ScrollView } from 'react-native-gesture-handler';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Accès à la localisation refusé');
      setLoading(false);
      return;
    }
    try {
      let position = await Location.getCurrentPositionAsync({});
      fetchWeather(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      setErrorMsg('Erreur lors de la localisation');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      setErrorMsg('Erreur lors de la récupération des données météo');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getCurrentLocationWeather} style={styles.refreshButton}>
        <FontAwesome name="location-arrow" size={24} color="white" />
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {weatherData && (
        <>
          <CurrentWeather data={weatherData} />
          <ScrollView horizontal>
            <ForecastWeather data={weatherData} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  refreshButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
});
