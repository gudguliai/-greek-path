// Greek Path theme — carried over from the original styles.css palette.
// Light-only by design: the web app was cream/teal; keep it consistent on native.

export const palette = {
  ink: '#173f3a',
  cream: '#fbf6eb',
  paper: '#fffdf8',
  gold: '#e4ac39',
  coral: '#d76b51',
  muted: '#66726c',
  line: '#e2ded2',
  mint: '#d9eee2',
  inkHover: '#0d2f2a',
  mintDeep: '#487368',
  goldSoft: '#f5cb62',
  white: '#ffffff',
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
} as const;

export const spacing = {
  xs: 6,
  sm: 12,
  md: 18,
  lg: 28,
  xl: 42,
} as const;

// ui-rounded on iOS, system-ui elsewhere (mirrors original font stack)
export const fontFamily =
  (process as any).env?.EXPO_OS === 'ios' ? 'ui-rounded' : 'system-ui';
