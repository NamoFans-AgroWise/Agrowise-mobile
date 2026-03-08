import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  toggleDarkMode,
  toggleNotifications,
  toggleVoice,
  setLanguage,
} from '../features/settingsSlice';
import { logout } from '../features/authSlice';
import { useTranslation } from 'react-i18next';

const comingSoon = (feature: string) =>
  Alert.alert('Coming Soon', `${feature} will be available in a future update.`);

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { isDarkMode, notificationsEnabled, voiceEnabled, language } = useAppSelector(state => state.settings);
  const { devices } = useAppSelector(state => state.devices);

  const handleLogout = () => Alert.alert('Logout', 'Are you sure you want to logout?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Logout', style: 'destructive', onPress: () => { dispatch(logout()); navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); } }
  ]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-background-dark">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      {/* Top App Bar */}
      <View className="flex-row items-center px-4 py-4 justify-between bg-white dark:bg-background-dark/95 border-b border-slate-200 dark:border-slate-800">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={isDarkMode ? "#ffffff" : "#1e293b"} />
        </TouchableOpacity>
        <Text className="text-lg font-bold dark:text-white">Settings</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="p-4">
          <View className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800/50">
            <View className="flex-row items-center gap-4">
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTX7O25lbL22k7fKIBibkXR4oxV3LvCFfStqvu6wBQjcGClDF7EZEfuTFizBFrUm45SCI9KjZ44nn0UjqraWcT-WWn2T2dzTi0yA4IyvvyZnoRaeAAKl2vd2yxUWH9Wf5_GbzNcYgJS2Mb_OI6hQbtSk8ItdhEOCAILQtbFKszjg7CpG1tTZtwuxl0rBgK_EMfnq2Q47fAkyHj5DHFcxHYVtJC2wxMq3PVNhRXgEz2n6S2PlyYc7z6-Hj1rGesIekpnHD_L1FIMURB' }}
                className="w-20 h-20 rounded-full border-2 border-primary/20"
              />
              <View className="flex-1">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-xl font-bold dark:text-white">Rajesh Kumar</Text>
                    <View className="flex-row items-center gap-1 mt-1">
                      <MaterialCommunityIcons name="map-marker" size={14} color="#10b77f" />
                      <Text className="text-primary text-sm font-medium">Ludhiana District</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => comingSoon('Edit Profile')}>
                    <MaterialCommunityIcons name="square-edit-outline" size={20} color="#10b77f" />
                  </TouchableOpacity>
                </View>
                <Text className="text-gray-500 dark:text-gray-400 text-xs mt-2">Member since 2021</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Active Devices */}
        <View className="px-4">
          <View className="flex-row justify-between items-end mb-2 pt-2">
            <Text className="text-lg font-bold dark:text-white">Active Spikes</Text>
            <TouchableOpacity onPress={() => comingSoon('Add Device')} className="flex-row items-center gap-1">
              <MaterialCommunityIcons name="plus" size={16} color="#10b77f" />
              <Text className="text-primary text-sm font-semibold">Add Device</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            {devices.map(device => {
              const isOnline = device.status === 'online';
              return (
                <TouchableOpacity key={device.id}
                  onPress={() => comingSoon(`${device.name} details`)}
                  className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex-row items-center gap-4 mb-3"
                >
                  <View className={`w-12 h-12 rounded-full items-center justify-center ${isOnline ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                    <MaterialCommunityIcons name={isOnline ? 'wifi' : 'wifi-off'} size={24} color={isOnline ? '#10b77f' : '#ea580c'} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold dark:text-white">{device.name}</Text>
                    <View className="flex-row items-center gap-3 mt-1">
                      <View className={`flex-row items-center gap-1 px-2 py-0.5 rounded-full ${isOnline ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-orange-50 dark:bg-orange-900/20'}`}>
                        <View className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                        <Text className={`text-xs font-medium ${isOnline ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600 dark:text-orange-400'}`}>
                          {isOnline ? 'Online' : 'Needs Sync'}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name={device.batteryLevel > 60 ? 'battery-80' : 'battery-30'} size={14} color="#64748b" />
                        <Text className="text-gray-500 text-xs">{device.batteryLevel}%</Text>
                      </View>
                    </View>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Appearance Section */}
        <View className="p-4">
          <Text className="text-lg font-bold dark:text-white mb-2 pt-2">Appearance</Text>
          <View className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-start gap-3 flex-1">
                <MaterialCommunityIcons name="theme-light-dark" size={20} color="#94a3b8" />
                <View>
                  <Text className="font-medium text-sm dark:text-white">Dark Mode</Text>
                  <Text className="text-gray-500 text-xs">Switch between light and dark themes</Text>
                </View>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={() => { dispatch(toggleDarkMode()); }}
                trackColor={{ false: '#e2e8f0', true: '#10b77f' }}
              />
            </View>
            <View className="flex-row items-center justify-between p-4 border-t border-slate-100 dark:border-slate-800">
              <View className="flex-row items-start gap-3 flex-1">
                <MaterialCommunityIcons name="translate" size={20} color="#94a3b8" />
                <Text className="font-medium text-sm dark:text-white">Language</Text>
              </View>
              <View className="flex-row rounded-lg bg-slate-100 dark:bg-black/20 p-1">
                {(['en', 'hi'] as const).map(lang => (
                  <TouchableOpacity key={lang}
                    onPress={() => { dispatch(setLanguage(lang)); i18n.changeLanguage(lang); }}
                    className={`rounded-md px-3 py-1.5 ${language === lang ? 'bg-white dark:bg-background-dark shadow-sm' : ''}`}
                  >
                    <Text className={`text-xs font-semibold ${language === lang ? 'text-primary' : 'text-slate-500'}`}>
                      {lang === 'en' ? 'Eng' : 'हिंदी'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Calibration Section */}
        <View className="p-4">
          <Text className="text-lg font-bold dark:text-white mb-1 pt-2">Two-Point Calibration</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm mb-4">Calibrate your soil sensors monthly to ensure accurate AI crop diagnosis.</Text>
          <View className="flex-row gap-4">
            {/* Dry Calibration */}
            <TouchableOpacity
              onPress={() => Alert.alert('Dry Calibration', 'Hold the sensor tip in open air for 5 seconds to calibrate the dry point.')}
              className="flex-1 items-center justify-center p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border-2 border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <View className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 items-center justify-center mb-3">
                <MaterialCommunityIcons name="weather-sunny" size={30} color="#f59e0b" />
              </View>
              <Text className="text-sm font-bold dark:text-white">Calibrate Dry</Text>
              <Text className="text-[10px] text-slate-500 dark:text-slate-400">(Air)</Text>
            </TouchableOpacity>

            {/* Wet Calibration */}
            <TouchableOpacity
              onPress={() => Alert.alert('Wet Calibration', 'Submerge the sensor tip in water for 5 seconds to calibrate the wet point.')}
              className="flex-1 items-center justify-center p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border-2 border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <View className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 items-center justify-center mb-3">
                <MaterialCommunityIcons name="water" size={30} color="#3b82f6" />
              </View>
              <Text className="text-sm font-bold dark:text-white">Calibrate Wet</Text>
              <Text className="text-[10px] text-slate-500 dark:text-slate-400">(Water)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications Section */}
        <View className="p-4">
          <Text className="text-lg font-bold dark:text-white mb-2 pt-2">Notifications</Text>
          <View className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <View className="flex-row items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <View className="flex-row items-start gap-3 flex-1">
                <MaterialCommunityIcons name="chat-processing-outline" size={20} color="#94a3b8" />
                <View>
                  <Text className="font-medium text-sm dark:text-white">Enable SMS Alerts</Text>
                  <Text className="text-gray-500 text-xs">Receive critical soil health updates</Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={() => { dispatch(toggleNotifications()); }}
                trackColor={{ false: '#e2e8f0', true: '#10b77f' }}
              />
            </View>

            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-start gap-3 flex-1">
                <MaterialCommunityIcons name="microphone-outline" size={20} color="#94a3b8" />
                <View>
                  <Text className="font-medium text-sm dark:text-white">Voice Notifications</Text>
                  <Text className="text-gray-500 text-xs">Hear alerts in Hindi & English</Text>
                </View>
              </View>
              <Switch
                value={voiceEnabled}
                onValueChange={() => { dispatch(toggleVoice()); }}
                trackColor={{ false: '#e2e8f0', true: '#10b77f' }}
              />
            </View>
          </View>
        </View>

        {/* Logout Section */}
        <View className="px-4 mb-10">
          <TouchableOpacity
            onPress={handleLogout}
            className="w-full flex-row items-center justify-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40"
          >
            <MaterialCommunityIcons name="logout" size={20} color="#dc2626" />
            <Text className="font-bold text-red-600">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
