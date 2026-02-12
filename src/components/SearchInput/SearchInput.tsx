import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import { useTheme } from '../../utils';
import { SearchIcon, CloseIcon } from '../../assets';
import { SearchInputProps } from './types';
import { styles } from './styles';

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  containerStyle,
  inputContainerStyle,
  inputStyle,
  backgroundColor,
  textColor,
  placeholderColor,
  iconColor,
  iconSize = 20,
  showSearchIcon = true,
  showClearIcon = true,
  searchIcon,
  clearIcon,
  ...rest
}) => {
  const { colors } = useTheme();

  const resolvedIconColor = iconColor || colors.icon.secondary;
  const resolvedBackgroundColor = backgroundColor || colors.background.secondary;
  const resolvedTextColor = textColor || colors.text.primary;
  const resolvedPlaceholderColor = placeholderColor || colors.text.placeholder;

  const handleClear = () => {
    onChangeText('');
  };

  const renderSearchIcon = () => {
    if (!showSearchIcon) return null;

    return (
      <View style={styles.searchIconContainer}>
        {searchIcon || <SearchIcon size={iconSize} color={resolvedIconColor} />}
      </View>
    );
  };

  const renderClearIcon = () => {
    if (!showClearIcon || !value) return null;

    return (
      <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
        {clearIcon || <CloseIcon size={iconSize} color={resolvedIconColor} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: resolvedBackgroundColor },
          inputContainerStyle,
        ]}
      >
        {renderSearchIcon()}
        <TextInput
          style={[
            styles.input,
            { color: resolvedTextColor },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={resolvedPlaceholderColor}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
          {...rest}
        />
        {renderClearIcon()}
      </View>
    </View>
  );
};

export default SearchInput;
