import { getDeviceLocaleRaw } from './locale';

/**
 * Response from IP geolocation API
 */
export interface IPLocationInfo {
  country: string;
  city?: string;
  region?: string;
}

/**
 * Get the user's country code based on their IP address
 * Uses ipinfo.io API for geolocation
 */
export const getCountryByIP = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    return data.country || null; // Returns country code like "US", "IN", "DE"
  } catch (error) {
    console.warn('Error fetching country by IP:', error);
    return null;
  }
};

/**
 * Get the device's country/region code (e.g., 'US', 'DE', 'IN')
 * Extracts the country code from locale strings like 'en_US', 'de_DE', 'en-GB'
 */
export const getDeviceCountryCode = (): string | null => {
  const locale = getDeviceLocaleRaw();
  
  // Split by underscore or hyphen (e.g., 'en_US' or 'en-US')
  const parts = locale.split(/[-_]/);
  
  // The country code is typically the second part and is 2 characters
  if (parts.length >= 2) {
    const countryCode = parts[1].toUpperCase();
    // Validate it looks like a country code (2 uppercase letters)
    if (/^[A-Z]{2}$/.test(countryCode)) {
      return countryCode;
    }
  }
  
  return null;
};
