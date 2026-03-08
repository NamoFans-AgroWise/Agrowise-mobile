import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Text as SvgText } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../hooks';

const comingSoon = (feature: string) =>
  Alert.alert('Coming Soon', `${feature} will be available in a future update.`);

export const FarmAnalyticsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode } = useAppSelector(state => state.settings);

  const { width: screenWidth } = Dimensions.get('window');

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      {/* App Bar */}
      <View className="flex-row items-center px-4 py-4 gap-4 bg-background-light/95 dark:bg-background-dark/95 border-b border-slate-100 dark:border-gray-800">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark shadow-sm"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={isDarkMode ? "#fff" : "#1e293b"} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-bold dark:text-white">Analytics</Text>
          <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">Plot A - Wheat</Text>
        </View>
        <TouchableOpacity
          onPress={() => comingSoon('Date range filter')}
          className="flex-row items-center gap-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-slate-300 dark:border-slate-700 px-3 py-2 shadow-sm"
        >
          <MaterialCommunityIcons name="calendar-today" size={20} color="#10b77f" />
          <Text className="text-sm font-bold text-slate-700 dark:text-slate-200">Last 7 Days</Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Chart 1: Soil Moisture */}
        <View className="mb-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <View className="p-5 pb-2">
            <View className="flex-row justify-between items-start mb-1">
              <Text className="text-lg font-bold dark:text-white">Soil Moisture Trend</Text>
              <View className="flex-row items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-1">
                <MaterialCommunityIcons name="alert-circle" size={14} color="#b91c1c" />
                <Text className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">Critical</Text>
              </View>
            </View>
            <Text className="text-3xl font-bold dark:text-white tracking-tight">
              18% <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">VWC</Text>
            </Text>
          </View>

          {/* Chart Visualization */}
          <View className="h-[200px] w-full px-2 pt-4">
            <Svg width="100%" height="100%" viewBox="0 0 350 150">
              <Defs>
                <LinearGradient id="moistureGradient" x1="0" x2="0" y1="0" y2="1">
                  <Stop offset="0%" stopColor="#10b77f" stopOpacity="0.2" />
                  <Stop offset="100%" stopColor="#10b77f" stopOpacity="0" />
                </LinearGradient>
              </Defs>
              <Line x1="0" y1="30" x2="350" y2="30" stroke={isDarkMode ? "#162219" : "#f1f5f9"} strokeWidth="1" />
              <Line x1="0" y1="70" x2="350" y2="70" stroke={isDarkMode ? "#162219" : "#f1f5f9"} strokeWidth="1" />
              <Line x1="0" y1="110" x2="350" y2="110" stroke={isDarkMode ? "#162219" : "#f1f5f9"} strokeWidth="1" />
              <Line x1="0" y1="120" x2="350" y2="120" stroke="#DC2626" strokeWidth="2" strokeDasharray="6 4" />
              <SvgText x="5" y="116" fontSize="10" fontWeight="bold" fill="#DC2626" letterSpacing="1">WILTING POINT</SvgText>

              <Path
                d="M0 40 C 60 45, 120 60, 180 85 C 240 110, 300 125, 350 135 L 350 150 L 0 150 Z"
                fill="url(#moistureGradient)"
              />
              <Path
                d="M0 40 C 60 45, 120 60, 180 85 C 240 110, 300 125, 350 135"
                fill="none"
                stroke="#10b77f"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <Circle cx="300" cy="125" r="7" fill="#DC2626" stroke="white" strokeWidth="3" />
            </Svg>

            {/* Tooltip Overlay - pixel-based positioning */}
            <View style={{ position: 'absolute', top: 80, left: screenWidth * 0.56 }}
              className="bg-slate-800 px-2 py-1 rounded items-center"
            >
              <Text className="text-white text-[10px] font-bold">19%</Text>
            </View>
          </View>

          <View className="flex-row justify-between px-6 pb-4 pt-2 border-t border-slate-50 dark:border-gray-800">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <Text key={day} className="text-[10px] font-bold text-slate-400">{day}</Text>
            ))}
          </View>

          {/* AI Insight Box Chart 1 - left border accent */}
          <View className="mx-5 mb-5 mt-2 rounded-lg bg-primary/10 p-3 border-l-4 border-primary">
            <View className="flex-row items-start gap-3">
              <MaterialCommunityIcons name="robot" size={16} color="#10b77f" />
              <Text className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug flex-1">
                <Text className="font-bold text-primary">Insight: </Text>
                Moisture is dropping fast. We recommend irrigating 15L/plant tomorrow morning.
              </Text>
            </View>
          </View>
        </View>

        {/* Chart 2: Temp vs Humidity */}
        <View className="mb-20 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <View className="p-5 pb-2">
            <Text className="text-lg font-bold dark:text-white mb-4">Atmosphere Analysis</Text>
            <View className="flex-row items-center gap-6 mb-4">
              <View className="flex-row items-center gap-2">
                <View className="h-1 w-6 rounded-full bg-secondary" />
                <Text className="text-xs font-bold text-slate-500">Temp (28°C)</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="h-1 w-6 rounded-full bg-primary" />
                <Text className="text-xs font-bold text-slate-500">Humidity (64%)</Text>
              </View>
            </View>
          </View>

          <View className="h-[180px] w-full px-2 pt-2">
            <Svg width="100%" height="100%" viewBox="0 0 350 150">
              <Path
                d="M0 90 Q 50 40, 100 50 T 200 60 T 350 40"
                fill="none"
                stroke="#8B5E3C"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <Path
                d="M0 60 Q 50 110, 100 100 T 200 90 T 350 110"
                fill="none"
                stroke="#10b77f"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </Svg>
          </View>

          <View className="flex-row justify-between px-6 pb-6 pt-2">
            {['6am', '9am', '12pm', '3pm', '6pm', '9pm'].map(time => (
              <Text key={time} className="text-[10px] font-bold text-slate-400">{time}</Text>
            ))}
          </View>

          {/* AI Insight Box Chart 2 - earth/orange accent */}
          <View className="mx-5 mb-5 mt-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 p-3 border-l-4 border-secondary">
            <View className="flex-row items-start gap-3">
              <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#8B5E3C" />
              <Text className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug flex-1">
                <Text className="font-bold text-secondary">Insight: </Text>
                High humidity observed in early mornings. Monitor for fungal growth.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
