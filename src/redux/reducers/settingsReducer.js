import * as actionTypes from '../types/settingsTypes';

const initialState = {
  darkModeSwitchEnabled: true,
  darkMode: false,
  isAutomatic: true,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DARK_MODE_SWITCH_ENABLED:
      return {
        ...state,
        darkModeSwitchEnabled: action.payload.darkModeSwitchEnabled,
      };
    case actionTypes.SET_DARK_MODE:
      return {...state, darkMode: action.payload.darkMode};
    case actionTypes.SET_MANUAL_OR_AUTOMATIC:
      return {...state, isAutomatic: action.payload.isAutomatic};
    default:
      return state;
  }
};

export default settingsReducer;
