import React from 'react';
import { View } from 'react-native';

import { useTheme } from '../../utils';
import { RadioButtonProps } from './types';
import { styles } from './styles';

const RadioButton: React.FC<RadioButtonProps> = ({
  isSelected,
  size = 20,
  color,
  borderColor,
}) => {
  const { colors } = useTheme();

  const selectedColor = color || colors.radioButton.selected;
  const unselectedColor = borderColor || colors.radioButton.unselected;
  const outerSize = size;
  const innerSize = size * 0.6;

  return (
    <View
      style={[
        styles.radioButton,
        {
          width: outerSize,
          height: outerSize,
          borderRadius: outerSize / 2,
          borderColor: isSelected ? selectedColor : unselectedColor,
        },
      ]}
    >
      {isSelected && (
        <View
          style={[
            styles.radioButtonSelected,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
              backgroundColor: selectedColor,
            },
          ]}
        />
      )}
    </View>
  );
};

export default RadioButton;
