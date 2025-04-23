import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';

export default function RainForecastScreen() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 46.603354,
        longitude: 1.888334,
        latitudeDelta: 5,
        longitudeDelta: 5,
      }}
    >
      <UrlTile
        urlTemplate={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=d6def4924ad5f9a9b59f3ae895b234cb`}
        maximumZ={19}
        tileSize={256}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
