import { TurboModuleRegistry, NativeModules } from 'react-native';
import type { Spec } from '../specs/NativeCountryLocale';

// Locale type definition
export interface LocaleInfo {
  languageCode: string;
  scriptCode?: string;
  countryCode: string;
  languageTag: string;
  isRTL: boolean;
}

// Default fallback locale
const DEFAULT_LOCALE: LocaleInfo = {
  languageCode: 'en',
  countryCode: 'US',
  languageTag: 'en-US',
  isRTL: false,
};

// Cache for locale data (locale changes are rare)
let cachedCountry: string | null = null;
let cachedLocales: LocaleInfo[] | null = null;

/**
 * Attempts to get the TurboModule, falls back to the bridge module if unavailable.
 */
const getNativeModule = (): Spec | null => {
  try {
    // Try to get the TurboModule first (new architecture)
    const turboModule = TurboModuleRegistry.get<Spec>('CountryLocale');
    if (turboModule) {
      return turboModule;
    }
  } catch (e) {
    // TurboModule not available, try NativeModules
  }

  // Fallback to bridge module (old architecture)
  const nativeModule = NativeModules.CountryLocale;
  if (nativeModule) {
    return nativeModule as Spec;
  }

  return null;
};

const CountryLocaleModule = getNativeModule();

/**
 * Gets the user's current country code based on device locale.
 * Returns ISO 3166-1 alpha-2 country codes (e.g., "US", "FR", "DE").
 * Falls back to "US" if native module is unavailable.
 * Results are cached for performance.
 */
export const getCountry = (): string => {
  // Return cached value if available
  if (cachedCountry !== null) {
    return cachedCountry;
  }

  if (CountryLocaleModule) {
    try {
      cachedCountry = CountryLocaleModule.getCountry();
      return cachedCountry;
    } catch (error) {
      console.warn('CountryLocale.getCountry() failed:', error);
    }
  }
  // Fallback to US if native module unavailable
  cachedCountry = 'US';
  return cachedCountry;
};

/**
 * Gets the user's preferred locales in order of preference.
 * Returns a default locale array if native module is unavailable.
 * Results are cached for performance.
 */
export const getLocales = (): LocaleInfo[] => {
  // Return cached value if available
  if (cachedLocales !== null) {
    return cachedLocales;
  }

  if (CountryLocaleModule) {
    try {
      cachedLocales = CountryLocaleModule.getLocales() as LocaleInfo[];
      return cachedLocales;
    } catch (error) {
      console.warn('CountryLocale.getLocales() failed:', error);
    }
  }
  // Return default locale if native module unavailable
  cachedLocales = [DEFAULT_LOCALE];
  return cachedLocales;
};

/**
 * Clears the cached locale data.
 * Call this if you need to refresh locale data (e.g., after app comes to foreground).
 */
export const clearCache = (): void => {
  cachedCountry = null;
  cachedLocales = null;
};

/**
 * Checks if the native module is available.
 */
export const isNativeModuleAvailable = (): boolean => {
  return CountryLocaleModule !== null;
};

export default {
  getCountry,
  getLocales,
  clearCache,
  isNativeModuleAvailable,
};
