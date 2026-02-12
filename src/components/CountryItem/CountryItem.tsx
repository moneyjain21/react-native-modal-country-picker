import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { useTheme } from '../../utils';
import RadioButton from '../RadioButton';
import { CountryItemProps } from './types';
import { styles } from './styles';

const CountryItem: React.FC<CountryItemProps> = ({
  country,
  isSelected,
  onPress,
  showCallingCode = true,
  showFlag = true,
  showRadioButton = true,
  containerStyle,
  countryNameStyle,
  flagStyle,
  radioButtonSize,
  radioButtonColor,
  radioButtonBorderColor,
  textColor,
  flagBorderColor,
}) => {
  const { colors } = useTheme();

  const displayText = showCallingCode
    ? `${country.name} (${country.callingCode})`
    : country.name;

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => onPress(country)}
      activeOpacity={0.7}
    >
      {showFlag && (
        <Image
          source={{ uri: country.flag }}
          style={[
            styles.flagImage,
            { borderColor: flagBorderColor || colors.border.dark },
            flagStyle,
          ]}
        />
      )}
      <View style={styles.countryInfo}>
        <Text style={[styles.countryName, { color: textColor || colors.text.primary }, countryNameStyle]}>
          {displayText}
        </Text>
      </View>
      {showRadioButton && (
        <RadioButton
          isSelected={isSelected}
          size={radioButtonSize}
          color={radioButtonColor || colors.text.muted}
          borderColor={radioButtonBorderColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default CountryItem;
