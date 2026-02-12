import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface ModalHeaderProps {
  /** Title text to display */
  title: string;
  /** Callback when close button is pressed */
  onClose: () => void;
  /** Whether to show the drag handle bar (for bottom sheets) */
  showHandle?: boolean;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Style for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style for the title text */
  titleStyle?: StyleProp<TextStyle>;
  /** Style for the close button */
  closeButtonStyle?: StyleProp<ViewStyle>;
  /** Style for the close button text */
  closeButtonTextStyle?: StyleProp<TextStyle>;
  /** Text to display on close button (e.g., "Done", "Close", "Cancel") */
  closeButtonText?: string;
  /** Custom close button icon (React element) - takes precedence over closeButtonText */
  closeButtonIcon?: React.ReactNode;
  /** Style for the drag handle */
  handleStyle?: StyleProp<ViewStyle>;
  /** Border color for the header */
  borderColor?: string;
  /** Color for the drag handle */
  handleColor?: string;
  /** Color for the title text */
  titleColor?: string;
  /** Color for the close button/icon */
  closeButtonColor?: string;
  /** Size of the close icon (default: 24) */
  closeIconSize?: number;
}
