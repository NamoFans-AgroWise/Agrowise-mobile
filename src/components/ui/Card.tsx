import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  className?: string;
}

const variantStyles = {
  default: 'bg-white',
  elevated: 'bg-white shadow-lg',
  bordered: 'bg-white border border-gray-200',
} as const;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  return (
    <View className={`rounded-3xl p-4 ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </View>
  );
};
