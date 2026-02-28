import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import * as Speech from 'expo-speech';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const AgroMindScreen: React.FC = () => {
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I am AgroMind, your AI farming assistant. How can I help you today?\n\nYou can:\n• Ask me about crop diseases\n• Get irrigation recommendations\n• Take a photo of your crop for diagnosis',
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Based on your query, I recommend checking the soil moisture levels. The current readings show 28% moisture which is below optimal for wheat. Consider irrigating with 15-20 liters per plant.\n\nWould you like me to:\n• Show detailed irrigation schedule\n• Analyze a crop photo\n• Check weather forecast",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1000);
  };

  const handleListen = (text: string) => {
    Speech.speak(text, { language: 'en-IN' });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center border-b border-gray-200 bg-white">
        <View className="w-12 h-12 rounded-full bg-primary items-center justify-center mr-3">
          <MaterialCommunityIcons name="robot" size={28} color="#fff" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">AgroMind</Text>
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            <Text className="text-sm text-green-500">Online</Text>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="ellipsis-vertical" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-4 ${message.isBot ? 'items-start' : 'items-end'}`}
            >
              <View
                className={`max-w-[85%] rounded-3xl p-4 ${
                  message.isBot
                    ? 'bg-white rounded-tl-sm'
                    : 'bg-primary rounded-tr-sm'
                }`}
              >
                <Text
                  className={`text-base leading-6 ${
                    message.isBot ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  {message.text}
                </Text>
                {message.isBot && (
                  <TouchableOpacity
                    onPress={() => handleListen(message.text)}
                    className="flex-row items-center mt-3 pt-3 border-t border-gray-200"
                  >
                    <Ionicons name="volume-high" size={18} color="#10b77f" />
                    <Text className="ml-2 text-primary font-medium">
                      {t('common.listen')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text className="text-xs text-gray-500 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View className="px-4 py-3 border-t border-gray-200 bg-white">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
              <Ionicons name="camera" size={24} color="#10b77f" />
            </TouchableOpacity>

            <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask AgroMind..."
                placeholderTextColor="#9ca3af"
                className="flex-1 py-3 text-base text-gray-900"
                multiline
                maxLength={500}
              />
            </View>

            <TouchableOpacity
              onPress={handleSend}
              disabled={!input.trim()}
              className={`w-12 h-12 rounded-full items-center justify-center ${
                input.trim() ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
