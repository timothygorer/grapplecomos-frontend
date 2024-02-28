import * as actionTypes from '../types/offersDataTypes';

const initialState = {
  data: {
    markets: {},
  },
  error: {
    markets: {},
  },
  isListEnd: {
    markets: {},
  },
  loading: {
    markets: {},
  },
  moreLoading: {
    markets: {},
  },
};

const offersDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.API_REQUEST_OFFERS_DATA:
      if (action.payload.dataKey === 'Markets') {
        if ('marketName' in action.payload) {
          if (action.payload.start === 0) {
            return {
              ...state,
              loading: {
                ...state.loading,
                markets: {
                  ...state.loading.markets,
                  [action.payload.marketName]: true,
                },
              },
            };
          } else {
            return {
              ...state,
              moreLoading: {
                ...state.moreLoading,
                markets: {
                  ...state.moreLoading.markets,
                  [action.payload.marketName]: true,
                },
              },
            };
          }
        } else {
          // start will always be 0 and end will always be 9 when loading the initial page for every market tab
          // therefore we don't need to check if start is 0 like we do above when we are loading another page.
          return {
            ...state,
            loading: {
              ...state.loading,
              markets: {},
            },
            moreLoading: {
              ...state.moreLoading,
              markets: {},
            },
          };
        }
      }
    case actionTypes.API_SUCCESS_OFFERS_DATA:
      if ('marketName' in action.payload) {
        // load another page for a specific market
        return {
          ...state,
          data: {
            ...state.data,
            markets: {
              ...state.data.markets,
              [action.payload.marketName]:
                action.payload.marketName in state.data.markets
                  ? [
                      ...state.data.markets[action.payload.marketName],
                      ...action.payload.data,
                    ]
                  : [...action.payload.data],
            },
          },
          loading: {
            ...state.loading,
            markets: {
              ...state.loading.markets,
              [action.payload.marketName]: false,
            },
          },
          moreLoading: {
            ...state.moreLoading,
            markets: {
              ...state.moreLoading.markets,
              [action.payload.marketName]: false,
            },
          },
        };
      } else {
        let loading = {},
          moreLoading = {};
        for (const [marketName, marketOffers] of Object.entries(
          action.payload.markets,
        )) {
          loading[marketName] = false;
          moreLoading[marketName] = false;
        }

        // load first page for every market tab
        return {
          ...state,
          data: {
            ...state.data,
            markets: {
              ...action.payload.markets,
            },
          },
          loading: {...state.loading, markets: loading},
          moreLoading: {...state.moreLoading, markets: moreLoading},
        };
      }
    case actionTypes.API_LIST_END_OFFERS_DATA:
      if (action.payload.dataKey === 'Markets') {
        return {
          ...state,
          isListEnd: {
            ...state.isListEnd,
            markets: {
              ...state.isListEnd.markets,
              [action.payload.marketName]: action.payload.isListEnd,
            },
          },
          loading: {
            ...state.loading,
            markets: {
              ...state.loading.markets,
              [action.payload.marketName]: false,
            },
          },
          moreLoading: {
            ...state.moreLoading,
            markets: {
              ...state.moreLoading.markets,
              [action.payload.marketName]: false,
            },
          },
        };
      }
    case actionTypes.RESTORE_DEFAULT_OFFERS_DATA:
      if (action.payload.dataKey === 'Markets') {
        return {
          ...state,
          data: {...state.data, markets: {}},
          isListEnd: {...state.isListEnd, markets: {}},
          loading: {...state.loading, markets: {}},
          moreLoading: {...state.moreLoading, markets: {}},
        };
      }
    case actionTypes.REALTIME_INSERT_OFFERS_DATA:
      if (action.payload.dataKey === 'Markets') {
        return {
          ...state,
          data: {
            ...state.data,
            markets: {
              ...state.data.markets,
              [action.payload.marketName]: [
                ...state.data.markets[action.payload.marketName],
                action.payload.new,
              ],
            },
          },
        };
      }
    case actionTypes.REALTIME_UPDATE_OFFERS_DATA:
      if (action.payload.dataKey === 'Markets') {
        return {
          ...state,
          data: {
            ...state.data,
            markets: {
              ...state.data.markets,
              [action.payload.marketName]: state.data.markets[
                action.payload.marketName
              ].map(offer =>
                offer.id === action.payload.new.id
                  ? {...action.payload.new}
                  : offer,
              ),
            },
          },
        };
      }
    default:
      return state;
  }
};

export default offersDataReducer;
