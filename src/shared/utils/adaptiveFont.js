import {Dimensions} from 'react-native';

export const adaptiveFont = (tabletSize, mobileSize) => {
  const MAX_TABLET_SCREEN_RESOLUTION = 1024;
  const {width: CURRENT_SCREEN_WIDTH} = Dimensions.get('window');
  const addSize = tabletSize - mobileSize;

  return (
    mobileSize +
    addSize * ((CURRENT_SCREEN_WIDTH - 320) / MAX_TABLET_SCREEN_RESOLUTION)
  );
};
