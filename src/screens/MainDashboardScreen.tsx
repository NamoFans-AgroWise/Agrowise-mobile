import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../hooks';
import {
  IrrigationAlertCard,
  WeatherCard,
  CropHealthCard,
  DiseaseAlertCard,
  DeviceStatusCard,
} from '../components/dashboard';
import { Card } from '../components/ui';

export const MainDashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const alerts = useAppSelector((state) => state.alerts.alerts);
  const unreadCount = useAppSelector((state) => state.alerts.unreadCount);
  const devices = useAppSelector((state) => state.devices.devices);
  const fields = useAppSelector((state) => state.fields.fields);
  const selectedFieldId = useAppSelector((state) => state.fields.selectedFieldId);

  const selectedField = fields.find((f) => f.id === selectedFieldId);
  const irrigationAlert = alerts.find((a) => a.type === 'irrigation' && !a.isRead);
  const diseaseAlert = alerts.find((a) => a.type === 'disease' && !a.isRead);

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-primary items-center justify-center mr-3 border-2 border-primary-dark">
            <Text className="text-white text-lg font-bold">
              {user?.name?.charAt(0) || 'U'}
            </Text>
          </View>
          <View>
            <Text className="text-xl font-bold text-gray-900">
              {t('greeting.namaste')}, {user?.name?.split(' ')[0] || 'Farmer'}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={14} color="#6b7280" />
              <Text className="text-sm text-gray-500 ml-1">
                {user?.location || 'India'}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="relative">
          <Ionicons name="notifications-outline" size={28} color="#374151" />
          {unreadCount > 0 && (
            <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger items-center justify-center">
              <Text className="text-white text-xs font-bold">{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Field Selector */}
        {selectedField && (
          <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 mb-4 mt-2">
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="map-marker-outline" size={20} color="#10b77f" />
              <Text className="ml-2 font-semibold text-gray-900">{selectedField.name}</Text>
              {selectedField.crop && (
                <Text className="ml-2 text-gray-500">• {selectedField.crop.name}</Text>
              )}
            </View>
            <Ionicons name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}

        {/* Irrigation Alert */}
        {irrigationAlert && (
          <View className="mb-4">
            <IrrigationAlertCard
              moisture={28}
              recommendation="15-20 liters per plant recommended"
            />
          </View>
        )}

        {/* Disease Alert */}
        {diseaseAlert && (
          <View className="mb-4">
            <DiseaseAlertCard
              disease="Yellow Rust Detected"
              severity="critical"
              message="Early signs detected in wheat. Immediate fungicide application recommended."
            />
          </View>
        )}

        {/* Weather & Crop Health */}
        <View className="flex-row gap-3 mb-4">
          <WeatherCard temperature={24} condition="Sunny" humidity={65} />
        </View>

        <View className="flex-row gap-3 mb-4">
          <CropHealthCard healthScore={85} status="good" />
        </View>

        {/* Quick Stats */}
        <Card variant="elevated" className="mb-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            {t('dashboard.soilMoisture')}
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-3xl font-extrabold text-primary">28%</Text>
              <Text className="text-sm text-gray-500">Current</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-extrabold text-gray-600">45%</Text>
              <Text className="text-sm text-gray-500">Optimal</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-extrabold text-action">-17%</Text>
              <Text className="text-sm text-gray-500">Deficit</Text>
            </View>
          </View>
        </Card>

        {/* Devices Section */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">{t('devices.title')}</Text>
            <TouchableOpacity>
              <Text className="text-primary font-semibold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {devices.slice(0, 2).map((device) => (
              <DeviceStatusCard key={device.id} device={device} />
            ))}
          </View>
        </View>

        {/* Crop Info */}
        {selectedField?.crop && (
          <Card variant="elevated" className="mb-4">
            <View className="flex-row items-center">
              {selectedField.crop.imageUrl && (
                <Image
                  source={{ uri: selectedField.crop.imageUrl }}
                  className="w-20 h-20 rounded-2xl mr-4"
                />
              )}
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  {selectedField.crop.name}
                  {selectedField.crop.nameHindi && ` (${selectedField.crop.nameHindi})`}
                </Text>
                <Text className="text-sm text-gray-500">
                  {t('crops.variety')}: {selectedField.crop.variety}
                </Text>
                <Text className="text-sm text-gray-500">
                  {t('crops.sowingDate')}: {selectedField.crop.sowingDate}
                </Text>
              </View>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
