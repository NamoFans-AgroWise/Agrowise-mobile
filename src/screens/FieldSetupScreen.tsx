import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { Button, Input } from '../components/ui';
import { useAppDispatch } from '../hooks';
import { addField } from '../features';

const SOIL_TYPES = [
  { id: 'black_cotton', name: 'Black Cotton', icon: 'terrain' as const },
  { id: 'alluvial', name: 'Alluvial', icon: 'waves' as const },
  { id: 'red', name: 'Red Soil', icon: 'circle' as const },
  { id: 'sandy', name: 'Sandy', icon: 'grain' as const },
];

export const FieldSetupScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [step, setStep] = useState(1);
  const [fieldName, setFieldName] = useState('');
  const [area, setArea] = useState('');
  const [soilType, setSoilType] = useState('');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      dispatch(
        addField({
          id: Date.now().toString(),
          name: fieldName,
          area: parseFloat(area),
          soilType,
          devices: [],
        })
      );
      navigation.goBack();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return fieldName.length > 0;
      case 2: return area.length > 0 && parseFloat(area) > 0;
      case 3: return soilType.length > 0;
      default: return false;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900 ml-2">{t('fields.addField')}</Text>
      </View>

      {/* Progress Steps */}
      <View className="px-4 py-4 bg-white">
        <View className="flex-row items-center justify-center">
          {[1, 2, 3].map((s, index) => (
            <React.Fragment key={s}>
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  s <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                {s < step ? (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                ) : (
                  <Text className={`font-bold ${s <= step ? 'text-white' : 'text-gray-500'}`}>
                    {s}
                  </Text>
                )}
              </View>
              {index < 2 && (
                <View className={`h-1 w-16 mx-2 rounded ${s < step ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </View>
        <View className="flex-row justify-between mt-2 px-2">
          <Text className="text-xs text-gray-500">Name</Text>
          <Text className="text-xs text-gray-500">Area</Text>
          <Text className="text-xs text-gray-500">Soil</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 24 }}>
        {step === 1 && (
          <View>
            <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center self-center mb-6">
              <MaterialCommunityIcons name="map-marker-outline" size={40} color="#10b77f" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 text-center mb-2">Name Your Field</Text>
            <Text className="text-gray-500 text-center mb-8">Give your field a unique name to identify it easily</Text>
            <Input label={t('fields.fieldName')} value={fieldName} onChangeText={setFieldName} placeholder="e.g., North Field, Plot A1" autoFocus />
          </View>
        )}

        {step === 2 && (
          <View>
            <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center self-center mb-6">
              <MaterialCommunityIcons name="ruler-square" size={40} color="#10b77f" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 text-center mb-2">Field Size</Text>
            <Text className="text-gray-500 text-center mb-8">Enter the total area of your field in acres</Text>
            <Input label={t('fields.area')} value={area} onChangeText={setArea} placeholder="e.g., 5" keyboardType="decimal-pad" autoFocus />
            <View className="flex-row flex-wrap gap-2 mt-4">
              {['1', '2', '5', '10'].map((val) => (
                <TouchableOpacity
                  key={val}
                  onPress={() => setArea(val)}
                  className={`px-4 py-2 rounded-full ${area === val ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <Text className={area === val ? 'text-white font-medium' : 'text-gray-700'}>
                    {val} acre{parseFloat(val) > 1 ? 's' : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center self-center mb-6">
              <MaterialCommunityIcons name="terrain" size={40} color="#10b77f" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 text-center mb-2">Soil Type</Text>
            <Text className="text-gray-500 text-center mb-8">Select the type of soil in your field</Text>
            <View className="gap-3">
              {SOIL_TYPES.map((soil) => (
                <TouchableOpacity
                  key={soil.id}
                  onPress={() => setSoilType(soil.id)}
                  className={`flex-row items-center p-4 rounded-2xl border-2 ${
                    soilType === soil.id ? 'border-primary bg-primary/10' : 'border-gray-200 bg-white'
                  }`}
                >
                  <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                    soilType === soil.id ? 'bg-primary' : 'bg-gray-100'
                  }`}>
                    <MaterialCommunityIcons
                      name={soil.icon}
                      size={24}
                      color={soilType === soil.id ? '#fff' : '#6b7280'}
                    />
                  </View>
                  <Text className={`text-lg font-medium ${soilType === soil.id ? 'text-primary' : 'text-gray-900'}`}>
                    {soil.name}
                  </Text>
                  {soilType === soil.id && (
                    <View className="ml-auto">
                      <Ionicons name="checkmark-circle" size={24} color="#10b77f" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="px-4 pb-6 pt-4 bg-white border-t border-gray-200">
        <View className="flex-row gap-3">
          {step > 1 && (
            <Button title={t('common.back')} onPress={() => setStep(step - 1)} variant="outline" className="flex-1" />
          )}
          <Button title={step === 3 ? t('common.done') : t('common.next')} onPress={handleNext} disabled={!canProceed()} className="flex-1" />
        </View>
      </View>
    </SafeAreaView>
  );
};
