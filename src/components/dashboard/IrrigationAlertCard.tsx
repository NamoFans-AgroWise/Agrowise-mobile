import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useTranslation } from 'react-i18next';

interface IrrigationAlertCardProps {
  moisture: number;
  recommendation: string;
  onPress?: () => void;
}

export const IrrigationAlertCard: React.FC<IrrigationAlertCardProps> = ({
  moisture,
  recommendation,
  onPress,
}) => {
  const { t } = useTranslation();

  const handleListen = () => {
    const message = `${t('alerts.irrigation')}. ${t('alerts.irrigationMessage')} ${recommendation}`;
    Speech.speak(message, { language: 'en-IN' });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-action rounded-3xl p-5 border-2 border-action-dark overflow-hidden"
    >
      <View className="absolute top-0 right-0 opacity-20">
        <MaterialCommunityIcons name="water" size={120} color="#fff" />
      </View>

      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="bg-white/20 w-14 h-14 rounded-2xl items-center justify-center mb-3">
            <MaterialCommunityIcons name="water-alert" size={28} color="#fff" />
          </View>

          <Text className="text-white text-4xl font-extrabold mb-1">
            {moisture}%
          </Text>
          <Text className="text-white text-lg font-bold mb-2">
            {t('alerts.irrigation')}
          </Text>
          <Text className="text-white/90 text-sm leading-5">
            {recommendation}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleListen}
          className="bg-black rounded-full px-4 py-2 flex-row items-center gap-2"
        >
          <Ionicons name="volume-high" size={18} color="#fff" />
          <Text className="text-white font-semibold">{t('common.listen')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
