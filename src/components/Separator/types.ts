import { StyleProp, ViewStyle } from 'react-native';

export interface SeparatorProps {
  /** Color of the separator line */
  color?: string;
  /** Height of the separator line */
  height?: number;
  /** Horizontal margin on both sides */
  marginHorizontal?: number;
  /** Custom style for the separator */
  style?: StyleProp<ViewStyle>;
}
