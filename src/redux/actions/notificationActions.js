import * as actionTypes from '../types/notificationTypes';

export const apiRequest = payload => {
  return {
    type: actionTypes.API_REQUEST_NOTIFICATIONS,
    payload,
  };
};

export const apiSuccess = payload => {
  return {
    type: actionTypes.API_SUCCESS_NOTIFICATIONS,
    payload,
  };
};

export const apiListEnd = payload => {
  return {
    type: actionTypes.API_LIST_END_NOTIFICATIONS,
    payload,
  };
};

export const restoreDefault = () => {
  return {
    type: actionTypes.RESTORE_DEFAULT_NOTIFICATIONS,
  };
};
