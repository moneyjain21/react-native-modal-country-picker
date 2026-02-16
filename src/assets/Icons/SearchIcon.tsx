import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../utils';

export interface SearchIconProps {
  size?: number;
  color?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({ size = 24, color }) => {
  const { colors } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke={color || colors.icon.secondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SearchIcon;