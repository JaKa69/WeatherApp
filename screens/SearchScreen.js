import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ForecastWeather from '../component/ForecastWeather';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';

export default function SearchScreen() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const stored = await AsyncStorage.getItem('searchHistory');
    if (stored) setHistory(JSON.parse(stored));
  };

  const saveSearch = async (cityName) => {
    const updated = [cityName, ...history.filter(c => c !== cityName)].slice(0, 5);
    setHistory(updated);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(updated));
  };

  const updateCitySuggestions = async (input) => {
    setCity(input);
    if (input.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=10&appid=${API_KEY}`
        );
        setCitySuggestions(response.data);
      } catch {
        setCitySuggestions([]);
      }
    } else {
      setCitySuggestions([]);
    }
  };

  const searchCityWeather = async (selectedCity = city) => {
    setLoading(true);
    try {
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${API_KEY}`
      );
      if (geoResponse.data.length > 0) {
        const { lat, lon, name } = geoResponse.data[0];
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        saveSearch(name);
        setCity('');
        setCitySuggestions([]);
      }
    } catch {
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Entrez une ville"
        value={city}
        onChangeText={updateCitySuggestions}
        style={styles.input}
      />
      <Button title="Rechercher" onPress={() => searchCityWeather()} />

      {citySuggestions.length > 0 && (
        <FlatList
          data={citySuggestions}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => searchCityWeather(item.name)}>
              <Text style={styles.suggestionItem}>
                {item.name}, {item.country}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.subtitle}>Dernières recherches :</Text>
      {history.map((item, i) => (
        <TouchableOpacity key={i} onPress={() => searchCityWeather(item)}>
          <Text style={styles.historyItem}>• {item}</Text>
        </TouchableOpacity>
      ))}

      {loading && <ActivityIndicator />}
      {weatherData && <ForecastWeather data={weatherData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subtitle: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  historyItem: {
    paddingVertical: 4,
    fontStyle: 'italic',
  },
});
