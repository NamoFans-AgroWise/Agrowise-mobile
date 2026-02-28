import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Badge } from '../ui';
import type { Device } from '../../types';

interface DeviceStatusCardProps {
  device: Device;
  onPress?: () => void;
}

const deviceIcons: Record<Device['type'], string> = {
  soil_sensor: 'water-percent',
  weather_station: 'weather-partly-cloudy',
  irrigation_controller: 'sprinkler-variant',
};

export const DeviceStatusCard: React.FC<DeviceStatusCardProps> = ({
  device,
  onPress,
}) => {
  const getBatteryIcon = (): string => {
    if (device.batteryLevel > 80) return 'battery';
    if (device.batteryLevel > 50) return 'battery-70';
    if (device.batteryLevel > 20) return 'battery-30';
    return 'battery-10';
  };

  const getBatteryColor = (): string => {
    if (device.batteryLevel > 50) return '#22c55e';
    if (device.batteryLevel > 20) return '#f59e0b';
    return '#DC2626';
  };

  const statusVariant = device.status === 'online' ? 'success' : device.status === 'offline' ? 'danger' : 'warning';
  const statusLabel = device.status === 'online' ? 'Online' : device.status === 'offline' ? 'Offline' : 'Pairing';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="bg-white rounded-3xl p-4 border border-gray-200"
    >
      <View className="flex-row items-center">
        <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center">
          <MaterialCommunityIcons name={deviceIcons[device.type] as any} size={28} color="#10b77f" />
        </View>

        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-gray-900">{device.name}</Text>
          <View className="flex-row items-center gap-2 mt-1">
            <Badge text={statusLabel} variant={statusVariant} size="sm" />
          </View>
        </View>

        <View className="items-end">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name={getBatteryIcon() as any} size={20} color={getBatteryColor()} />
            <Text className="ml-1 text-sm font-medium" style={{ color: getBatteryColor() }}>
              {device.batteryLevel}%
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" style={{ marginTop: 8 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
