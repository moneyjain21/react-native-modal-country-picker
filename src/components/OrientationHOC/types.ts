export type OrientationType = 'portrait' | 'landscape';

export interface OrientationData {
  orientation: OrientationType;
  screenWidth: number;
  screenHeight: number;
  isLandscape: boolean;
  isPortrait: boolean;
}

export interface WithOrientationProps {
  orientationData: OrientationData;
}

export interface OrientationHOCOptions {
  /**
   * Whether to force re-render on orientation change
   * @default true
   */
  forceRerender?: boolean;
}
