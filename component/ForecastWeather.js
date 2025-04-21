import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Weather from './Weather';

const ForecastWeather = ({ data }) => {
  const [groupedForecasts, setGroupedForecasts] = useState({});

  useEffect(() => {
    if (data && data.list) {
      const groups = {};

      data.list.forEach((forecast) => {
        const forecastDate = new Date(forecast.dt_txt);
        const dateKey = forecastDate.toISOString().split('T')[0];

        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }

        groups[dateKey].push({
          date: forecastDate,
          hour: forecastDate.getHours(),
          temp: forecast.main.temp,
          icon: forecast.weather[0].icon,
        });
      });

      setGroupedForecasts(groups);
    }
  }, [data]);

  const formatDateLabel = (dateKey) => {
    const todayKey = new Date().toISOString().split('T')[0];
    if (dateKey === todayKey) return "Aujourd'hui";

    const date = new Date(dateKey);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        {Object.entries(groupedForecasts).map(([dateKey, forecasts]) => (
          <View key={dateKey} style={styles.dayGroup}>
            <Text style={styles.dateLabel}>{formatDateLabel(dateKey)}</Text>
            <View style={styles.weatherRow}>
              {forecasts.map((forecast, index) => (
                <Weather key={index} forecast={forecast} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  dayGroup: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 16,
    alignSelf:'flex-start',
    fontWeight: 'bold',
  },
});

export default ForecastWeather;
