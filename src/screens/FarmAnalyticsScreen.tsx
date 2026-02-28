import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { Card } from '../components/ui';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 64;
const CHART_HEIGHT = 180;

const mockAnalytics = [
  { date: 'Mon', moisture: 42, temperature: 28, humidity: 65 },
  { date: 'Tue', moisture: 38, temperature: 30, humidity: 62 },
  { date: 'Wed', moisture: 35, temperature: 31, humidity: 58 },
  { date: 'Thu', moisture: 32, temperature: 29, humidity: 64 },
  { date: 'Fri', moisture: 28, temperature: 27, humidity: 68 },
  { date: 'Sat', moisture: 45, temperature: 26, humidity: 72 },
  { date: 'Sun', moisture: 40, temperature: 28, humidity: 70 },
];

interface SimpleChartProps {
  data: number[];
  labels: string[];
  color: string;
  title: string;
  unit: string;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ data, labels, color, title, unit }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * CHART_WIDTH,
    y: CHART_HEIGHT - 40 - ((value - min) / range) * (CHART_HEIGHT - 60),
    value,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <Card variant="elevated" className="mb-4">
      <Text className="text-base font-bold text-gray-900 mb-4">{title}</Text>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {[0, 1, 2, 3].map((i) => (
          <Line key={i} x1={0} y1={20 + (i * (CHART_HEIGHT - 60)) / 3} x2={CHART_WIDTH} y2={20 + (i * (CHART_HEIGHT - 60)) / 3} stroke="#e5e7eb" strokeWidth={1} />
        ))}
        <Path d={pathD} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={6} fill={color} />
        ))}
        {labels.map((label, i) => (
          <SvgText key={i} x={(i / (labels.length - 1)) * CHART_WIDTH} y={CHART_HEIGHT - 5} fontSize={12} fill="#6b7280" textAnchor="middle">{label}</SvgText>
        ))}
        {points.map((p, i) => (
          <SvgText key={`v${i}`} x={p.x} y={p.y - 12} fontSize={10} fill={color} textAnchor="middle" fontWeight="bold">{p.value}{unit}</SvgText>
        ))}
      </Svg>
    </Card>
  );
};

export const FarmAnalyticsScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const periods = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <View className="px-4 py-3 flex-row items-center border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900 ml-2">{t('analytics.title')}</Text>
      </View>

      {/* Period Selector */}
      <View className="px-4 py-3 bg-white">
        <View className="flex-row bg-gray-100 rounded-xl p-1">
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              onPress={() => setSelectedPeriod(period.id)}
              className={`flex-1 py-2 rounded-lg ${selectedPeriod === period.id ? 'bg-white shadow' : ''}`}
            >
              <Text className={`text-center font-medium ${selectedPeriod === period.id ? 'text-primary' : 'text-gray-500'}`}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View className="flex-row gap-3 mb-6">
          <Card variant="elevated" className="flex-1">
            <View className="items-center">
              <MaterialCommunityIcons name="water-percent" size={28} color="#3b82f6" />
              <Text className="text-2xl font-bold text-gray-900 mt-2">35%</Text>
              <Text className="text-sm text-gray-500">Avg Moisture</Text>
            </View>
          </Card>
          <Card variant="elevated" className="flex-1">
            <View className="items-center">
              <MaterialCommunityIcons name="thermometer" size={28} color="#f59e0b" />
              <Text className="text-2xl font-bold text-gray-900 mt-2">28°C</Text>
              <Text className="text-sm text-gray-500">Avg Temp</Text>
            </View>
          </Card>
          <Card variant="elevated" className="flex-1">
            <View className="items-center">
              <MaterialCommunityIcons name="water" size={28} color="#10b77f" />
              <Text className="text-2xl font-bold text-gray-900 mt-2">66%</Text>
              <Text className="text-sm text-gray-500">Avg Humidity</Text>
            </View>
          </Card>
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-4">{t('analytics.sevenDayHistory')}</Text>

        <SimpleChart data={mockAnalytics.map((d) => d.moisture)} labels={mockAnalytics.map((d) => d.date)} color="#3b82f6" title={t('analytics.soilMoistureTrend')} unit="%" />
        <SimpleChart data={mockAnalytics.map((d) => d.temperature)} labels={mockAnalytics.map((d) => d.date)} color="#f59e0b" title={t('analytics.temperatureTrend')} unit="°" />

        {/* Insights */}
        <Card variant="elevated" className="mb-4">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#10b77f" />
            <Text className="text-base font-bold text-gray-900 ml-2">AI Insights</Text>
          </View>
          <View className="gap-3">
            <View className="flex-row items-start">
              <View className="w-2 h-2 rounded-full bg-action mt-2 mr-3" />
              <Text className="flex-1 text-gray-700">Soil moisture dropped 17% over the past week. Consider irrigating today.</Text>
            </View>
            <View className="flex-row items-start">
              <View className="w-2 h-2 rounded-full bg-primary mt-2 mr-3" />
              <Text className="flex-1 text-gray-700">Temperature is optimal for wheat growth (26-31°C range maintained).</Text>
            </View>
            <View className="flex-row items-start">
              <View className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3" />
              <Text className="flex-1 text-gray-700">Humidity levels are favorable. Low disease risk this week.</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
