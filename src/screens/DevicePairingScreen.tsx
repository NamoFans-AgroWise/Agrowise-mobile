import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { Button, Card } from '../components/ui';

const { width } = Dimensions.get('window');
const SCAN_SIZE = width * 0.7;

export const DevicePairingScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);
    console.log('Scanned:', data);
  };

  if (!permission) {
    return (
      <SafeAreaView className="flex-1 bg-background-light items-center justify-center">
        <Text className="text-gray-500">Requesting camera permission...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-background-light px-6">
        <View className="flex-1 items-center justify-center">
          <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center mb-6">
            <Ionicons name="camera" size={48} color="#10b77f" />
          </View>
          <Text className="text-xl font-bold text-gray-900 text-center mb-2">
            Camera Permission Required
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            We need camera access to scan the QR code on your AgroWise device.
          </Text>
          <Button title="Grant Permission" onPress={requestPermission} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">{t('devices.pairDevice')}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Camera View */}
      <View className="flex-1 items-center justify-center">
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />

        {/* Scan Overlay */}
        <View className="items-center">
          <View
            style={{
              width: SCAN_SIZE,
              height: SCAN_SIZE,
              borderWidth: 2,
              borderColor: '#10b77f',
              borderRadius: 24,
              backgroundColor: 'transparent',
            }}
          >
            <View className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
            <View className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
            <View className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
            <View className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
          </View>

          <Text className="text-white text-center mt-6 text-lg">{t('devices.scanQR')}</Text>
          <Text className="text-white/60 text-center mt-2 px-8">
            Position the QR code on your AgroWise device within the frame
          </Text>
        </View>
      </View>

      {/* Bottom Instructions */}
      <View className="px-6 pb-8">
        <Card variant="elevated" className="bg-white/95">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center mr-4">
              <MaterialCommunityIcons name="qrcode-scan" size={24} color="#10b77f" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-900">Find the QR Code</Text>
              <Text className="text-sm text-gray-500">
                Located on the back or bottom of your device
              </Text>
            </View>
          </View>
        </Card>

        {scanned && (
          <Button
            title="Scan Again"
            onPress={() => setScanned(false)}
            variant="outline"
            className="mt-4"
          />
        )}
      </View>
    </SafeAreaView>
  );
};
