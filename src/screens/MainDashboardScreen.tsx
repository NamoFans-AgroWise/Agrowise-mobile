import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../hooks';
import * as Speech from 'expo-speech';
import { useTranslation } from 'react-i18next';

const comingSoon = (feature: string) =>
  Alert.alert('Coming Soon', `${feature} will be available in a future update.`);

export const MainDashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  // Real-time state from Redux
  const auth = useAppSelector((state) => state.auth);
  const { devices } = useAppSelector((state) => state.devices);
  const { alerts } = useAppSelector((state) => state.alerts);
  const { isDarkMode } = useAppSelector((state) => state.settings);

  // Derive active data
  const mainSpike = useMemo(() =>
    devices.find(d => d.type === 'soil_sensor' && d.status === 'online') || devices[0],
  [devices]);

  const activeAlert = useMemo(() =>
    alerts.find(a => !a.isRead && (a.severity === 'critical' || a.severity === 'warning')) || alerts[0],
  [alerts]);

  const handleListen = (title: string, message: string) => {
    Speech.speak(`${title}. ${message}`, { language: 'en-IN' });
  };

  const mockMoisture = 45;
  const moistureOffset = 198 - (198 * (mockMoisture / 100));

  const getMoistureStatus = (v: number) =>
    v < 20 ? { label: 'Critical', color: 'text-red-500' } :
    v < 35 ? { label: 'Low', color: 'text-orange-500' } :
    v <= 65 ? { label: 'Optimal', color: 'text-primary' } :
              { label: 'High', color: 'text-blue-500' };
  const moistureStatus = getMoistureStatus(mockMoisture);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      {/* Header Section */}
      <View className="px-4 pt-4 pb-2 bg-background-light/95 dark:bg-background-dark/95">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
             <Image
              source={{ uri: auth.user?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDvYShHGdbW9ePa4gJ6Tr8d2JCLN-9SnXtoBTMV1aHQ0mhh90QGTSYHfOK4kMJuYjah4gNzLXcyeeNosAqYz9IP4vwAPu2dv41N--aZTTDiTuIraurAJcA2s_ieChWM45ZGFrZVIOj3LUT2rxRHr9wz39DbuZrgmKJbhll7NxDLz0tlazAMTRzEZSBCnvSDQcmpWIFTVhFVkdOgPtSux61zIrIuFall0vrstCv3S4WB5mU1edxJLsUsRKSl7OiavRzEAEGoT9bgQ7A' }}
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
            <View>
              <Text className="text-xl font-bold dark:text-white">
                {t('common.welcome')}, {auth.user?.name || 'Rajesh'}
              </Text>
              <Text className="text-xs text-secondary font-medium">Punjab, India</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Notifications', `${alerts.filter(a => !a.isRead).length} unread alerts`)}
            className="w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark items-center justify-center shadow-sm"
          >
            <MaterialCommunityIcons name="bell-outline" size={24} color={isDarkMode ? "#94a3b8" : "#4b5563"} />
          </TouchableOpacity>
        </View>

        {/* Weather Widget */}
        <View className="flex-row items-center justify-between bg-surface-light dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <View className="flex-row items-center gap-3">
            <View className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
              <MaterialCommunityIcons name="cloud" size={20} color="#3b82f6" />
            </View>
            <View>
              <Text className="text-sm font-bold dark:text-white">32°C</Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400">Rain in 2 days</Text>
            </View>
          </View>
          <View className="bg-[#fdf8f4] dark:bg-[#3d2e24] px-2 py-1 rounded">
            <Text className="text-xs font-medium text-secondary">Partly Cloudy</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {/* Soil Thirst Gauge */}
        <View className="items-center justify-center mb-8">
          <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
            Soil Thirst (Moisture)
          </Text>
          <View className="relative w-64 h-64 items-center justify-center">
            <Svg width="200" height="200" viewBox="0 0 100 100" style={{ transform: [{ rotate: '135deg' }] }}>
              <Circle
                cx="50"
                cy="50"
                r="42"
                stroke={isDarkMode ? "#162219" : "#e5e7eb"}
                strokeWidth="8"
                fill="none"
                strokeDasharray="198"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              <Circle
                cx="50"
                cy="50"
                r="42"
                stroke="#10b77f"
                strokeWidth="8"
                fill="none"
                strokeDasharray="198"
                strokeDashoffset={moistureOffset}
                strokeLinecap="round"
              />
            </Svg>
            <View className="absolute inset-0 items-center justify-center">
              <MaterialCommunityIcons name="water" size={32} color="#10b77f" />
              <Text className="text-5xl font-bold dark:text-white tracking-tighter">{mockMoisture}%</Text>
              <View className="mt-2 px-3 py-1 bg-primary/10 rounded-full">
                <Text className={`text-sm font-bold ${moistureStatus.color}`}>{moistureStatus.label}</Text>
              </View>
            </View>
            <Text className="absolute bottom-6 left-10 text-[10px] font-bold text-secondary dark:text-slate-500">Dry</Text>
            <Text className="absolute bottom-6 right-10 text-[10px] font-bold text-blue-500">Wet</Text>
          </View>
          <Text className="text-sm text-center text-slate-500 dark:text-slate-400 max-w-[240px] mt-4">
            Your soil moisture is perfect for the current wheat crop stage.
          </Text>
        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap justify-between gap-3 mb-6">
          <View className="w-[48%] bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-50 dark:border-slate-800">
            <View className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/20 items-center justify-center mb-3">
              <MaterialCommunityIcons name="thermometer" size={18} color="#f97316" />
            </View>
            <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium">Soil Temp</Text>
            <Text className="text-xl font-bold dark:text-white mt-0.5">32°C</Text>
          </View>

          <View className="w-[48%] bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-50 dark:border-slate-800">
            <View className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 items-center justify-center mb-3">
              <MaterialCommunityIcons name="water-percent" size={18} color="#3b82f6" />
            </View>
            <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium">Humidity</Text>
            <Text className="text-xl font-bold dark:text-white mt-0.5">65%</Text>
          </View>

          <View className="w-full bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-50 dark:border-slate-800 flex-row justify-between items-center">
            <View>
              <View className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 items-center justify-center mb-2">
                <MaterialCommunityIcons name="battery-80" size={18} color="#10b77f" />
              </View>
              <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sensor Battery</Text>
              <Text className="text-xl font-bold dark:text-white mt-0.5">
                {mainSpike?.batteryLevel || 85}%
              </Text>
            </View>
            <View className="bg-primary/10 px-2 py-1 rounded">
              <Text className="text-xs font-bold text-primary">
                {mainSpike?.status === 'online' ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>

        {/* Alert Panel (Functional) */}
        {activeAlert && (
          <View className={`mb-6 rounded-xl border p-4 shadow-sm overflow-hidden ${
            activeAlert.severity === 'critical'
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50'
              : 'bg-orange-50 dark:bg-orange-950/40 border-orange-100 dark:border-orange-900/50'
          }`}>
            <View className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-red-100 dark:bg-red-800/20 opacity-50" />
            <View className="flex-row items-start gap-3">
              <View className={`p-2 rounded-full shrink-0 ${
                activeAlert.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/40' : 'bg-orange-100 dark:bg-orange-900/40'
              }`}>
                <MaterialCommunityIcons
                  name={activeAlert.type === 'irrigation' ? 'water-alert' : 'alert-circle'}
                  size={20}
                  color={activeAlert.severity === 'critical' ? '#dc2626' : '#ea580c'}
                />
              </View>
              <View className="flex-1">
                <Text className={`font-bold text-sm ${
                  activeAlert.severity === 'critical' ? 'text-red-800 dark:text-red-200' : 'text-orange-800 dark:text-orange-200'
                }`}>
                  {activeAlert.title}
                </Text>
                <Text className={`text-xs mt-1 leading-relaxed ${
                  activeAlert.severity === 'critical' ? 'text-red-600 dark:text-red-300' : 'text-orange-600 dark:text-orange-300'
                }`}>
                  {activeAlert.message}
                </Text>
              </View>
              <View className="flex-col gap-2">
                <TouchableOpacity
                  onPress={() => handleListen(activeAlert.title, activeAlert.message)}
                  className="w-10 h-10 items-center justify-center rounded-full bg-white/50 dark:bg-slate-800/50 shadow-sm"
                >
                  <Ionicons name="volume-high" size={20} color={isDarkMode ? "#94a3b8" : "#4b5563"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Diagnosis')}
                  className={`px-3 py-2 rounded-lg ${
                    activeAlert.severity === 'critical' ? 'bg-red-600' : 'bg-orange-600'
                  }`}
                >
                  <Text className="text-white text-xs font-bold">Act Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Recent Diagnosis */}
        <View className="mb-24">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-lg font-bold dark:text-white">Recent Diagnosis</Text>
            <TouchableOpacity onPress={() => comingSoon('Diagnosis history')}>
              <Text className="text-primary text-xs font-bold uppercase tracking-widest">View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            <View className="w-64 bg-surface-light dark:bg-surface-dark p-3 rounded-lg border border-slate-100 dark:border-gray-800 flex-row items-center shadow-sm mr-4">
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZK8qgMk7BLRZZTmuPCiTsciHQBoXWdbYlok34H8MSG8x2AEli_h21kochHp8hel1HYoeaFhA-QV-EGQecEPYlxAWzhkaP1H4q96NtvcpldyU6ZO7C9WcXQzUVaYQwIxu5tKlU4mLJdQke408j4UUsmdTU7D2GwfOAHbwblgv34TONlB1kIueTa6_MsLRoZVDlafPTLRs7GisSRVFvFeN1_b7-2DKNP4VuIqJeqGxrb8vjuazCNEZ30i_uXRDr_PymVw87I5BLQ1LX' }}
                className="w-14 h-14 rounded-xl"
              />
              <View className="ml-4 flex-1">
                <Text className="text-sm font-bold dark:text-white" numberOfLines={1}>Yellow Rust Detected</Text>
                <Text className="text-[10px] text-slate-500 mt-1">2 days ago • Field 1</Text>
              </View>
            </View>
            <View className="w-64 bg-surface-light dark:bg-surface-dark p-3 rounded-lg border border-slate-100 dark:border-gray-800 flex-row items-center shadow-sm">
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRyuZ9JNtvzDngAFS52MU2L3MlsW94R8VmMcOwjZRBsF5Dwj1WN9_f0kUp4wzDrNs6ftN1omraMAzJsFNom3IENQ3sSIEgxbx0HtpjIL68E5BqOFlLXMZ-z7kGwanQH2ETE9hcDcp2qudwGlQsvunACW9XSvN-cl1jbSAStAF6yIbh8FUxKUTI9B_YCDDoxs7o7NM_qshdaGUPGkWtkc-PvwiV9bjF676KhoXUJhgYac5nVnTtBaj-dVYCVatiU5OWgNa1mufLqIt5' }}
                className="w-14 h-14 rounded-xl"
              />
              <View className="ml-4 flex-1">
                <Text className="text-sm font-bold dark:text-white" numberOfLines={1}>Healthy Growth</Text>
                <Text className="text-[10px] text-slate-500 mt-1">5 days ago • Field 2</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
