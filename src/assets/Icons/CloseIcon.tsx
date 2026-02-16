import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../utils';

export interface CloseIconProps {
  size?: number;
  color?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({ size = 24, color }) => {
  const { colors } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 7L7 17M7 7L17 17"
        stroke={color || colors.icon.secondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloseIcon;