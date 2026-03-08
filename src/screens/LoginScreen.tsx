import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  const handleSendOTP = () => {
    // Mock login for now
    navigation.navigate('Main');
  };

  return (
    <View className="flex-1 bg-white dark:bg-background-dark">
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header / Hero Illustration Area */}
        <View className="h-[48vh] w-full">
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbsbYlAyo79gxIu6u9Jvm1874rq_OemA_yu59gLkbXAp0wEckBlm4CgyISkxOqgi1OQtiqZBWi_fZ_2rpw_Xdmtgf_gJ-anusCYEhtyScoGEXAeFYi2pQ5AHuk6_fYGpTUDY6YJf-ueFzUmbk154V9No9BnW5XDbYfbsKHqXsbVhytEF73JQLbBav5bo5h-FhF8qbq6Hq-izPCzzuWREwANGGi4HOrsAugkW4_hVn2p54XKJS38zoKDlx0533nSpldwXQfkgZmQgSh',
            }}
            className="flex-1"
            resizeMode="cover"
          >
            {/* Dark Gradient Overlay */}
            <View className="absolute inset-0 bg-black/40" />
            
            {/* Logo Area */}
            <SafeAreaView className="p-6 flex-row items-center justify-between z-10">
              <View className="flex-row items-center gap-2">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-white/20 border border-white/30 shadow-sm backdrop-blur-md">
                  <MaterialCommunityIcons name="leaf" size={24} color="white" />
                </View>
                <Text className="text-2xl font-bold text-white tracking-wide shadow-md">
                  AgroWise
                </Text>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>

        {/* Login Card Sheet */}
        <View className="relative z-20 -mt-10 flex-1 rounded-t-3xl bg-surface-light dark:bg-surface-dark px-6 pt-8 pb-6 shadow-lg">
          {/* Decorative Handle */}
          <View className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-600" />

          {/* Header Row: Title & Language Toggle */}
          <View className="mb-8 flex-col gap-4">
            <View className="flex-row justify-end">
              <View className="flex-row rounded-lg bg-slate-100 dark:bg-black/20 p-1">
                {['en', 'hi', 'bn'].map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    onPress={() => handleLanguageChange(lang)}
                    className={`rounded-md px-3 py-1.5 ${
                      selectedLang === lang
                        ? 'bg-white dark:bg-background-dark shadow-sm'
                        : ''
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        selectedLang === lang
                          ? 'text-primary'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {lang === 'en' ? 'Eng' : lang === 'hi' ? 'हिंदी' : 'বাংলা'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View>
              <Text className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                Welcome Farmer
              </Text>
              <Text className="mt-1 text-slate-500 dark:text-slate-400 font-medium">
                Log in to check soil health
              </Text>
            </View>
          </View>

          {/* Login Form */}
          <View className="flex-col gap-6">
            <View className="space-y-2">
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Mobile Number
              </Text>
              <View className="relative flex-row items-center">
                <View className="absolute left-0 z-10 flex-row items-center pl-4 border-r border-slate-300 dark:border-slate-600 pr-3 h-8">
                   <Text className="text-lg font-bold text-slate-500 dark:text-slate-400">+91</Text>
                </View>
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder="Enter mobile number"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 pl-20 text-lg font-medium text-slate-900 dark:border-slate-700 dark:bg-black/20 dark:text-white h-16"
                />
                <View className="absolute right-4">
                  <MaterialCommunityIcons name="cellphone" size={24} color="#10b77f" />
                </View>
              </View>
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              onPress={handleSendOTP}
              className="flex-row w-full items-center justify-center rounded-xl bg-primary h-14 px-5 shadow-lg shadow-primary/25 active:scale-95"
            >
              <Text className="text-lg font-bold text-white">Send OTP</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="white" className="ml-2" />
            </TouchableOpacity>

            {/* Terms Text */}
            <Text className="text-center text-xs text-slate-400 dark:text-slate-500 px-4">
              By clicking Send OTP, you agree to our{' '}
              <Text className="underline decoration-slate-300">Terms of Service</Text> and{' '}
              <Text className="underline decoration-slate-300">Privacy Policy</Text>.
            </Text>
          </View>

          <View className="flex-1" />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-6 left-0 right-0 items-center pointer-events-none">
        <TouchableOpacity className="pointer-events-auto flex-row items-center gap-3 rounded-full bg-slate-800 dark:bg-white px-6 py-3.5 shadow-xl active:scale-95">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-white/20 dark:bg-slate-200">
            <MaterialCommunityIcons name="phone" size={20} color={Platform.OS === 'ios' ? 'white' : '#0f172a'} />
          </View>
          <View className="flex-col">
            <Text className="text-[10px] text-white dark:text-slate-900 opacity-80 uppercase tracking-wider font-semibold">
              Need Help?
            </Text>
            <Text className="text-sm font-bold text-white dark:text-slate-900">Call Support</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
