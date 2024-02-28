import * as actionTypes from '../types/homeDataTypes';

export const apiRequest = payload => {
  return {
    type: actionTypes.API_REQUEST_HOME,
    payload,
  };
};

export const apiSuccess = payload => {
  return {
    type: actionTypes.API_SUCCESS_HOME,
    payload,
  };
};

export const apiListEnd = payload => {
  return {
    type: actionTypes.API_LIST_END_HOME,
    payload,
  };
};

export const restoreDefault = payload => {
  return {
    type: actionTypes.RESTORE_DEFAULT_HOME,
    payload,
  };
};

export const restoreDefaultSingleTab = payload => {
  return {
    type: actionTypes.RESTORE_DEFAULT_HOME_SINGLE_TAB,
    payload,
  };
};

export const updateHome = payload => {
  return {
    type: actionTypes.UPDATE_HOME,
    payload,
  };
};

export const updateBets = payload => {
  return {
    type: actionTypes.UPDATE_BETS,
    payload,
  };
};

export const batchUpdateHome = payload => {
  return {
    type: actionTypes.BATCH_UPDATE_HOME,
    payload,
  };
};

export const saveClosedAppTimestamp = payload => {
  return {
    type: actionTypes.SAVE_CLOSED_APP_TIMESTAMP,
    payload,
  };
};

export const setAlreadyConfiguredRevenueCat = payload => {
  return {
    type: actionTypes.SET_ALREADY_CONFIGURED_REVENUECAT,
    payload,
  };
};
