import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'action';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const variantBg = {
  primary: 'bg-primary',
  secondary: 'bg-gray-600',
  outline: 'bg-transparent border-2 border-primary',
  danger: 'bg-danger',
  action: 'bg-action',
} as const;

const variantText = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-primary',
  danger: 'text-white',
  action: 'text-white',
} as const;

const sizeStyles = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
} as const;

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const;

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`flex-row items-center justify-center rounded-2xl ${variantBg[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#10b77f' : '#fff'} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && iconPosition === 'left' && icon}
          <Text className={`font-semibold ${variantText[variant]} ${textSizes[size]}`}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </View>
      )}
    </TouchableOpacity>
  );
};
