import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface CropHealthCardProps {
  healthScore: number;
  status: 'excellent' | 'good' | 'moderate' | 'poor';
}

const statusColors = {
  excellent: '#10b77f',
  good: '#22c55e',
  moderate: '#f59e0b',
  poor: '#DC2626',
} as const;

const statusLabels = {
  excellent: 'Excellent',
  good: 'Good',
  moderate: 'Moderate',
  poor: 'Poor',
} as const;

export const CropHealthCard: React.FC<CropHealthCardProps> = ({
  healthScore,
  status,
}) => {
  const { t } = useTranslation();
  const color = statusColors[status];

  return (
    <View
      className="bg-white rounded-3xl p-4 flex-row items-center flex-1"
      style={{ borderLeftWidth: 8, borderLeftColor: color }}
    >
      <MaterialCommunityIcons name="leaf" size={48} color={color} />
      <View className="ml-4 flex-1">
        <Text className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {t('dashboard.cropHealth')}
        </Text>
        <Text className="text-2xl font-extrabold text-gray-900">
          {healthScore}%
        </Text>
        <Text style={{ color }}>{statusLabels[status]}</Text>
      </View>
    </View>
  );
};
