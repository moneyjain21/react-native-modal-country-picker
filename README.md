# react-native-country-picker

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

## Installation

```bash
npm install react-native-country-picker
# or
yarn add react-native-country-picker
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react-native-safe-area-context react-native-svg
```

## Usage

### Basic Usage

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { CountryPicker, Country } from 'react-native-country-picker';

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

### Styling Props

The component offers extensive styling options for all visual elements. See the TypeScript types for full details.

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

### Icons
- `ArrowDownIcon`
- `CloseIcon`
- `SearchIcon`

## License

MIT
