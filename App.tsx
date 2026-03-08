import "./global.css";

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { store, persistor } from './src/app/store';
import { RootNavigator } from './src/navigation';
import './src/i18n';

function LoadingScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0fdf4' }}>
      <ActivityIndicator size="large" color="#10b77f" />
    </View>
  );
}

import { useAppSelector } from './src/hooks';

function MainApp() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
  });
  const isDarkMode = useAppSelector((state) => state.settings.isDarkMode);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <View className={`flex-1 ${isDarkMode ? 'dark' : ''}`}>
      <SafeAreaProvider>
        <RootNavigator />
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </SafeAreaProvider>
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
}
