import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface WeatherCardProps {
  temperature: number;
  condition: string;
  humidity: number;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  condition,
  humidity,
}) => {
  const { t } = useTranslation();

  const getWeatherIcon = (cond: string): keyof typeof MaterialCommunityIcons.glyphMap => {
    switch (cond.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'weather-sunny';
      case 'cloudy':
        return 'weather-cloudy';
      case 'rainy':
      case 'rain':
        return 'weather-rainy';
      case 'partly cloudy':
        return 'weather-partly-cloudy';
      default:
        return 'weather-sunny';
    }
  };

  return (
    <View
      className="bg-white rounded-3xl p-4 flex-row items-center flex-1"
      style={{ borderLeftWidth: 8, borderLeftColor: '#3b82f6' }}
    >
      <MaterialCommunityIcons name={getWeatherIcon(condition)} size={48} color="#3b82f6" />
      <View className="ml-4 flex-1">
        <Text className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {t('dashboard.weather')}
        </Text>
        <Text className="text-2xl font-extrabold text-gray-900">
          {temperature}°C
        </Text>
        <Text className="text-sm text-gray-500">
          {condition} • {humidity}% {t('dashboard.humidity').toLowerCase()}
        </Text>
      </View>
    </View>
  );
};
