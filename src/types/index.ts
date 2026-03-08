// User types
export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  preferredLanguage: 'en' | 'hi';
}

// Device types
export interface Device {
  id: string;
  name: string;
  type: 'soil_sensor' | 'weather_station' | 'irrigation_controller';
  status: 'online' | 'offline' | 'pairing';
  batteryLevel: number;
  lastSync?: string;
  fieldId?: string;
}

// Field types
export interface Field {
  id: string;
  name: string;
  crop?: Crop;
  area?: number; // in acres
  soilType?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  devices: string[]; // device IDs
}

// Crop types
export interface Crop {
  id: string;
  name: string;
  nameHindi?: string;
  variety?: string;
  sowingDate?: string;
  expectedHarvestDate?: string;
  imageUrl?: string;
}

// Alert types
export type AlertType = 'irrigation' | 'disease' | 'weather' | 'advisory';
export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  fieldId?: string;
  deviceId?: string;
}

// Weather types
export interface Weather {
  temperature: number;
  humidity: number;
  condition: string;
  icon: string;
  forecast?: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

// Diagnosis types
export interface Diagnosis {
  id: string;
  cropId: string;
  imageUrl?: string;
  disease?: string;
  confidence: number;
  recommendations: string[];
  timestamp: string;
}

// Analytics types
export interface AnalyticsData {
  date: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  rainfall?: number;
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  DevicePairing: undefined;
  FieldSetup: { deviceId?: string };
  CropSetup: { fieldId: string };
  FarmAnalytics: { fieldId?: string };
  DiagnosisResult: { diagnosisId: string };
  CameraCapture: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  TrendsTab: undefined;
  DiagnosisTab: undefined;
  CommunityTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  Analytics: { fieldId?: string };
  AlertDetails: { alertId: string };
};

export type DiagnosisStackParamList = {
  AgroMind: undefined;
  CameraCapture: undefined;
  DiagnosisResult: { diagnosisId: string };
};

export type ProfileStackParamList = {
  Settings: undefined;
  DeviceList: undefined;
  DeviceDetails: { deviceId: string };
  FieldList: undefined;
  FieldDetails: { fieldId: string };
};
