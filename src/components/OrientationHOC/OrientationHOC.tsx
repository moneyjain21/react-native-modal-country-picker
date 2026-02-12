import React, { useState, useEffect, ComponentType } from 'react';
import { Dimensions, ScaledSize, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets, EdgeInsets } from 'react-native-safe-area-context';

import { OrientationType, OrientationData, WithOrientationProps, OrientationHOCOptions } from './types';

/**
 * Gets the current screen dimensions
 */
const getScreenDimensions = (): { width: number; height: number } => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

/**
 * Determines the orientation based on screen dimensions
 */
const getOrientation = (width: number, height: number): OrientationType => {
  return width > height ? 'landscape' : 'portrait';
};

/**
 * Creates orientation data object from screen dimensions
 */
const createOrientationData = (width: number, height: number): OrientationData => {
  const orientation = getOrientation(width, height);
  return {
    orientation,
    screenWidth: width,
    screenHeight: height,
    isLandscape: orientation === 'landscape',
    isPortrait: orientation === 'portrait',
  };
};

/**
 * Custom hook to track orientation changes
 */
export const useOrientation = (): OrientationData => {
  const { width, height } = getScreenDimensions();
  const [orientationData, setOrientationData] = useState<OrientationData>(
    createOrientationData(width, height)
  );

  useEffect(() => {
    const handleDimensionChange = ({ window }: { window: ScaledSize }) => {
      const newOrientationData = createOrientationData(window.width, window.height);
      setOrientationData(newOrientationData);
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  return orientationData;
};

/**
 * Custom hook to get safe area aware dimensions
 * Returns dimensions that account for safe area insets in both orientations
 */
export const useSafeAreaDimensions = () => {
  const orientationData = useOrientation();
  const insets = useSafeAreaInsets();

  const safeWidth = orientationData.screenWidth - insets.left - insets.right;
  const safeHeight = orientationData.screenHeight - insets.top - insets.bottom;

  return {
    ...orientationData,
    insets,
    safeWidth,
    safeHeight,
  };
};

/**
 * Higher Order Component that provides orientation-aware props and safe area support
 * 
 * @param WrappedComponent - The component to wrap with orientation support
 * @param options - Configuration options for the HOC
 * @returns A new component with orientation props injected
 * 
 * @example
 * ```tsx
 * const OrientationAwareComponent = withOrientation(MyComponent);
 * // MyComponent will receive orientationData prop
 * ```
 */
export function withOrientation<P extends object>(
  WrappedComponent: ComponentType<P & WithOrientationProps>,
  options: OrientationHOCOptions = {}
): ComponentType<Omit<P, keyof WithOrientationProps>> {
  const { forceRerender = true } = options;

  const WithOrientationComponent: React.FC<Omit<P, keyof WithOrientationProps>> = (props) => {
    const orientationData = useOrientation();
    const insets = useSafeAreaInsets();

    // Create a key that changes when orientation changes to force re-render if needed
    const orientationKey = forceRerender ? orientationData.orientation : 'static';

    return (
      <View 
        key={orientationKey}
        style={[
          styles.container,
          {
            // Apply safe area padding for landscape mode
            paddingLeft: orientationData.isLandscape ? insets.left : 0,
            paddingRight: orientationData.isLandscape ? insets.right : 0,
          },
        ]}
      >
        <WrappedComponent
          {...(props as P)}
          orientationData={orientationData}
        />
      </View>
    );
  };

  // Set display name for debugging
  const wrappedDisplayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithOrientationComponent.displayName = `withOrientation(${wrappedDisplayName})`;

  return WithOrientationComponent;
}

/**
 * Wrapper component that provides orientation context to children
 * Use this when you need orientation data in child components without using the HOC
 */
export const OrientationWrapper: React.FC<{
  children: (orientationData: OrientationData, insets: EdgeInsets) => React.ReactNode;
}> = ({ children }) => {
  const orientationData = useOrientation();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingLeft: orientationData.isLandscape ? insets.left : 0,
          paddingRight: orientationData.isLandscape ? insets.right : 0,
        },
      ]}
    >
      {children(orientationData, insets)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withOrientation;
