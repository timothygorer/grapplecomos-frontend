import * as actionTypes from '../types/authenticationTypes';

export const signUserIn = payload => {
  return {
    type: actionTypes.USER_LOGGED_IN,
    payload,
  };
};

export const signUserOut = payload => {
  return {
    type: actionTypes.USER_LOGGED_OUT,
    payload,
  };
};

export const updateUser = payload => {
  return {
    type: actionTypes.UPDATE_USER,
    payload,
  };
};

export const setUsername = payload => {
  return {
    type: actionTypes.SET_USER_NAME,
    payload,
  };
};

export const setBettorId = payload => {
  return {
    type: actionTypes.SET_BETTOR_ID,
    payload,
  };
};

export const loadBettorAccounts = payload => {
  return {
    type: actionTypes.LOAD_BETTOR_ACCOUNTS,
    payload,
  };
};

export const setIsRevenueCatPremium = payload => {
  return {
    type: actionTypes.SET_IS_REVENUECAT_PREMIUM,
    payload,
  };
};

export const setUserNotificationPreferences = payload => {
  return {
    type: actionTypes.SET_USER_NOTIFICATION_PREFERENCES,
    payload,
  };
};
