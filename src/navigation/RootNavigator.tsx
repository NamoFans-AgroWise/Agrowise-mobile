import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainTabNavigator } from './MainTabNavigator';
import {
  LoginScreen,
  DevicePairingScreen,
  FieldSetupScreen,
  CropSetupScreen,
  FarmAnalyticsScreen,
} from '../screens';
import type { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="DevicePairing"
          component={DevicePairingScreen}
          options={{ presentation: 'fullScreenModal' }}
        />
        <Stack.Screen name="FieldSetup" component={FieldSetupScreen} />
        <Stack.Screen name="CropSetup" component={CropSetupScreen} />
        <Stack.Screen name="FarmAnalytics" component={FarmAnalyticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
