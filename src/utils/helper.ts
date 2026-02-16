import { getCountry } from 'react-native-localize';

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
 * Uses react-native-localize for accurate device region detection
 */
export const getDeviceCountryCode = (): string | null => {
  try {
    const countryCode = getCountry();
    return countryCode || null;
  } catch (error) {
    console.warn('Error getting device country code:', error);
    return null;
  }
};
