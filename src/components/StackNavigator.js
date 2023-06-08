import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import StarOfLifeScreen from '../screens/StarOfLifeScreen';
import ChamadasScreen from '../screens/ChamadasScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="StarOfLifeScreen"
        component={StarOfLifeScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChamadasScreen"
        component={ChamadasScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
