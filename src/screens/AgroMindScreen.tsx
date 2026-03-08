import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../hooks';

export const AgroMindScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode } = useAppSelector(state => state.settings);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 border-b border-slate-100 dark:border-gray-800">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark shadow-sm"
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={isDarkMode ? "#fff" : "#1e293b"} />
          </TouchableOpacity>
          <View>
            <Text className="text-lg font-bold dark:text-white">AgroMind AI</Text>
            <Text className="text-xs text-primary font-bold uppercase tracking-wider">Online</Text>
          </View>
        </View>
        <TouchableOpacity className="h-10 w-10 rounded-full bg-surface-light dark:bg-surface-dark items-center justify-center shadow-sm">
          <MaterialCommunityIcons name="history" size={20} color="#10b77f" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* User Message: Uploaded Photo */}
        <View className="flex-col items-end gap-2 w-full mb-6">
          <View className="bg-primary/10 dark:bg-primary/20 p-2 rounded-2xl rounded-tr-sm max-w-[85%] border border-primary/10">
            <View className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo0ZXYg85k8CtL4iiFCs0adUB-uaKJ9DofCDwzuegPebWI9DEHeF3OfMCxkbCd0TdrdQc_PxWafBIiKGJvQhOaYSkYir_dbMX5GqEnt7vPy15T58zLiMXrY6ctSBOEyEq07cx5zcYreiRCEoewS1uKTemV_FQAxrSsx2mfBP21kSsb9MD5-QGac6uDK_UWL3YVZ79-9-yojrSBWma98E7WMI0YaTmvDZJQVbx2EIitKLXZ2ir4wT_QMTQxsaTOFnDla7WALFEOg7ir' }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-primary/20" />
              {/* Scanning line would be an animation here */}
              <View className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded flex-row items-center gap-1">
                <MaterialCommunityIcons name="radar" size={12} color="white" />
                <Text className="text-[10px] font-medium text-white">Scanning...</Text>
              </View>
            </View>
          </View>
          <Text className="text-xs text-gray-500 px-1">Just now</Text>
        </View>

        {/* AI Response: Diagnosis */}
        <View className="flex-col items-start gap-2 w-full mb-20">
          <View className="flex-row items-center gap-2 px-1 mb-1">
            <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
              <MaterialCommunityIcons name="robot" size={14} color="white" />
            </View>
            <Text className="text-xs font-semibold text-gray-500">AgroWise Assistant</Text>
          </View>

          <View className="bg-surface-light dark:bg-surface-dark rounded-2xl rounded-tl-sm p-0 w-full shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Header with result */}
            <View className="p-5 border-b border-gray-100 dark:border-gray-800 bg-primary/5">
              <View className="flex-row items-start justify-between gap-4 mb-3">
                <View className="flex-1">
                  <Text className="text-xl font-bold dark:text-white leading-tight">Early Blight Detected</Text>
                  <View className="flex-row items-center gap-1 mt-1">
                    <MaterialCommunityIcons name="alert" size={16} color="#ef4444" />
                    <Text className="text-sm text-red-500 font-medium">Severity: High</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 border border-primary/20">
                  <MaterialCommunityIcons name="check-circle" size={16} color="#10b77f" />
                  <Text className="text-primary text-xs font-bold">98% Match</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                I've analyzed the leaf patterns. The concentric brown rings are a strong indicator of Early Blight caused by the fungus Alternaria solani.
              </Text>
            </View>

            {/* Action Plan */}
            <View className="p-5">
              <View className="flex-row items-center gap-2 mb-4">
                <MaterialCommunityIcons name="medical-bag" size={20} color="#10b77f" />
                <Text className="text-base font-bold dark:text-white">Recommended Action Plan</Text>
              </View>
              
              <View className="space-y-3">
                <View className="flex-row items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-primary/10 mb-3">
                  <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center shrink-0">
                    <MaterialCommunityIcons name="bottle-tonic-plus" size={18} color="#2563eb" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-bold dark:text-white">Spray Fungicide</Text>
                    <Text className="text-xs text-gray-500 mt-0.5">Apply Mancozeb or Chlorothalonil immediately.</Text>
                  </View>
                </View>

                <View className="flex-row items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-primary/10 mb-3">
                  <View className="w-8 h-8 rounded-full bg-amber-100 items-center justify-center shrink-0">
                    <MaterialCommunityIcons name="flask" size={18} color="#d97706" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-bold dark:text-white">Dosage</Text>
                    <Text className="text-xs text-gray-500 mt-0.5">Mix 2.0g - 2.5g per liter of water.</Text>
                  </View>
                </View>

                <View className="flex-row items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-background-dark/50 border border-primary/10">
                  <View className="w-8 h-8 rounded-full bg-purple-100 items-center justify-center shrink-0">
                    <MaterialCommunityIcons name="calendar-clock" size={18} color="#9333ea" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-bold dark:text-white">Schedule</Text>
                    <Text className="text-xs text-gray-500 mt-0.5">Repeat spray every 10-14 days.</Text>
                  </View>
                </View>
              </View>

              <View className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex-row items-center justify-between">
                <Text className="text-xs text-gray-500">Was this helpful?</Text>
                <View className="flex-row gap-2">
                  <TouchableOpacity className="p-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <MaterialCommunityIcons name="thumb-up-outline" size={20} color="#64748b" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <MaterialCommunityIcons name="thumb-down-outline" size={20} color="#64748b" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Input Area */}
      <View className="absolute bottom-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 px-4 py-3 pb-8">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
            <MaterialCommunityIcons name="camera" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1 h-12 bg-gray-100 dark:bg-gray-800/50 rounded-2xl px-4 flex-row items-center">
            <TextInput 
              placeholder="Ask a question..."
              placeholderTextColor="#94a3b8"
              className="flex-1 text-sm font-medium dark:text-white outline-none"
              underlineColorAndroid="transparent"
              selectionColor="#10b77f"
            />
            <TouchableOpacity>
              <MaterialCommunityIcons name="send" size={20} color="#10b77f" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent dark:border-gray-700">
            <MaterialCommunityIcons name="microphone" size={24} color="#334155" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
