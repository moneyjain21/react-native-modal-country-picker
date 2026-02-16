import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../utils';

export interface ArrowDownIconProps {
  size?: number;
  color?: string;
}

const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({ size = 24, color }) => {
  const { colors } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9L12 15L18 9"
        stroke={color || colors.icon.secondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowDownIcon;
