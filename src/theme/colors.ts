export const colors = {
  primary: {
    DEFAULT: '#10b77f',
    dark: '#0a8f61',
    light: '#34d399',
  },
  action: {
    DEFAULT: '#f59e0b',
    dark: '#d97706',
    light: '#fbbf24',
  },
  danger: {
    DEFAULT: '#DC2626',
    dark: '#b91c1c',
    light: '#ef4444',
  },
  surface: {
    light: '#ffffff',
    dark: '#1a332a',
  },
  background: {
    light: '#f0fdf4',
    dark: '#10221c',
  },
  text: {
    main: {
      light: '#0d1b17',
      dark: '#e0e7e5',
    },
    sub: {
      light: '#4c9a80',
      dark: '#8abeb0',
    },
  },
  secondary: '#8B5E3C',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

export const lightTheme = {
  background: colors.background.light,
  surface: colors.surface.light,
  text: colors.text.main.light,
  textSub: colors.text.sub.light,
  primary: colors.primary.DEFAULT,
  action: colors.action.DEFAULT,
  danger: colors.danger.DEFAULT,
  border: colors.gray[200],
};

export const darkTheme = {
  background: colors.background.dark,
  surface: colors.surface.dark,
  text: colors.text.main.dark,
  textSub: colors.text.sub.dark,
  primary: colors.primary.DEFAULT,
  action: colors.action.DEFAULT,
  danger: colors.danger.DEFAULT,
  border: colors.gray[700],
};
