import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button, Card, Input } from '../components/ui';
import { useAppDispatch } from '../hooks';
import { setCrop } from '../features';

const CROPS = [
  { id: 'wheat', name: 'Wheat', nameHindi: 'गेहूँ', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', varieties: ['HD-2967', 'PBW-343', 'DBW-17', 'WH-542'] },
  { id: 'paddy', name: 'Paddy', nameHindi: 'धान', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400', varieties: ['Basmati', 'IR-64', 'Pusa-44', 'Sona Masuri'] },
  { id: 'cotton', name: 'Cotton', nameHindi: 'कपास', image: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400', varieties: ['Bt Cotton', 'Desi Cotton', 'American Cotton'] },
  { id: 'sugarcane', name: 'Sugarcane', nameHindi: 'गन्ना', image: 'https://images.unsplash.com/photo-1527676129857-22a8c7a4c4b1?w=400', varieties: ['Co-0238', 'CoJ-64', 'CoS-767'] },
  { id: 'soybean', name: 'Soybean', nameHindi: 'सोयाबीन', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', varieties: ['JS-335', 'JS-9560', 'NRC-7'] },
  { id: 'maize', name: 'Maize', nameHindi: 'मक्का', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400', varieties: ['DMH-117', 'HQPM-1', 'Vivek-9'] },
];

export const CropSetupScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();

  const fieldId = (route.params as any)?.fieldId;

  const [step, setStep] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState<(typeof CROPS)[0] | null>(null);
  const [selectedVariety, setSelectedVariety] = useState('');
  const [sowingDate, setSowingDate] = useState('');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      if (selectedCrop && fieldId) {
        dispatch(setCrop({
          fieldId,
          crop: { id: selectedCrop.id, name: selectedCrop.name, nameHindi: selectedCrop.nameHindi, variety: selectedVariety, sowingDate, imageUrl: selectedCrop.image },
        }));
      }
      navigation.goBack();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedCrop !== null;
      case 2: return selectedVariety.length > 0;
      case 3: return sowingDate.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <View className="px-4 py-3 flex-row items-center border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900 ml-2">{t('crops.selectCrop')}</Text>
      </View>

      {/* Progress */}
      <View className="px-4 py-4 bg-white">
        <View className="flex-row items-center justify-center">
          {[1, 2, 3, 4].map((s, index) => (
            <React.Fragment key={s}>
              <View className={`w-8 h-8 rounded-full items-center justify-center ${s <= step ? 'bg-primary' : 'bg-gray-200'}`}>
                {s < step ? (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                ) : (
                  <Text className={`text-sm font-bold ${s <= step ? 'text-white' : 'text-gray-500'}`}>{s}</Text>
                )}
              </View>
              {index < 3 && <View className={`h-0.5 w-10 mx-1 rounded ${s < step ? 'bg-primary' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 20 }}>
        {/* Step 1: Select Crop */}
        {step === 1 && (
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-2">Select Your Crop</Text>
            <Text className="text-gray-500 mb-6">Choose the crop you're growing in this field</Text>
            <View className="flex-row flex-wrap justify-between">
              {CROPS.map((crop) => (
                <TouchableOpacity
                  key={crop.id}
                  onPress={() => setSelectedCrop(crop)}
                  className={`w-[48%] mb-4 rounded-3xl overflow-hidden border-2 ${
                    selectedCrop?.id === crop.id ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <Image source={{ uri: crop.image }} className="w-full h-28" resizeMode="cover" />
                  <View className={`p-3 ${selectedCrop?.id === crop.id ? 'bg-primary/10' : 'bg-white'}`}>
                    <Text className="font-semibold text-gray-900">{crop.name}</Text>
                    <Text className="text-sm text-gray-500">{crop.nameHindi}</Text>
                  </View>
                  {selectedCrop?.id === crop.id && (
                    <View className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary items-center justify-center">
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 2: Select Variety */}
        {step === 2 && selectedCrop && (
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-2">Select Variety</Text>
            <Text className="text-gray-500 mb-6">Choose the variety of {selectedCrop.name}</Text>
            <View className="gap-3">
              {selectedCrop.varieties.map((variety) => (
                <TouchableOpacity
                  key={variety}
                  onPress={() => setSelectedVariety(variety)}
                  className={`flex-row items-center p-4 rounded-2xl border-2 ${
                    selectedVariety === variety ? 'border-primary bg-primary/10' : 'border-gray-200 bg-white'
                  }`}
                >
                  <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${
                    selectedVariety === variety ? 'bg-primary' : 'bg-gray-100'
                  }`}>
                    <MaterialCommunityIcons name="leaf" size={20} color={selectedVariety === variety ? '#fff' : '#6b7280'} />
                  </View>
                  <Text className={`text-base font-medium flex-1 ${selectedVariety === variety ? 'text-primary' : 'text-gray-900'}`}>
                    {variety}
                  </Text>
                  {selectedVariety === variety && <Ionicons name="checkmark-circle" size={24} color="#10b77f" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 3: Sowing Date */}
        {step === 3 && (
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-2">Sowing Date</Text>
            <Text className="text-gray-500 mb-6">When did you sow or plan to sow this crop?</Text>
            <Input label={t('crops.sowingDate')} value={sowingDate} onChangeText={setSowingDate} placeholder="YYYY-MM-DD" />
            <View className="flex-row flex-wrap gap-2 mt-4">
              {['Today', 'Yesterday', 'Last Week'].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    const date = new Date();
                    if (option === 'Yesterday') date.setDate(date.getDate() - 1);
                    if (option === 'Last Week') date.setDate(date.getDate() - 7);
                    setSowingDate(date.toISOString().split('T')[0]);
                  }}
                  className="px-4 py-2 rounded-full bg-gray-200"
                >
                  <Text className="text-gray-700">{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 4: Summary */}
        {step === 4 && selectedCrop && (
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-2">Confirm Details</Text>
            <Text className="text-gray-500 mb-6">Review your crop setup before saving</Text>
            <Card variant="elevated">
              <Image source={{ uri: selectedCrop.image }} className="w-full h-40 rounded-2xl mb-4" resizeMode="cover" />
              <View className="gap-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Crop</Text>
                  <Text className="font-semibold text-gray-900">{selectedCrop.name} ({selectedCrop.nameHindi})</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Variety</Text>
                  <Text className="font-semibold text-gray-900">{selectedVariety}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Sowing Date</Text>
                  <Text className="font-semibold text-gray-900">{sowingDate}</Text>
                </View>
              </View>
            </Card>
          </View>
        )}
      </ScrollView>

      <View className="px-4 pb-6 pt-4 bg-white border-t border-gray-200">
        <View className="flex-row gap-3">
          {step > 1 && <Button title={t('common.back')} onPress={() => setStep(step - 1)} variant="outline" className="flex-1" />}
          <Button title={step === 4 ? t('common.save') : t('common.next')} onPress={handleNext} disabled={!canProceed()} className="flex-1" />
        </View>
      </View>
    </SafeAreaView>
  );
};
