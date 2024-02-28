import * as actionTypes from '../types/notificationTypes';

const initialState = {
  data: [],
  error: null,
  isListEnd: false,
  loading: false,
  moreLoading: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.API_REQUEST_NOTIFICATIONS:
      if (action.payload.start === 0) {
        return {
          ...state,
          loading: true,
        };
      } else {
        return {
          ...state,
          moreLoading: true,
        };
      }
    case actionTypes.API_SUCCESS_NOTIFICATIONS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        loading: false,
        moreLoading: false,
      };
    case actionTypes.API_LIST_END_NOTIFICATIONS:
      return {
        ...state,
        isListEnd: action.payload,
        loading: false,
        moreLoading: false,
      };
    case actionTypes.RESTORE_DEFAULT_NOTIFICATIONS:
      return {
        ...state,
        data: [],
        isListEnd: false,
        loading: false,
        moreLoading: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;
