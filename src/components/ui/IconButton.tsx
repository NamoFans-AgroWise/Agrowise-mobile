import React from 'react';
import { TouchableOpacity } from 'react-native';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'action';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const variantBg = {
  primary: 'bg-primary',
  secondary: 'bg-gray-200',
  ghost: 'bg-transparent',
  action: 'bg-action',
} as const;

const sizeStyles = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-14 h-14',
} as const;

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      className={`rounded-full items-center justify-center ${variantBg[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {icon}
    </TouchableOpacity>
  );
};
