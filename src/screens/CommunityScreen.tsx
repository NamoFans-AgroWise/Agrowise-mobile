import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui';

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Rakesh Patel',
    avatar: 'R',
    time: '2h ago',
    content: 'Successfully controlled yellow rust in my wheat crop using Propiconazole. Early detection was key! Happy to share my experience.',
    likes: 24,
    comments: 8,
    tags: ['Wheat', 'Disease', 'Success'],
  },
  {
    id: '2',
    author: 'Sunita Devi',
    avatar: 'S',
    time: '5h ago',
    content: 'Question: What is the best time to irrigate paddy during the flowering stage? My soil sensor shows 32% moisture.',
    likes: 12,
    comments: 15,
    tags: ['Paddy', 'Irrigation', 'Question'],
  },
  {
    id: '3',
    author: 'Mohammad Khan',
    avatar: 'M',
    time: '1d ago',
    content: 'Great results with drip irrigation this season! Reduced water usage by 40% while maintaining good yield. The AgroWise sensors helped a lot.',
    likes: 56,
    comments: 22,
    tags: ['Irrigation', 'Tips', 'Technology'],
  },
];

export const CommunityScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between border-b border-gray-200 bg-white">
        <Text className="text-xl font-bold text-gray-900">{t('tabs.community')}</Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="p-2">
            <Ionicons name="search" size={24} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Ionicons name="add-circle-outline" size={24} color="#10b77f" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-3 px-4 bg-white"
      >
        {['All', 'Questions', 'Tips', 'Success Stories', 'Market'].map((category, index) => (
          <TouchableOpacity
            key={category}
            className={`px-4 py-2 rounded-full mr-2 ${
              index === 0 ? 'bg-primary' : 'bg-gray-100'
            }`}
          >
            <Text className={`font-medium ${index === 0 ? 'text-white' : 'text-gray-700'}`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Posts */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {mockPosts.map((post) => (
          <Card key={post.id} variant="elevated" className="mb-4">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
                <Text className="text-white font-bold">{post.avatar}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-gray-900">{post.author}</Text>
                <Text className="text-sm text-gray-500">{post.time}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-800 leading-6 mb-3">{post.content}</Text>

            <View className="flex-row flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <View key={tag} className="bg-primary/10 px-3 py-1 rounded-full">
                  <Text className="text-primary text-sm font-medium">#{tag}</Text>
                </View>
              ))}
            </View>

            <View className="flex-row items-center pt-3 border-t border-gray-200">
              <TouchableOpacity className="flex-row items-center mr-6">
                <Ionicons name="heart-outline" size={22} color="#6b7280" />
                <Text className="ml-2 text-gray-600">{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center mr-6">
                <Ionicons name="chatbubble-outline" size={20} color="#6b7280" />
                <Text className="ml-2 text-gray-600">{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="share-outline" size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
