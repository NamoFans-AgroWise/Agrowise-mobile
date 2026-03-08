import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Text as SvgText } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../hooks';

export const FarmAnalyticsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode } = useAppSelector(state => state.settings);
  
  const screenWidth = Dimensions.get('window').width;
  
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
          <Text className="text-xl font-bold dark:text-white">Farm Intelligence</Text>
          <Text className="text-xs font-medium text-slate-500 dark:text-slate-400">Plot A - Wheat</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark shadow-sm">
          <MaterialCommunityIcons name="calendar-range" size={20} color="#10b77f" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Chart 1: Soil Moisture */}
        <View className="mb-6 rounded-3xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
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
              <Line x1="0" y1="30" x2="350" y2="30" stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} strokeWidth="1" />
              <Line x1="0" y1="70" x2="350" y2="70" stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} strokeWidth="1" />
              <Line x1="0" y1="110" x2="350" y2="110" stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} strokeWidth="1" />
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
            
            {/* Tooltip Overlay */}
            <View className="absolute top-[55%] left-[75%] bg-slate-800 px-2 py-1 rounded items-center">
              <Text className="text-white text-[10px] font-bold">19%</Text>
              <View className="w-2 h-2 bg-slate-800 rotate-45 -mb-2 mt-0.5" />
            </View>
          </View>

          <View className="flex-row justify-between px-6 pb-4 pt-2 border-t border-slate-50 dark:border-gray-800">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <Text key={day} className="text-[10px] font-bold text-slate-400">{day}</Text>
            ))}
          </View>

          <View className="mx-5 mb-5 mt-2 rounded-2xl bg-primary/5 p-4 border border-primary/10">
            <View className="flex-row items-start gap-3">
              <MaterialCommunityIcons name="robot" size={20} color="#10b77f" />
              <Text className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug flex-1">
                Moisture is dropping fast. We recommend irrigating <Text className="font-bold text-primary">15L/plant</Text> tomorrow morning.
              </Text>
            </View>
          </View>
        </View>

        {/* Chart 2: Temp vs Humidity */}
        <View className="mb-20 rounded-3xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <View className="p-5 pb-2">
            <Text className="text-lg font-bold dark:text-white mb-4">Atmosphere Analysis</Text>
            <View className="flex-row items-center gap-6 mb-4">
              <View className="flex-row items-center gap-2">
                <View className="h-2 w-2 rounded-full bg-secondary" />
                <Text className="text-xs font-bold text-slate-500">Temp (28°C)</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="h-2 w-2 rounded-full bg-primary" />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
