// app/components/ControlBar.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../theme'; // adjust path if needed

export const ControlBar: React.FC = () => {
  return <View style={styles.controlBar} />;
};

export default ControlBar;

const styles = StyleSheet.create({
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,          // 👈 ensures full width
    right: 0,         // 👈 ensures full width
    height: 50,
    backgroundColor: theme.colors.darkGreen,
    zIndex: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.primaryGreen, // optional accent
  },
});
