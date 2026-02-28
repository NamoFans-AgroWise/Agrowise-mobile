import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from '../hooks';
import { toggleDarkMode, setLanguage, toggleNotifications, toggleVoice } from '../features';
import { Card } from '../components/ui';
import { DeviceStatusCard } from '../components/dashboard';

interface SettingRowProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  title,
  subtitle,
  rightElement,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={!onPress}
    className="flex-row items-center py-4 border-b border-gray-100"
  >
    <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-4">
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-base font-medium text-gray-900">{title}</Text>
      {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
    </View>
    {rightElement || <Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
  </TouchableOpacity>
);

export const ProfileScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const settings = useAppSelector((state) => state.settings);
  const devices = useAppSelector((state) => state.devices.devices);
  const fields = useAppSelector((state) => state.fields.fields);

  const handleLanguageToggle = () => {
    const newLang = settings.language === 'en' ? 'hi' : 'en';
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="items-center py-6 bg-white">
          <View className="w-24 h-24 rounded-full bg-primary items-center justify-center mb-4 border-4 border-primary-dark">
            <Text className="text-white text-3xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text className="text-xl font-bold text-gray-900">{user?.name || 'User'}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={16} color="#6b7280" />
            <Text className="text-gray-500 ml-1">{user?.location || 'India'}</Text>
          </View>
          <View className="flex-row items-center mt-1">
            <Ionicons name="call-outline" size={16} color="#6b7280" />
            <Text className="text-gray-500 ml-1">{user?.phone || 'Not set'}</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around py-4 bg-white mt-2">
          <View className="items-center">
            <Text className="text-2xl font-bold text-primary">{fields.length}</Text>
            <Text className="text-sm text-gray-500">{t('fields.title')}</Text>
          </View>
          <View className="w-px h-12 bg-gray-200" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-primary">{devices.length}</Text>
            <Text className="text-sm text-gray-500">{t('devices.title')}</Text>
          </View>
          <View className="w-px h-12 bg-gray-200" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-primary">
              {fields.reduce((acc, f) => acc + (f.area || 0), 0)}
            </Text>
            <Text className="text-sm text-gray-500">Acres</Text>
          </View>
        </View>

        {/* Settings */}
        <View className="mt-4 px-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">{t('profile.settings')}</Text>

          <Card variant="elevated">
            <SettingRow
              icon={<Ionicons name="language" size={22} color="#10b77f" />}
              title={t('profile.language')}
              subtitle={settings.language === 'en' ? 'English' : 'हिंदी'}
              onPress={handleLanguageToggle}
              rightElement={
                <Text className="text-primary font-medium">
                  {settings.language === 'en' ? 'EN' : 'HI'}
                </Text>
              }
            />

            <SettingRow
              icon={<Ionicons name="moon" size={22} color="#10b77f" />}
              title={t('profile.darkMode')}
              rightElement={
                <Switch
                  value={settings.isDarkMode}
                  onValueChange={() => { dispatch(toggleDarkMode()); }}
                  trackColor={{ false: '#d1d5db', true: '#10b77f' }}
                  thumbColor="#fff"
                />
              }
            />

            <SettingRow
              icon={<Ionicons name="notifications" size={22} color="#10b77f" />}
              title={t('profile.notifications')}
              rightElement={
                <Switch
                  value={settings.notificationsEnabled}
                  onValueChange={() => { dispatch(toggleNotifications()); }}
                  trackColor={{ false: '#d1d5db', true: '#10b77f' }}
                  thumbColor="#fff"
                />
              }
            />

            <SettingRow
              icon={<Ionicons name="volume-high" size={22} color="#10b77f" />}
              title={t('profile.voiceAssistant')}
              rightElement={
                <Switch
                  value={settings.voiceEnabled}
                  onValueChange={() => { dispatch(toggleVoice()); }}
                  trackColor={{ false: '#d1d5db', true: '#10b77f' }}
                  thumbColor="#fff"
                />
              }
            />
          </Card>
        </View>

        {/* Devices Section */}
        <View className="mt-6 px-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">{t('devices.title')}</Text>
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="add" size={20} color="#10b77f" />
              <Text className="text-primary font-medium ml-1">{t('devices.addDevice')}</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {devices.map((device) => (
              <DeviceStatusCard key={device.id} device={device} />
            ))}
          </View>
        </View>

        {/* Logout */}
        <View className="mt-6 px-4">
          <TouchableOpacity className="flex-row items-center justify-center py-4 bg-danger/10 rounded-2xl">
            <Ionicons name="log-out" size={22} color="#DC2626" />
            <Text className="ml-2 text-danger font-semibold">{t('profile.logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
