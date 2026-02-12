// Main library entry point
// Re-export all components, hooks, and types

// Components
export { default as CountryPicker } from './components/CountryPicker';
export { default as SearchInput } from './components/SearchInput';
export { default as RadioButton } from './components/RadioButton';
export { default as ModalHeader } from './components/ModalHeader';
export { default as CountryItem } from './components/CountryItem';
export { default as Separator } from './components/Separator';

// HOCs and Hooks
export {
  withOrientation,
  useOrientation,
  useSafeAreaDimensions,
  OrientationWrapper,
} from './components/OrientationHOC';

// Icons
export { ArrowDownIcon, CloseIcon, SearchIcon } from './assets';

// Utilities
export * from './utils';

// Types - Components
export type {
  Country,
  CountryName,
  CountryPickerProps,
  CountryPickerTheme,
} from './components/CountryPicker';
export type { SearchInputProps } from './components/SearchInput';
export type { RadioButtonProps } from './components/RadioButton';
export type { ModalHeaderProps } from './components/ModalHeader';
export type { CountryItemProps } from './components/CountryItem';
export type { SeparatorProps } from './components/Separator';

// Types - OrientationHOC
export type {
  OrientationType,
  OrientationData,
  WithOrientationProps,
  OrientationHOCOptions,
} from './components/OrientationHOC';

// Types - Icons
export type { ArrowDownIconProps, CloseIconProps, SearchIconProps } from './assets';
