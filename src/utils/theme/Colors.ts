/**
 * Application Color Palette
 * Defines all colors for light and dark themes.
 */

export const LightColors = {
  // Primary
  primary: 'rgba(0, 122, 255, 1)',

  // Background
  background: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(245, 245, 245, 1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Text
  text: {
    primary: 'rgba(51, 51, 51, 1)',
    secondary: 'rgba(102, 102, 102, 1)',
    placeholder: 'rgba(153, 153, 153, 1)',
    muted: 'rgba(136, 136, 136, 1)',
  },

  // Icon
  icon: {
    primary: 'rgba(51, 51, 51, 1)',
    secondary: 'rgba(102, 102, 102, 1)',
  },

  // Radio Button
  radioButton: {
    selected: 'rgba(102, 102, 102, 1)',
    unselected: 'rgba(102, 102, 102, 1)',
  },

  // Border
  border: {
    primary: 'rgba(221, 221, 221, 1)',
    light: 'rgba(238, 238, 238, 1)',
    dark: 'rgba(180, 180, 180, 1)',
  },

  // Separator
  separator: 'rgba(240, 240, 240, 1)',

  // Utility
  transparent: 'rgba(0, 0, 0, 0)',
} as const;

export const DarkColors = {
  // Primary
  primary: 'rgba(10, 132, 255, 1)',

  // Background
  background: {
    primary: 'rgba(28, 28, 30, 1)',
    secondary: 'rgba(44, 44, 46, 1)',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  // Text
  text: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(174, 174, 178, 1)',
    placeholder: 'rgba(142, 142, 147, 1)',
    muted: 'rgba(142, 142, 147, 1)',
  },

  // Icon
  icon: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(174, 174, 178, 1)',
  },

  // Radio Button
  radioButton: {
    selected: 'rgba(99, 99, 102, 1)',
    unselected: 'rgba(99, 99, 102, 1)',
  },

  // Border
  border: {
    primary: 'rgba(56, 56, 58, 1)',
    light: 'rgba(44, 44, 46, 1)',
    dark: 'rgba(99, 99, 102, 1)',
  },

  // Separator
  separator: 'rgba(56, 56, 58, 1)',

  // Utility
  transparent: 'rgba(0, 0, 0, 0)',
} as const;

// Define a flexible type that allows any string values (not literal types)
export interface ColorsType {
  primary: string;
  background: {
    primary: string;
    secondary: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    placeholder: string;
    muted: string;
  };
  icon: {
    primary: string;
    secondary: string;
  };
  radioButton: {
    selected: string;
    unselected: string;
  };
  border: {
    primary: string;
    light: string;
    dark: string;
  };
  separator: string;
  transparent: string;
}

export const Colors: ColorsType = LightColors;
