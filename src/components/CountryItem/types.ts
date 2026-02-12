import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Country } from '../CountryPicker/types';

export interface CountryItemProps {
  /** Country data to display */
  country: Country;
  /** Whether this country is currently selected */
  isSelected: boolean;
  /** Callback when the country item is pressed */
  onPress: (country: Country) => void;
  /** Whether to show the calling code alongside the name */
  showCallingCode?: boolean;
  /** Whether to show the flag */
  showFlag?: boolean;
  /** Whether to show the radio button */
  showRadioButton?: boolean;
  /** Style for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style for the country name text */
  countryNameStyle?: StyleProp<TextStyle>;
  /** Style for the flag image */
  flagStyle?: StyleProp<ImageStyle>;
  /** Size of the radio button */
  radioButtonSize?: number;
  /** Color of the radio button when selected */
  radioButtonColor?: string;
  /** Border color of the radio button */
  radioButtonBorderColor?: string;
  /** Text color for the country name */
  textColor?: string;
  /** Border color for the flag image */
  flagBorderColor?: string;
}
