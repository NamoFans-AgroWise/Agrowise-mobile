import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'className'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerClassName = '',
  className = '',
  ...props
}) => {
  return (
    <View className={containerClassName}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-2">
          {label}
        </Text>
      )}
      <View className="flex-row items-center bg-gray-100 rounded-xl border border-gray-300">
        {leftIcon && <View className="pl-4">{leftIcon}</View>}
        <TextInput
          className={`flex-1 px-4 py-3 text-base text-gray-900 ${className}`}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {rightIcon && <View className="pr-4">{rightIcon}</View>}
      </View>
      {error && (
        <Text className="text-sm text-danger mt-1">{error}</Text>
      )}
    </View>
  );
};
