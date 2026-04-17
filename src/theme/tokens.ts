export const colors = {
  brand900: "#0B1320",
  brand800: "#132238",
  brand700: "#1B3352",
  accent500: "#2C8CFF",
  accent400: "#5AA5FF",
  success500: "#17B26A",
  warning500: "#F79009",
  danger500: "#F04438",
  surfacePrimary: "#07111F",
  surfaceSecondary: "#101C2E",
  surfaceTertiary: "#18263B",
  surfaceElevated: "#22334D",
  borderSoft: "#29405F",
  borderStrong: "#3D5C84",
  textPrimary: "#F4F7FB",
  textSecondary: "#B7C3D4",
  textMuted: "#8A9AAF",
  textInverse: "#0B1320",
  white: "#FFFFFF",
  overlay: "rgba(3, 10, 19, 0.72)",
  skeleton: "#22324A",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  display: 30,
  h1: 24,
  h2: 20,
  h3: 18,
  body: 15,
  bodySm: 13,
  caption: 12,
} as const;

export const shadows = {
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 6,
  },
} as const;

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
} as const;
