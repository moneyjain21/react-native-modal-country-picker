# react-native-modal-country-picker

A highly customizable country picker component for React Native with search, theming, localization, and orientation support.

## Features

- Full-screen modal or bottom sheet presentation
- Search functionality with customizable filtering
- Localized country names (English, German, French, Spanish, Chinese, and more)
- Light and dark theme support with full customization
- Calling code mode for phone number inputs
- Auto-select by device region or IP address
- Orientation-aware layouts
- Fully typed with TypeScript

## Demo

<p align="center">
  <img src="./demo/react-native-modal-country-picker-ios.gif" alt="iOS Demo" width="300" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./demo/react-native-modal-country-picker-android.gif" alt="Android Demo" width="300" />
</p>

<p align="center">
  <em>iOS</em>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <em>Android</em>
</p>

## Installation

```bash
npm install react-native-modal-country-picker
# or
yarn add react-native-modal-country-picker
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react-native-safe-area-context react-native-svg
```

> **Note:** If you're using Expo, `react-native-svg` is included in the Expo SDK. For bare React Native projects, follow the [react-native-svg installation guide](https://github.com/software-mansion/react-native-svg#installation).

## Usage

### Basic Usage

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { CountryPicker, Country } from 'react-native-modal-country-picker';

const App = () => {
  const [country, setCountry] = useState<Country | null>(null);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <CountryPicker
        selectedCountry={country}
        onSelectCountry={setCountry}
        placeholder="Select a country"
      />
    </View>
  );
};
```

### Calling Code Mode (Phone Input)

```tsx
<CountryPicker
  callingCodeMode
  showFlagInCallingCodeMode
  selectedCountry={country}
  onSelectCountry={setCountry}
  placeholder="+1"
/>
```

### Full-Screen Mode

```tsx
<CountryPicker
  fullScreen
  selectedCountry={country}
  onSelectCountry={setCountry}
  headerTitle="Select Country"
/>
```

### With Custom Theme

```tsx
<CountryPicker
  selectedCountry={country}
  onSelectCountry={setCountry}
  theme={{
    primaryColor: '#007AFF',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    borderColor: '#DDDDDD',
  }}
/>
```

### Filtered Countries

```tsx
<CountryPicker
  selectedCountry={country}
  onSelectCountry={setCountry}
  preferredCountries={['US', 'GB', 'CA']}
  excludeCountries={['RU', 'CN']}
/>
```

### Localization

```tsx
<CountryPicker
  selectedCountry={country}
  onSelectCountry={setCountry}
  locale="de" // German country names
/>
```

### Auto-Select with Default Fallback

```tsx
<CountryPicker
  selectedCountry={country}
  onSelectCountry={setCountry}
  autoSelectByIP
  defaultCountry="US" // Fallback if IP detection fails
/>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelectCountry` | `(country: Country) => void` | - | Callback when a country is selected |
| `selectedCountry` | `Country \| null` | - | Currently selected country |
| `placeholder` | `string` | - | Placeholder text for the picker field |
| `fullScreen` | `boolean` | `false` | Show modal in fullscreen mode |
| `disabled` | `boolean` | `false` | Disable the picker |
| `autoSelectByDeviceRegion` | `boolean` | `false` | Auto-select based on device region |
| `autoSelectByIP` | `boolean` | `false` | Auto-select based on IP address |
| `defaultCountry` | `string` | - | Default country code (e.g., "US") as fallback when auto-detection fails |

### Calling Code Mode

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `callingCodeMode` | `boolean` | `false` | Display calling code instead of country name |
| `showFlagInCallingCodeMode` | `boolean` | `true` | Show flag with calling code |
| `showCountryCodeInCallingCodeMode` | `boolean` | `false` | Show country code (e.g., "US") |
| `callingCodeTextStyle` | `TextStyle` | - | Style for calling code text |

### Countries Data

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `countries` | `Country[]` | - | Custom countries array |
| `excludeCountries` | `string[]` | - | Country codes to exclude |
| `includeCountries` | `string[]` | - | Only show these country codes |
| `preferredCountries` | `string[]` | - | Country codes to show at top |
| `filterCountries` | `(countries, query) => Country[]` | - | Custom filter function |

### Locale

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | `SupportedLocale` | Device locale | Language for country names |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onOpen` | `() => void` | Called when modal opens |
| `onClose` | `() => void` | Called when modal closes |
| `onSearch` | `(query: string) => void` | Called when search text changes |

### Theme

| Prop | Type | Description |
|------|------|-------------|
| `theme` | `CountryPickerTheme` | Theme object for customization |

### Picker Field Styling

| Prop | Type | Description |
|------|------|-------------|
| `containerStyle` | `ViewStyle` | Style for the outer container |
| `pickerFieldStyle` | `ViewStyle` | Style for the picker field/button |
| `selectedTextStyle` | `TextStyle` | Style for the selected country text |
| `placeholderTextStyle` | `TextStyle` | Style for the placeholder text |
| `dropdownIconStyle` | `ViewStyle` | Style for the dropdown icon container |
| `dropdownIcon` | `ReactNode` | Custom dropdown icon |
| `selectedFlagStyle` | `ImageStyle` | Style for the selected flag |
| `renderSelectedCountry` | `(country: Country) => ReactNode` | Custom render for selected country |

### Modal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modalAnimationType` | `'none' \| 'slide' \| 'fade'` | `'slide'` | Modal animation type |
| `modalContainerStyle` | `ViewStyle` | - | Style for modal container (fullscreen) |
| `bottomSheetStyle` | `ViewStyle` | - | Style for bottom sheet container |
| `bottomSheetHeight` | `number` | `0.75` | Height percentage for bottom sheet (0-1) |
| `overlayStyle` | `ViewStyle` | - | Style for the overlay backdrop |
| `closeOnOverlayPress` | `boolean` | `true` | Close modal when overlay is pressed |

### Modal Header Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headerTitle` | `string` | - | Custom title text for the modal header |
| `headerStyle` | `ViewStyle` | - | Style for the header container |
| `headerTitleStyle` | `TextStyle` | - | Style for the header title text |
| `showCloseButton` | `boolean` | `true` | Whether to show the close button |
| `closeButtonStyle` | `ViewStyle` | - | Style for the close button |
| `closeButtonTextStyle` | `TextStyle` | - | Style for close button text |
| `closeButtonText` | `string` | - | Text for close button (e.g., "Done") |
| `closeButtonIcon` | `ReactNode` | - | Custom close button icon |
| `showHandle` | `boolean` | `false` | Show drag handle for bottom sheet |
| `handleStyle` | `ViewStyle` | - | Style for the drag handle |
| `closeIconSize` | `number` | `24` | Size of the close icon |
| `renderHeader` | `(onClose: () => void) => ReactNode` | - | Custom header render function |

### Search Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showSearchInput` | `boolean` | `true` | Whether to show the search input |
| `searchPlaceholder` | `string` | - | Placeholder text for search input |
| `searchInputContainerStyle` | `ViewStyle` | - | Style for search input container |
| `searchInputStyle` | `TextStyle` | - | Style for the search input |
| `searchInputProps` | `TextInputProps` | - | Additional TextInput props |

### Country List Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `listStyle` | `ViewStyle` | - | Style for the FlatList |
| `listContentContainerStyle` | `ViewStyle` | - | Content container style for FlatList |
| `flatListProps` | `FlatListProps<Country>` | - | Additional FlatList props |
| `showSeparator` | `boolean` | `true` | Show separators between items |
| `separatorColor` | `string` | - | Color for the separator |
| `renderEmptyList` | `() => ReactNode` | - | Custom empty list component |
| `emptyListText` | `string` | - | Text when list is empty |
| `emptyListStyle` | `ViewStyle` | - | Style for empty list container |
| `emptyListTextStyle` | `TextStyle` | - | Style for empty list text |

### Country Item Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showCallingCode` | `boolean` | `true` | Show calling code in country item |
| `showFlag` | `boolean` | `true` | Show flag in country item |
| `showRadioButton` | `boolean` | `true` | Show radio button |
| `countryItemStyle` | `ViewStyle` | - | Style for country item container |
| `countryNameStyle` | `TextStyle` | - | Style for country name text |
| `countryFlagStyle` | `ImageStyle` | - | Style for flag in list item |
| `radioButtonSize` | `number` | - | Size of the radio button |
| `radioButtonColor` | `string` | - | Color when selected |
| `radioButtonBorderColor` | `string` | - | Border color of radio button |
| `renderCountryItem` | `(props) => ReactNode` | - | Custom render for country item |

## Types

### Country

```typescript
interface Country {
  code: string;           // ISO country code (e.g., "US")
  name: string;           // Country name (localized)
  callingCode: string;    // International calling code (e.g., "+1")
  flag: string;           // Base64 encoded flag image
  currency: string;       // Currency code (e.g., "USD")
  region: string;         // Geographic region (e.g., "Americas")
}
```

### CountryPickerTheme

```typescript
interface CountryPickerTheme {
  primaryColor?: string;
  backgroundColor?: string;
  secondaryBackgroundColor?: string;
  overlayColor?: string;
  textColor?: string;
  secondaryTextColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  separatorColor?: string;
}
```

## Exports

The library exports the following:

### Components
- `CountryPicker` - Main picker component
- `SearchInput` - Search input component
- `RadioButton` - Radio button component
- `ModalHeader` - Modal header component
- `CountryItem` - Country list item component
- `Separator` - List separator component

### HOCs & Hooks
- `withOrientation` - HOC for orientation-aware components
- `useOrientation` - Hook for current orientation
- `useSafeAreaDimensions` - Hook for safe area dimensions
- `OrientationWrapper` - Wrapper component for orientation context

### Icons (SVG Components)
- `ArrowDownIcon` - Dropdown arrow icon component
- `CloseIcon` - Close/X icon component
- `SearchIcon` - Search/magnifying glass icon component

Each icon accepts the following props:
- `size?: number` - Icon size (default: 24)
- `color?: string` - Icon color (defaults to theme color)

## License

MIT
