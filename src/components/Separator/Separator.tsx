import React from 'react';
import { View } from 'react-native';

import { useTheme } from '../../utils';
import { SeparatorProps } from './types';
import { styles } from './styles';

const Separator: React.FC<SeparatorProps> = ({
  color,
  height = 1,
  marginHorizontal = 16,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: color || colors.separator,
          height,
          marginHorizontal,
        },
        style,
      ]}
    />
  );
};

export default Separator;
