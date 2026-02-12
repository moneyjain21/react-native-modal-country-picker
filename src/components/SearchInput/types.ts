import { TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface SearchInputProps extends Omit<TextInputProps, 'style'> {
  /** Current value of the search input */
  value: string;
  /** Callback when text changes */
  onChangeText: (text: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Custom style for the outer container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Custom style for the input wrapper (contains icons and input) */
  inputContainerStyle?: StyleProp<ViewStyle>;
  /** Custom style for the text input */
  inputStyle?: StyleProp<TextStyle>;
  /** Background color for the input */
  backgroundColor?: string;
  /** Text color for the input */
  textColor?: string;
  /** Placeholder text color */
  placeholderColor?: string;
  /** Color for the icons */
  iconColor?: string;
  /** Size of the icons (default: 20) */
  iconSize?: number;
  /** Whether to show the search icon on the left (default: true) */
  showSearchIcon?: boolean;
  /** Whether to show the clear icon on the right when text exists (default: true) */
  showClearIcon?: boolean;
  /** Custom search icon (React element) */
  searchIcon?: React.ReactNode;
  /** Custom clear icon (React element) */
  clearIcon?: React.ReactNode;
}
