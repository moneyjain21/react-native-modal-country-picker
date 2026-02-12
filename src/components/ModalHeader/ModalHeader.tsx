import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../../utils';
import { CloseIcon } from '../../assets';
import { ModalHeaderProps } from './types';
import { styles } from './styles';

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  showHandle = false,
  showCloseButton = true,
  containerStyle,
  titleStyle,
  closeButtonStyle,
  closeButtonTextStyle,
  closeButtonText,
  closeButtonIcon,
  handleStyle,
  borderColor,
  handleColor,
  titleColor,
  closeButtonColor,
  closeIconSize = 24,
}) => {
  const { colors } = useTheme();

  const buttonColor = closeButtonColor || colors.text.secondary;

  const renderCloseButton = () => {
    if (!showCloseButton) return null;

    // Custom icon takes highest precedence
    if (closeButtonIcon) {
      return (
        <TouchableOpacity onPress={onClose} style={[styles.closeButton, closeButtonStyle]}>
          {closeButtonIcon}
        </TouchableOpacity>
      );
    }

    // Text button (e.g., "Done", "Close", "Cancel")
    if (closeButtonText) {
      return (
        <TouchableOpacity onPress={onClose} style={[styles.closeButton, closeButtonStyle]}>
          <Text style={[styles.closeButtonText, { color: buttonColor }, closeButtonTextStyle]}>
            {closeButtonText}
          </Text>
        </TouchableOpacity>
      );
    }

    // Default: CloseIcon
    return (
      <TouchableOpacity onPress={onClose} style={[styles.closeButton, closeButtonStyle]}>
        <CloseIcon size={closeIconSize} color={buttonColor} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { borderBottomColor: borderColor || colors.border.light }, containerStyle]}>
      {showHandle && (
        <View style={[styles.handleBar, { backgroundColor: handleColor || colors.border.primary }, handleStyle]} />
      )}
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: titleColor || colors.text.primary }, titleStyle]}>
          {title}
        </Text>
        {renderCloseButton()}
      </View>
    </View>
  );
};

export default ModalHeader;
