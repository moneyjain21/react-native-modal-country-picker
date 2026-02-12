import { NativeModules, Platform } from 'react-native';

/**
 * Supported language codes in countries.json
 */
export const SUPPORTED_LOCALES = [
  'en', 'da', 'ru', 'pl', 'ua', 'cz', 'by', 'pt', 'es', 'ro',
  'bg', 'de', 'fr', 'nl', 'it', 'cn', 'zh', 'ko', 'ee', 'jp',
  'he', 'el', 'ar', 'tr', 'hu',
] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

/**
 * Get the device's current locale/language code
 */
export const getDeviceLocale = (): string => {
  let locale = 'en';

  try {
    if (Platform.OS === 'ios') {
      locale =
        NativeModules.SettingsManager?.settings?.AppleLocale ||
        NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
        'en';
    } else if (Platform.OS === 'android') {
      locale = NativeModules.I18nManager?.localeIdentifier || 'en';
    }
  } catch {
    locale = 'en';
  }

  // Extract language code (e.g., 'en_US' -> 'en', 'zh-Hans' -> 'zh')
  return locale.split(/[-_]/)[0].toLowerCase();
};

/**
 * Get the best matching supported locale for a given language code
 */
export const getSupportedLocale = (languageCode: string): SupportedLocale => {
  const code = languageCode.toLowerCase();

  // Direct match
  if (SUPPORTED_LOCALES.includes(code as SupportedLocale)) {
    return code as SupportedLocale;
  }

  // Handle special cases
  const localeMap: Record<string, SupportedLocale> = {
    'zh-hans': 'cn',
    'zh-hant': 'zh',
    'ja': 'jp',
    'uk': 'ua',
    'cs': 'cz',
    'be': 'by',
    'et': 'ee',
  };

  if (localeMap[code]) {
    return localeMap[code];
  }

  // Default to English
  return 'en';
};

/**
 * Get the current device locale that is supported
 */
export const getCurrentLocale = (): SupportedLocale => {
  const deviceLocale = getDeviceLocale();
  return getSupportedLocale(deviceLocale);
};

/**
 * Get the device's full locale string (e.g., 'en_US', 'de_DE')
 */
export const getDeviceLocaleRaw = (): string => {
  let locale = 'en_US';

  try {
    if (Platform.OS === 'ios') {
      locale =
        NativeModules.SettingsManager?.settings?.AppleLocale ||
        NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
        'en_US';
    } else if (Platform.OS === 'android') {
      locale = NativeModules.I18nManager?.localeIdentifier || 'en_US';
    }
  } catch {
    locale = 'en_US';
  }

  return locale;
};

