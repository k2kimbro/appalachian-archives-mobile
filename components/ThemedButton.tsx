// app/components/ThemedButton.tsx
import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../theme'; // adjust path if needed

interface ThemedButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary';
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          variant === 'primary' ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.xxs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primaryGreen,
  },
  secondary: {
    backgroundColor: theme.colors.beige,
    borderWidth: 1,
    borderColor: theme.colors.primaryGreen,
  },
  text: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: 'OpenSans-Regular',
  },
  primaryText: {
    color: theme.colors.beige,
  },
  secondaryText: {
    color: theme.colors.primaryGreen,
  },
});
