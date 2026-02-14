import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme, getCurrentLocale, getLocaleStrings, getDeviceCountryCode, getCountryByIP, SupportedLocale } from '../../utils';
import { ArrowDownIcon } from '../../assets';
import countriesData from '../../constants/countries.json';
import SearchInput from '../SearchInput';
import ModalHeader from '../ModalHeader';
import CountryItem from '../CountryItem';
import Separator from '../Separator';
import { useOrientation } from '../OrientationHOC';

import { Country, CountryPickerProps } from './types';
import { styles } from './styles';

const CountryPicker: React.FC<CountryPickerProps> = ({
  // Core Props
  onSelectCountry,
  placeholder: placeholderProp,
  selectedCountry: initialSelectedCountry = null,
  fullScreen = false,
  disabled = false,
  autoSelectByDeviceRegion = false,
  autoSelectByIP = false,

  // Calling Code Mode
  callingCodeMode = false,
  showFlagInCallingCodeMode = true,
  showCountryCodeInCallingCodeMode = false,
  callingCodeTextStyle,

  // Countries Data
  countries: customCountries,
  excludeCountries = [],
  includeCountries,
  preferredCountries = [],
  filterCountries: customFilterCountries,

  // Locale
  locale: localeProp,

  // Callbacks
  onOpen,
  onClose: onCloseCallback,
  onSearch,

  // Theme
  theme,

  // Picker Field Styles
  containerStyle,
  pickerFieldStyle,
  selectedTextStyle,
  placeholderTextStyle,
  dropdownIconStyle,
  dropdownIcon,
  selectedFlagStyle,
  renderSelectedCountry,

  // Modal Props
  modalAnimationType = 'slide',
  modalContainerStyle,
  bottomSheetStyle,
  bottomSheetHeight = 0.75,
  overlayStyle,
  closeOnOverlayPress = true,

  // Modal Header Props
  headerTitle: headerTitleProp,
  headerStyle,
  headerTitleStyle,
  showCloseButton = true,
  closeButtonStyle,
  closeButtonTextStyle,
  closeButtonText,
  closeButtonIcon,
  showHandle,
  handleStyle,
  closeIconSize,
  renderHeader,

  // Search Input Props
  showSearchInput = true,
  searchPlaceholder: searchPlaceholderProp,
  searchInputContainerStyle,
  searchInputStyle,
  searchInputProps,

  // Country List Props
  listStyle,
  listContentContainerStyle,
  flatListProps,
  showSeparator = true,
  separatorColor,
  separatorHeight,
  separatorMarginHorizontal,
  renderEmptyList,
  emptyListText: emptyListTextProp,
  emptyListStyle,
  emptyListTextStyle,

  // Country Item Props
  showCallingCode = true,
  showFlag = true,
  showRadioButton = true,
  countryItemStyle,
  countryNameStyle,
  countryFlagStyle,
  radioButtonSize,
  radioButtonColor,
  radioButtonBorderColor,
  renderCountryItem,
}) => {
  // Theme
  const { colors } = useTheme();

  // Merge theme colors with defaults
  const themeColors = useMemo(() => ({
    primaryColor: theme?.primaryColor || colors.primary,
    backgroundColor: theme?.backgroundColor || colors.background.primary,
    secondaryBackgroundColor: theme?.secondaryBackgroundColor || colors.background.secondary,
    overlayColor: theme?.overlayColor || colors.background.overlay,
    textColor: theme?.textColor || colors.text.primary,
    secondaryTextColor: theme?.secondaryTextColor || colors.text.secondary,
    placeholderColor: theme?.placeholderColor || colors.text.placeholder,
    borderColor: theme?.borderColor || colors.border.primary,
    separatorColor: theme?.separatorColor || colors.separator,
  }), [theme, colors]);

  // Safe area insets
  const insets = useSafeAreaInsets();

  // Orientation data for landscape support
  const orientationData = useOrientation();

  // Determine the locale to use (prop > device > fallback to 'en')
  const locale: SupportedLocale = useMemo(() => {
    return localeProp || getCurrentLocale();
  }, [localeProp]);

  // Get localized UI strings
  const localeStrings = useMemo(() => getLocaleStrings(locale), [locale]);

  // Resolve props with localized defaults (use calling code strings when in calling code mode)
  const placeholder = placeholderProp ?? (callingCodeMode ? localeStrings.callingCodePlaceholder : localeStrings.placeholder);
  const headerTitle = headerTitleProp ?? (callingCodeMode ? localeStrings.callingCodeHeaderTitle : localeStrings.headerTitle);
  const searchPlaceholder = searchPlaceholderProp ?? localeStrings.searchPlaceholder;
  const emptyListText = emptyListTextProp ?? localeStrings.emptyListText;

  // Helper to get localized country name
  const getLocalizedName = useCallback((nameObj: Record<string, string> | undefined): string => {
    if (!nameObj) return '';
    // Try the current locale first, then fall back to English
    return nameObj[locale] || nameObj.en || '';
  }, [locale]);

  // Compute initial selected country (from prop or device region) - runs once on mount
  const getInitialCountry = (): Country | null => {
    if (initialSelectedCountry) {
      return initialSelectedCountry;
    }
    
    if (autoSelectByDeviceRegion) {
      const deviceCountryCode = getDeviceCountryCode();
      if (deviceCountryCode) {
        const countryData = (countriesData as Record<string, any>)[deviceCountryCode.toUpperCase()];
        if (countryData) {
          const currentLocale = localeProp || getCurrentLocale();
          return {
            code: deviceCountryCode.toUpperCase(),
            name: countryData.name?.[currentLocale] || countryData.name?.en || '',
            localizedNames: countryData.name,
            callingCode: countryData.callingCode || '',
            flag: countryData.flag || '',
            currency: countryData.currency || '',
            region: countryData.region || '',
          };
        }
      }
    }
    
    return null;
  };

  // State - use lazy initializer for selectedCountry
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(getInitialCountry);
  const [searchQuery, setSearchQuery] = useState('');

  // Transform countries data into array format
  const countries: Country[] = useMemo(() => {
    if (customCountries) {
      return customCountries;
    }

    let countryList = Object.entries(countriesData).map(([code, data]: [string, any]) => ({
      code,
      name: getLocalizedName(data.name),
      localizedNames: data.name,
      callingCode: data.callingCode || '',
      flag: data.flag || '',
      currency: data.currency || '',
      region: data.region || '',
    }));

    // Apply includeCountries filter
    if (includeCountries && includeCountries.length > 0) {
      const includeSet = new Set(includeCountries.map(c => c.toUpperCase()));
      countryList = countryList.filter(c => includeSet.has(c.code.toUpperCase()));
    }

    // Apply excludeCountries filter
    if (excludeCountries.length > 0) {
      const excludeSet = new Set(excludeCountries.map(c => c.toUpperCase()));
      countryList = countryList.filter(c => !excludeSet.has(c.code.toUpperCase()));
    }

    return countryList;
  }, [customCountries, excludeCountries, includeCountries, getLocalizedName]);

  // Auto-select country based on IP address (async, runs once on mount)
  const hasIPFetchedRef = useRef(false);
  useEffect(() => {
    const fetchCountryByIP = async () => {
      if (
        autoSelectByIP &&
        !initialSelectedCountry &&
        !hasIPFetchedRef.current
      ) {
        hasIPFetchedRef.current = true;
        const ipCountryCode = await getCountryByIP();
        if (ipCountryCode) {
          const countryData = (countriesData as Record<string, any>)[ipCountryCode.toUpperCase()];
          if (countryData) {
            const currentLocale = localeProp || getCurrentLocale();
            const country: Country = {
              code: ipCountryCode.toUpperCase(),
              name: countryData.name?.[currentLocale] || countryData.name?.en || '',
              localizedNames: countryData.name,
              callingCode: countryData.callingCode || '',
              flag: countryData.flag || '',
              currency: countryData.currency || '',
              region: countryData.region || '',
            };
            setSelectedCountry(country);
            onSelectCountry?.(country);
          }
        }
      }
    };

    fetchCountryByIP();
  }, [autoSelectByIP, initialSelectedCountry, localeProp, onSelectCountry]);

  // Call onSelectCountry for device region auto-select (runs once on mount)
  const hasDeviceRegionCallbackFiredRef = useRef(false);
  useEffect(() => {
    if (
      autoSelectByDeviceRegion &&
      !initialSelectedCountry &&
      selectedCountry &&
      !hasDeviceRegionCallbackFiredRef.current &&
      !autoSelectByIP // Don't fire if IP-based selection is also enabled (it will handle the callback)
    ) {
      hasDeviceRegionCallbackFiredRef.current = true;
      onSelectCountry?.(selectedCountry);
    }
  }, [autoSelectByDeviceRegion, autoSelectByIP, initialSelectedCountry, selectedCountry, onSelectCountry]);

  // Filter countries based on search query and move selected/preferred countries to top
  const filteredCountries = useMemo(() => {
    let filtered = countries;

    // Apply custom filter if provided
    if (customFilterCountries) {
      return customFilterCountries(countries, searchQuery);
    }

    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = countries.filter((country) => {
        const englishName = country.localizedNames?.en?.toLowerCase() || '';
        return (
          country.name.toLowerCase().includes(query) ||
          englishName.includes(query) ||
          country.code.toLowerCase().includes(query) ||
          country.callingCode.includes(query)
        );
      });
    }

    // Apply preferred countries (move to top)
    if (preferredCountries.length > 0 && !searchQuery.trim()) {
      const preferredSet = new Set(preferredCountries.map(c => c.toUpperCase()));
      const preferred = filtered.filter(c => preferredSet.has(c.code.toUpperCase()));
      const rest = filtered.filter(c => !preferredSet.has(c.code.toUpperCase()));
      
      // Sort preferred countries in the order specified
      preferred.sort((a, b) => {
        const aIndex = preferredCountries.findIndex(p => p.toUpperCase() === a.code.toUpperCase());
        const bIndex = preferredCountries.findIndex(p => p.toUpperCase() === b.code.toUpperCase());
        return aIndex - bIndex;
      });
      
      filtered = [...preferred, ...rest];
    }

    // Move selected country to top if it exists
    if (selectedCountry) {
      const selectedInList = filtered.find(
        (c) => c.code === selectedCountry.code
      );
      if (selectedInList) {
        filtered = [
          selectedInList,
          ...filtered.filter((c) => c.code !== selectedCountry.code),
        ];
      }
    }

    return filtered;
  }, [countries, searchQuery, selectedCountry, preferredCountries, customFilterCountries]);

  // Handlers
  const handleSelectCountry = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      setIsModalVisible(false);
      setSearchQuery('');
      onSelectCountry?.(country);
    },
    [onSelectCountry]
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
      onSearch?.(text);
    },
    [onSearch]
  );

  const openModal = useCallback(() => {
    if (disabled) return;
    setIsModalVisible(true);
    onOpen?.();
  }, [disabled, onOpen]);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setSearchQuery('');
    onCloseCallback?.();
  }, [onCloseCallback]);

  const handleOverlayPress = useCallback(() => {
    if (closeOnOverlayPress) {
      closeModal();
    }
  }, [closeOnOverlayPress, closeModal]);

  // Render functions
  const renderCountryItemInternal = useCallback(
    ({ item }: { item: Country }) => {
      if (renderCountryItem) {
        return (
          <>
            {renderCountryItem({
              country: item,
              isSelected: selectedCountry?.code === item.code,
              onSelect: handleSelectCountry,
            })}
          </>
        );
      }

      return (
        <CountryItem
          country={item}
          isSelected={selectedCountry?.code === item.code}
          onPress={handleSelectCountry}
          showCallingCode={showCallingCode}
          showFlag={showFlag}
          showRadioButton={showRadioButton}
          containerStyle={countryItemStyle}
          countryNameStyle={countryNameStyle}
          flagStyle={countryFlagStyle}
          radioButtonSize={radioButtonSize}
          radioButtonColor={radioButtonColor || colors.radioButton.selected}
          radioButtonBorderColor={radioButtonBorderColor || colors.radioButton.unselected}
          textColor={themeColors.textColor}
          flagBorderColor={colors.border.dark}
        />
      );
    },
    [
      selectedCountry,
      handleSelectCountry,
      showCallingCode,
      showFlag,
      showRadioButton,
      countryItemStyle,
      countryNameStyle,
      countryFlagStyle,
      radioButtonSize,
      radioButtonColor,
      radioButtonBorderColor,
      themeColors,
      colors,
      renderCountryItem,
    ]
  );

  const renderSeparator = useCallback(() => {
    if (!showSeparator) return null;
    return (
      <Separator
        color={separatorColor || themeColors.separatorColor}
        height={separatorHeight}
        marginHorizontal={separatorMarginHorizontal}
      />
    );
  }, [showSeparator, separatorColor, separatorHeight, separatorMarginHorizontal, themeColors.separatorColor]);

  const renderEmptyListInternal = useCallback(() => {
    if (renderEmptyList) {
      return <>{renderEmptyList()}</>;
    }

    return (
      <View style={[styles.emptyContainer, emptyListStyle]}>
        <Text style={[styles.emptyText, { color: themeColors.placeholderColor }, emptyListTextStyle]}>
          {emptyListText}
        </Text>
      </View>
    );
  }, [renderEmptyList, emptyListText, emptyListStyle, emptyListTextStyle, themeColors.placeholderColor]);

  const keyExtractor = useCallback((item: Country) => item.code, []);

  const renderModalHeader = useCallback(() => {
    if (renderHeader) {
      return <>{renderHeader(closeModal)}</>;
    }

    return (
      <ModalHeader
        title={headerTitle}
        onClose={closeModal}
        showHandle={showHandle ?? !fullScreen}
        showCloseButton={showCloseButton}
        containerStyle={headerStyle}
        titleStyle={headerTitleStyle}
        closeButtonStyle={closeButtonStyle}
        closeButtonTextStyle={closeButtonTextStyle}
        closeButtonText={closeButtonText}
        closeButtonIcon={closeButtonIcon}
        handleStyle={handleStyle}
        closeIconSize={closeIconSize}
        borderColor={colors.border.light}
        handleColor={themeColors.borderColor}
        titleColor={themeColors.textColor}
        closeButtonColor={themeColors.secondaryTextColor}
      />
    );
  }, [
    renderHeader,
    closeModal,
    headerTitle,
    fullScreen,
    showHandle,
    showCloseButton,
    headerStyle,
    headerTitleStyle,
    closeButtonStyle,
    closeButtonTextStyle,
    closeButtonText,
    closeButtonIcon,
    handleStyle,
    closeIconSize,
    colors.border.light,
    themeColors,
  ]);

  const renderModalContent = () => (
    <>
      {renderModalHeader()}
      {showSearchInput && (
        <SearchInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder={searchPlaceholder}
          containerStyle={searchInputContainerStyle}
          inputStyle={searchInputStyle}
          backgroundColor={themeColors.secondaryBackgroundColor}
          textColor={themeColors.textColor}
          placeholderColor={themeColors.placeholderColor}
          {...searchInputProps}
        />
      )}
      <FlatList
        data={filteredCountries}
        keyExtractor={keyExtractor}
        renderItem={renderCountryItemInternal}
        showsVerticalScrollIndicator={false}
        style={[styles.list, listStyle]}
        contentContainerStyle={[styles.listContent, listContentContainerStyle]}
        ItemSeparatorComponent={showSeparator ? renderSeparator : undefined}
        ListEmptyComponent={renderEmptyListInternal}
        {...flatListProps}
      />
    </>
  );

  const renderPickerField = () => {
    if (selectedCountry && renderSelectedCountry) {
      return <>{renderSelectedCountry(selectedCountry)}</>;
    }

    if (selectedCountry) {
      // Calling Code Mode - displays calling code prominently (e.g., for phone number inputs)
      if (callingCodeMode) {
        const displayParts: string[] = [selectedCountry.callingCode];
        if (showCountryCodeInCallingCodeMode) {
          displayParts.push(`(${selectedCountry.code})`);
        }
        const displayText = displayParts.join(' ');

        return (
          <View style={styles.selectedContainer}>
            {showFlagInCallingCodeMode && (
              <Image
                source={{ uri: selectedCountry.flag }}
                style={[
                  styles.selectedFlag,
                  { borderColor: colors.border.dark },
                  selectedFlagStyle,
                ]}
              />
            )}
            <Text
              style={[
                styles.selectedText,
                styles.callingCodeText,
                { color: themeColors.textColor },
                callingCodeTextStyle,
              ]}
            >
              {displayText}
            </Text>
          </View>
        );
      }

      // Default Mode - displays country name with flag
      return (
        <View style={styles.selectedContainer}>
          <Image
            source={{ uri: selectedCountry.flag }}
            style={[
              styles.selectedFlag,
              { borderColor: colors.border.dark },
              selectedFlagStyle,
            ]}
          />
          <Text style={[styles.selectedText, { color: themeColors.textColor }, selectedTextStyle]}>
            {selectedCountry.name}
          </Text>
        </View>
      );
    }

    return (
      <Text style={[styles.placeholderText, { color: themeColors.placeholderColor }, placeholderTextStyle]}>
        {placeholder}
      </Text>
    );
  };

  const renderDropdownIcon = () => {
    if (dropdownIcon) {
      return <View style={[styles.dropdownIcon, dropdownIconStyle]}>{dropdownIcon}</View>;
    }

    return (
      <View style={[styles.dropdownIcon, dropdownIconStyle]}>
        <ArrowDownIcon size={20} color={themeColors.secondaryTextColor} />
      </View>
    );
  };

  // Memoized picker field style to avoid inline style warnings
  const pickerFieldComputedStyle = useMemo(() => ({
    backgroundColor: themeColors.backgroundColor,
    borderColor: themeColors.borderColor,
    opacity: disabled ? 0.5 : 1,
  }), [themeColors.backgroundColor, themeColors.borderColor, disabled]);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Picker Field */}
      <TouchableOpacity
        style={[
          styles.textField,
          pickerFieldComputedStyle,
          pickerFieldStyle,
        ]}
        onPress={openModal}
        activeOpacity={disabled ? 1 : 0.7}
        disabled={disabled}
      >
        {renderPickerField()}
        {renderDropdownIcon()}
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType={modalAnimationType}
        transparent={!fullScreen}
        onRequestClose={closeModal}
        supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
        
      >
        {fullScreen ? (
          <View
            style={[
              styles.fullScreenContainer,
              {
                backgroundColor: themeColors.backgroundColor,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
              },
              modalContainerStyle,
            ]}
          >
            <View style={styles.fullScreenContent}>
              {renderModalContent()}
            </View>
          </View>
        ) : (
          <View style={[styles.modalOverlay, { backgroundColor: themeColors.overlayColor }, overlayStyle]}>
            <TouchableOpacity
              style={styles.overlayTouchable}
              activeOpacity={1}
              onPress={handleOverlayPress}
            />
            <View
              style={[
                styles.bottomSheet,
                {
                  backgroundColor: themeColors.backgroundColor,
                  // Use dynamic screen height from orientation data
                  height: orientationData.screenHeight *  bottomSheetHeight,
                  paddingBottom: insets.bottom,
                  paddingLeft: insets.left,
                  paddingRight: insets.right,
                },
                bottomSheetStyle,
              ]}
            >
              {renderModalContent()}
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default CountryPicker;
