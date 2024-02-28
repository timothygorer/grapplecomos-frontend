import * as actionTypes from '../types/settingsTypes';

export const setDarkModeSwitchEnabled = payload => {
  return {
    type: actionTypes.SET_DARK_MODE_SWITCH_ENABLED,
    payload,
  };
};

export const setDarkMode = payload => {
  return {
    type: actionTypes.SET_DARK_MODE,
    payload,
  };
};

export const setManualOrAutomatic = payload => {
  return {
    type: actionTypes.SET_MANUAL_OR_AUTOMATIC,
    payload,
  };
};
