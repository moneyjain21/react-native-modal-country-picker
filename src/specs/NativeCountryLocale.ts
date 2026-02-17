import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

/**
 * TurboModule specification for CountryLocale native module.
 * Provides native locale-related functionality for country detection.
 */
export interface Spec extends TurboModule {
  /**
   * Returns the user's current country code based on device locale.
   * Returns ISO 3166-1 alpha-2 country codes (e.g., "US", "FR", "DE").
   * For Latin American regional settings, returns "UN" instead of "419".
   */
  getCountry(): string;

  /**
   * Returns the user's preferred locales in order of preference.
   * Each locale object contains languageCode, countryCode, languageTag, and isRTL.
   */
  getLocales(): Array<{
    languageCode: string;
    scriptCode?: string;
    countryCode: string;
    languageTag: string;
    isRTL: boolean;
  }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('CountryLocale');
