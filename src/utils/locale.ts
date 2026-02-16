import { getLocales } from 'react-native-localize';

/**
 * Supported locale codes that match the keys in countries.json "name" object
 * These are standard ISO 639-1 language codes (with script tags for Chinese variants)
 */
export const SUPPORTED_LOCALES = [
  'en', 'da', 'ru', 'pl', 'uk', 'cs', 'be', 'pt', 'es', 'ro',
  'bg', 'de', 'fr', 'nl', 'it', 'zh-hans', 'zh-hant', 'ko', 'et', 'ja',
  'he', 'el', 'ar', 'tr', 'hu',
] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

/**
 * Get the current device locale that is supported by countries.json
 * Falls back to 'en' if the device locale is not supported
 */
export const getCurrentLocale = (): SupportedLocale => {
  try {
    const locales = getLocales();

    if (locales && locales.length > 0) {
      // Iterate through user's preferred locales and find the first supported one
      for (const locale of locales) {
        const languageCode = locale.languageCode.toLowerCase();
        const scriptCode = locale.scriptCode?.toLowerCase();

        // Build full locale tag for Chinese variants (e.g., zh-hans, zh-hant)
        if (languageCode === 'zh' && scriptCode) {
          const fullTag = `${languageCode}-${scriptCode}` as SupportedLocale;
          if (SUPPORTED_LOCALES.includes(fullTag)) {
            return fullTag;
          }
        }

        // Direct match with supported locales
        if (SUPPORTED_LOCALES.includes(languageCode as SupportedLocale)) {
          return languageCode as SupportedLocale;
        }
      }
    }
  } catch (error) {
    console.warn('Error getting current locale:', error);
  }

  // Default to English if no supported locale found
  return 'en';
};
