import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import MainNavigator from './component/MainNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
