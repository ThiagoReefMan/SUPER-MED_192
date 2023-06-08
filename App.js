import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Header from './src/components/Header';
import TabNavigator from './src/components/TabNavigator';

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});

export default App;
