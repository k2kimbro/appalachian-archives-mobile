// app/theme.ts

import { TextStyle } from "react-native";

type FontWeight = TextStyle['fontWeight'];

export const typography = {
  fontSize: { sm: 14, md: 16, lg: 20 },
  fontWeight: {
    regular: '400' as FontWeight,
    bold: 'bold' as FontWeight,
  },
};

export const colors = {
  // Appalachian Archives brand palette
  primaryGreen: '#3B4C47',   // official brand green
  darkGreen: '#2A3632',      // deeper accent
  beige: '#F0E4C6',          // background / neutral
  white: '#FFFFFF',
  black: '#000000',
};

export const header = {
  style: {
    backgroundColor: colors.primaryGreen,
    borderBottomWidth: 20, // thickness of the bar
    borderBottomColor: colors.primaryGreen, // bar color
  },
  titleStyle: {
    fontWeight: '500' as TextStyle['fontWeight'],
    fontSize: typography.fontSize.lg,
    color: colors.primaryGreen,
  },
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  header,
};
