import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  image?: string;
  isLiked?: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Rakesh Patel',
    avatar: 'https://i.pravatar.cc/150?u=rakesh',
    time: '2h ago',
    content: 'Successfully controlled yellow rust in my wheat crop using Propiconazole. Early detection was key! Happy to share my experience with anyone facing similar issues.',
    likes: 24,
    comments: 8,
    tags: ['Wheat', 'Disease', 'Success'],
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
    isLiked: true,
  },
  {
    id: '2',
    author: 'Sunita Devi',
    avatar: 'https://i.pravatar.cc/150?u=sunita',
    time: '5h ago',
    content: 'Question: What is the best time to irrigate paddy during the flowering stage? My soil sensor shows 32% moisture, which seems a bit low for this stage.',
    likes: 12,
    comments: 15,
    tags: ['Paddy', 'Irrigation', 'Question'],
  },
  {
    id: '3',
    author: 'Mohammad Khan',
    avatar: 'https://i.pravatar.cc/150?u=khan',
    time: '1d ago',
    content: 'Great results with drip irrigation this season! Reduced water usage by 40% while maintaining good yield. The AgroWise spikes helped monitor in real-time.',
    likes: 56,
    comments: 22,
    tags: ['Irrigation', 'Tech', 'Saving'],
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop',
  },
];

const categories = ['All', 'Questions', 'Tips', 'Success Stories', 'Market'];

export const CommunityScreen: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-background-dark">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark">
        <View>
          <Text className="text-2xl font-bold text-slate-900 dark:text-white">Community</Text>
          <Text className="text-xs font-semibold text-primary">Agro-Knowledge Hub</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 items-center justify-center">
            <Ionicons name="search" size={20} color="#10b77f" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-primary items-center justify-center">
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Categories Chips */}
        <View className="py-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-2xl mr-3 border ${
                  activeCategory === category 
                    ? 'bg-primary border-primary' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                } shadow-sm`}
              >
                <Text className={`font-bold text-sm ${
                  activeCategory === category ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                }`}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Posts Feed */}
        <View className="px-4 pb-20">
          {mockPosts.map((post) => (
            <View 
              key={post.id} 
              className="mb-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <View className="p-4">
                {/* Post Header */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center gap-3">
                    <Image source={{ uri: post.avatar }} className="w-10 h-10 rounded-full bg-slate-100" />
                    <View>
                      <Text className="font-bold text-slate-900 dark:text-white">{post.author}</Text>
                      <Text className="text-[10px] font-medium text-slate-400">{post.time}</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="w-8 h-8 items-center justify-center">
                    <MaterialCommunityIcons name="dots-horizontal" size={20} color="#94a3b8" />
                  </TouchableOpacity>
                </View>

                {/* Content */}
                <Text className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  {post.content}
                </Text>

                {/* Tags */}
                <View className="flex-row flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <View key={tag} className="bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                      <Text className="text-primary text-[10px] font-bold">#{tag}</Text>
                    </View>
                  ))}
                </View>

                {/* Post Image (optional) */}
                {post.image && (
                  <View className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4">
                    <Image source={{ uri: post.image }} className="w-full h-full" resizeMode="cover" />
                  </View>
                )}

                {/* Actions */}
                <View className="flex-row items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800">
                  <View className="flex-row items-center gap-6">
                    <TouchableOpacity className="flex-row items-center gap-1.5">
                      <Ionicons 
                        name={post.isLiked ? "heart" : "heart-outline"} 
                        size={22} 
                        color={post.isLiked ? "#ef4444" : "#64748b"} 
                      />
                      <Text className={`text-xs font-bold ${post.isLiked ? 'text-red-500' : 'text-slate-500'}`}>
                        {post.likes}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center gap-1.5">
                      <Ionicons name="chatbubble-outline" size={20} color="#64748b" />
                      <Text className="text-xs font-bold text-slate-500">{post.comments}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="share-social-outline" size={20} color="#64748b" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

