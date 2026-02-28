import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

const variantBg = {
  primary: 'bg-primary',
  success: 'bg-green-500',
  warning: 'bg-action',
  danger: 'bg-danger',
  info: 'bg-blue-500',
} as const;

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'sm',
  className = '',
}) => {
  return (
    <View
      className={`rounded-full ${variantBg[variant]} ${size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1'} ${className}`}
    >
      <Text className={`font-semibold text-white ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {text}
      </Text>
    </View>
  );
};
