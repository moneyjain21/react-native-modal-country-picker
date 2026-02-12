import { StyleProp, ViewStyle, TextStyle, ImageStyle, FlatListProps, TextInputProps, ModalProps } from 'react-native';

import { SupportedLocale } from '../../utils';

export interface CountryName {
  en: string;
  [key: string]: string | undefined;
}

export interface Country {
  /** ISO country code (e.g., "US", "IN") */
  code: string;
  /** Country name (localized based on current locale) */
  name: string;
  /** All available translations of the country name */
  localizedNames?: CountryName;
  /** International calling code (e.g., "+1", "+91") */
  callingCode: string;
  /** Base64 encoded flag image */
  flag: string;
  /** Currency code (e.g., "USD", "INR") */
  currency: string;
  /** Geographic region (e.g., "Asia", "Europe") */
  region: string;
}

export interface CountryPickerTheme {
  /** Primary color (used for selected states, actions) */
  primaryColor?: string;
  /** Background colors */
  backgroundColor?: string;
  /** Secondary background color (for inputs, etc.) */
  secondaryBackgroundColor?: string;
  /** Modal overlay color */
  overlayColor?: string;
  /** Primary text color */
  textColor?: string;
  /** Secondary text color */
  secondaryTextColor?: string;
  /** Placeholder text color */
  placeholderColor?: string;
  /** Border color */
  borderColor?: string;
  /** Separator color */
  separatorColor?: string;
}

export interface CountryPickerProps {
  // ==================== Core Props ====================
  /** Callback when a country is selected */
  onSelectCountry?: (country: Country) => void;
  /** Placeholder text for the picker field */
  placeholder?: string;
  /** Initially selected country */
  selectedCountry?: Country | null;
  /** Whether to show the modal in fullscreen mode */
  fullScreen?: boolean;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /**
   * Automatically select the country based on device's region settings.
   * Uses the device's locale (e.g., en_US -> United States, de_DE -> Germany).
   * Only applies if no `selectedCountry` prop is provided.
   * Default: false
   */
  autoSelectByDeviceRegion?: boolean;
  /**
   * Automatically select the country based on user's IP address.
   * Makes an API call to determine the user's country.
   * Takes precedence over autoSelectByDeviceRegion if both are enabled.
   * Only applies if no `selectedCountry` prop is provided.
   * Default: false
   */
  autoSelectByIP?: boolean;

  // ==================== Calling Code Mode ====================
  /**
   * Enable calling code mode for phone number input scenarios.
   * When enabled, the picker field displays the calling code (e.g., "+1", "+91")
   * instead of the country name.
   */
  callingCodeMode?: boolean;
  /**
   * Whether to show the flag alongside the calling code in the picker field.
   * Only applies when callingCodeMode is true. Default: true
   */
  showFlagInCallingCodeMode?: boolean;
  /**
   * Whether to show the country code (e.g., "US", "IN") alongside the calling code.
   * Only applies when callingCodeMode is true. Default: false
   */
  showCountryCodeInCallingCodeMode?: boolean;
  /** Style for the calling code text in the picker field */
  callingCodeTextStyle?: StyleProp<TextStyle>;

  // ==================== Countries Data ====================
  /** Custom countries array (overrides default) */
  countries?: Country[];
  /** Country codes to exclude from the list */
  excludeCountries?: string[];
  /** Country codes to include (only these will be shown) */
  includeCountries?: string[];
  /** Country codes to show at the top of the list */
  preferredCountries?: string[];
  /** Custom filter function for countries */
  filterCountries?: (countries: Country[], searchQuery: string) => Country[];

  // ==================== Locale ====================
  /** 
   * Language code for country names (e.g., 'en', 'de', 'fr', 'es', 'zh')
   * If not provided, uses device language. Falls back to English if unsupported.
   */
  locale?: SupportedLocale;

  // ==================== Callbacks ====================
  /** Called when the modal opens */
  onOpen?: () => void;
  /** Called when the modal closes */
  onClose?: () => void;
  /** Called when search text changes */
  onSearch?: (searchQuery: string) => void;

  // ==================== Theme ====================
  /** Theme object to customize colors */
  theme?: CountryPickerTheme;

  // ==================== Picker Field Styles ====================
  /** Style for the outer container (use to set width, margins, etc.) */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style for the picker field/button */
  pickerFieldStyle?: StyleProp<ViewStyle>;
  /** Style for the selected country text */
  selectedTextStyle?: StyleProp<TextStyle>;
  /** Style for the placeholder text */
  placeholderTextStyle?: StyleProp<TextStyle>;
  /** Style for the dropdown icon container */
  dropdownIconStyle?: StyleProp<ViewStyle>;
  /** Custom dropdown icon (React element) */
  dropdownIcon?: React.ReactNode;
  /** Style for the selected flag in picker field */
  selectedFlagStyle?: StyleProp<ImageStyle>;
  /** Custom render function for selected country display */
  renderSelectedCountry?: (country: Country) => React.ReactNode;

  // ==================== Modal Props ====================
  /** Modal animation type */
  modalAnimationType?: ModalProps['animationType'];
  /** Style for the modal container (fullscreen) */
  modalContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the bottom sheet container */
  bottomSheetStyle?: StyleProp<ViewStyle>;
  /** Height percentage for bottom sheet (0-1, default 0.75) */
  bottomSheetHeight?: number;
  /** Style for the overlay backdrop */
  overlayStyle?: StyleProp<ViewStyle>;
  /** Whether to close modal when overlay is pressed (default true) */
  closeOnOverlayPress?: boolean;

  // ==================== Modal Header Props ====================
  /** Custom title text for the modal header */
  headerTitle?: string;
  /** Style for the header container */
  headerStyle?: StyleProp<ViewStyle>;
  /** Style for the header title text */
  headerTitleStyle?: StyleProp<TextStyle>;
  /** Whether to show the close button (default true) */
  showCloseButton?: boolean;
  /** Style for the close button */
  closeButtonStyle?: StyleProp<ViewStyle>;
  /** Style for the close button text */
  closeButtonTextStyle?: StyleProp<TextStyle>;
  /** Text to display on close button (e.g., "Done", "Close", "Cancel") */
  closeButtonText?: string;
  /** Custom close button icon (React element) - takes precedence over closeButtonText */
  closeButtonIcon?: React.ReactNode;
  /** Whether to show the drag handle (for bottom sheet) */
  showHandle?: boolean;
  /** Style for the drag handle */
  handleStyle?: StyleProp<ViewStyle>;
  /** Size of the close icon (default: 24) */
  closeIconSize?: number;
  /** Custom header render function */
  renderHeader?: (onClose: () => void) => React.ReactNode;

  // ==================== Search Input Props ====================
  /** Whether to show the search input (default true) */
  showSearchInput?: boolean;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Style for the search input container */
  searchInputContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the search input */
  searchInputStyle?: StyleProp<TextStyle>;
  /** Additional TextInput props for search input */
  searchInputProps?: Partial<TextInputProps>;

  // ==================== Country List Props ====================
  /** Style for the FlatList */
  listStyle?: StyleProp<ViewStyle>;
  /** Content container style for FlatList */
  listContentContainerStyle?: StyleProp<ViewStyle>;
  /** Additional FlatList props */
  flatListProps?: Partial<FlatListProps<Country>>;
  /** Whether to show separators between items (default true) */
  showSeparator?: boolean;
  /** Color for the separator */
  separatorColor?: string;
  /** Height for the separator */
  separatorHeight?: number;
  /** Horizontal margin for the separator */
  separatorMarginHorizontal?: number;
  /** Custom empty list component */
  renderEmptyList?: () => React.ReactNode;
  /** Text to show when list is empty */
  emptyListText?: string;
  /** Style for the empty list container */
  emptyListStyle?: StyleProp<ViewStyle>;
  /** Style for the empty list text */
  emptyListTextStyle?: StyleProp<TextStyle>;

  // ==================== Country Item Props ====================
  /** Whether to show calling code in country item (default true) */
  showCallingCode?: boolean;
  /** Whether to show flag in country item (default true) */
  showFlag?: boolean;
  /** Whether to show radio button (default true) */
  showRadioButton?: boolean;
  /** Style for the country item container */
  countryItemStyle?: StyleProp<ViewStyle>;
  /** Style for the country name text */
  countryNameStyle?: StyleProp<TextStyle>;
  /** Style for the flag in list item */
  countryFlagStyle?: StyleProp<ImageStyle>;
  /** Size of the radio button */
  radioButtonSize?: number;
  /** Color of the radio button when selected */
  radioButtonColor?: string;
  /** Border color of the radio button */
  radioButtonBorderColor?: string;
  /** Custom render function for country item */
  renderCountryItem?: (props: {
    country: Country;
    isSelected: boolean;
    onSelect: (country: Country) => void;
  }) => React.ReactNode;
}
