// ForecastWeather.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Weather from './Weather';

const ForecastWeather = ({ data }) => {
  const [forecastList, setForecastList] = useState([]);

  useEffect(() => {
    if (data && data.list) {
      const groupedForecasts = data.list.map(forcast => {
        let forecastDate = new Date(forcast.dt_txt);
        return {
          date: forecastDate,
          hour: forecastDate.getHours(),
          temp: forcast.main.temp,
          icon: forcast.weather[0].icon,
        };
      });
      setForecastList(groupedForecasts);
    }
  }, [data]);

  return (
    <ScrollView horizontal style={styles.scrollView}>
      {forecastList.map((forecast, index) => (
        <Weather key={index} forecast={forecast} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: 10,
  },
});

export default ForecastWeather;
