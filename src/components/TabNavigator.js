import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import StarOfLifeScreen from '../screens/StarOfLifeScreen';
import ChamadasScreen from '../screens/ChamadasScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          if (route.name === 'LOGIN') {
            // Ícone personalizado para a tela de Login
            iconComponent = <MaterialIcons name="login" size={30} color={color} />;
          } else if (route.name === 'CHAMADA DE URGÊNCIA') {
            // Ícone personalizado para a tela de StarOfLife
            iconComponent = <FontAwesome5 name="star-of-life" size={40} color={color} />;
          } else if (route.name === 'REGISTRO DAS CHAMADAS') {
            // Ícone personalizado para a tela de Chamadas
            iconComponent = <SimpleLineIcons name="calendar" size={30} color={color} />;
          }

          return iconComponent;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'grey',
        showLabel: false,
        tabStyle: styles.tabStyle,
      }}
      headerMode="float" // Define o cabeçalho como "float"
    >
      <Tab.Screen
        name="LOGIN"
        component={LoginScreen}
        options={{
          headerShown: true, // Exibe o cabeçalho na tela de Login
        }}
      />
      <Tab.Screen
        name="CHAMADA DE URGÊNCIA"
        component={StarOfLifeScreen}
        options={{
          headerShown: true, // Exibe o cabeçalho na tela de StarOfLife
        }}
      />
      <Tab.Screen
        name="REGISTRO DAS CHAMADAS"
        component={ChamadasScreen}
        options={{
          headerShown: true, // Exibe o cabeçalho na tela de Chamadas
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default TabNavigator;
