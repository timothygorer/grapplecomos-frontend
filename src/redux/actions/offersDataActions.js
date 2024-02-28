import * as actionTypes from '../types/offersDataTypes';

export const apiRequest = payload => {
  return {
    type: actionTypes.API_REQUEST_OFFERS_DATA,
    payload,
  };
};

export const apiSuccess = payload => {
  return {
    type: actionTypes.API_SUCCESS_OFFERS_DATA,
    payload,
  };
};

export const apiListEnd = payload => {
  return {
    type: actionTypes.API_LIST_END_OFFERS_DATA,
    payload,
  };
};

export const restoreDefault = payload => {
  return {
    type: actionTypes.RESTORE_DEFAULT_OFFERS_DATA,
    payload,
  };
};

export const realtimeInsert = payload => {
  return {
    type: actionTypes.REALTIME_INSERT_OFFERS_DATA,
    payload,
  };
};

export const realtimeUpdate = payload => {
  return {
    type: actionTypes.REALTIME_UPDATE_OFFERS_DATA,
    payload,
  };
};

export const saveClosedAppTimestamp = payload => {
  return {
    type: actionTypes.SAVE_CLOSED_APP_TIMESTAMP,
    payload,
  };
};
