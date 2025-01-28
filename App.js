import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import axios from 'axios';
import CurrentWeather from './component/CurrentWeather';
import ForecastWeather from './component/ForecastWeather';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log('Permission status:', status);

    if (status !== 'granted') {
      setErrorMsg('Accès à la localisation refusé');
      setLoading(false);
      return;
    }

    try {
      let position = await Location.getCurrentPositionAsync({});
      console.log('Position:', position);
      setLocation(position.coords);
      fetchWeather(position.coords.latitude, position.coords.longitude);
      setCity('');
    } catch (error) {
      console.error('Erreur en récupérant la position:', error);
      setErrorMsg('Impossible de récupérer la position');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
      setErrorMsg('Erreur lors de la récupération des données météo');
    } finally {
      setLoading(false);
    }
  };

  const searchCityWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (geoResponse.data.length > 0) {
        const { lat, lon } = geoResponse.data[0];
        fetchWeather(lat, lon);
      } else {
        setErrorMsg('Ville introuvable');
      }
    } catch (error) {
      console.error('Erreur lors de la géolocalisation de la ville:', error);
      setErrorMsg('Erreur lors de la géolocalisation de la ville');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <View style={styles.topContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entrez une ville"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Rechercher" onPress={searchCityWeather} />
        <TouchableOpacity onPress={getCurrentLocationWeather} style={styles.locationButton}>
          <FontAwesome name="location-arrow" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {weatherData && !loading && <CurrentWeather data={weatherData} />}
      </View>

      {weatherData && !loading && (
        <ScrollView horizontal style={styles.scrollView}>
          <ForecastWeather data={weatherData} />
        </ScrollView>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
  topContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botContainer: {
    marginBottom: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    padding: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  locationButton: {
    marginRight: 5,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
