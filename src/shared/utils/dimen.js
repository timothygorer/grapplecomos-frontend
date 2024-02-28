import {Dimensions, Platform} from 'react-native';

export function isIphoneX() {
  let dimen = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height / dimen.width > 2 || dimen.height / dimen.width < 0.5)
  );
}

export function isIphone5() {
  let dimen = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    dimen.height < 570
  );
}
