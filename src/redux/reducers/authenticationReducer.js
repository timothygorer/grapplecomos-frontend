import * as actionTypes from '../types/authenticationTypes';

const initialState = {
  user: null,
  isRevenueCatPremium: false,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.SET_USER_NAME:
      return {
        ...state,
        user: {...state.user, username: action.payload},
      };
    case actionTypes.SET_IS_REVENUECAT_PREMIUM:
      return {
        ...state,
        isRevenueCatPremium: action.payload.isRevenueCatPremium,
      };
    case actionTypes.SET_USER_NOTIFICATION_PREFERENCES:
      return {
        ...state,
        user: {...state.user, notification_preferences: action.payload},
      };
    default:
      return state;
  }
};

export default authenticationReducer;
