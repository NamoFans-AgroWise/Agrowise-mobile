import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { Badge } from '../ui';

interface DiseaseAlertCardProps {
  disease: string;
  severity: 'critical' | 'warning';
  message: string;
  onPress?: () => void;
}

export const DiseaseAlertCard: React.FC<DiseaseAlertCardProps> = ({
  disease,
  severity,
  message,
  onPress,
}) => {
  const handleListen = () => {
    Speech.speak(`${disease}. ${message}`, { language: 'en-IN' });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-danger rounded-3xl p-5 overflow-hidden"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-3">
            <Badge text={severity === 'critical' ? 'Critical' : 'Warning'} variant="danger" />
          </View>

          <Text className="text-white text-xl font-bold mb-2">{disease}</Text>
          <Text className="text-white/90 text-sm leading-5">{message}</Text>
        </View>

        <View className="items-center">
          <MaterialCommunityIcons name="alert-circle" size={48} color="#fff" />
          <TouchableOpacity
            onPress={handleListen}
            className="bg-white/20 rounded-full p-3 mt-3"
          >
            <Ionicons name="volume-high" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
