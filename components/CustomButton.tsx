import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ViewStyle, TextStyle } from 'react-native';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol'; // Assuming IconSymbol is in the same directory
import { MaterialIcons } from '@expo/vector-icons';

type ButtonVariant = 'text' | 'iconText' | 'iconTextDropdown';

interface CustomButtonProps {
  label: string;
  variant: ButtonVariant;
  iconName?: IconSymbolName; // Optional for `text` variant
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function CustomButton({
  label,
  variant,
  iconName,
  onPress,
  style,
  textStyle,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {variant !== 'text' && iconName && (
        <IconSymbol
          name={iconName}
          size={20}
          color="#fff"
          style={styles.icon}
        />
      )}
      <Text style={[styles.label, textStyle]}>{label}</Text>
      {variant === 'iconTextDropdown' && (
        <MaterialIcons name="keyboard-arrow-down" size={20} color="#fff" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5A2A3E', // Matches the color in the example image
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
