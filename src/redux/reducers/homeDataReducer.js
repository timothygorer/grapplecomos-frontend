import * as actionTypes from '../types/homeDataTypes';
import {propsAreEqual} from '../../shared/utils/';

const initialState = {
  closed_timestamp: null,
  alreadyConfiguredRevenueCat: false,
  data: {
    events: [],
    markets: {},
    notifications: [],
    bets: {},
    search_results: [],
  },
  error: {
    events: null,
    markets: {},
    notifications: null,
    bets: {},
    search_results: null,
  },
  isListEnd: {
    events: false,
    markets: {},
    notifications: false,
    bets: {},
    search_results: false,
  },
  loading: {
    events: false,
    markets: {},
    notifications: false,
    bets: {},
    search_results: false,
  },
  moreLoading: {
    events: false,
    markets: {},
    notifications: false,
    bets: {},
    search_results: false,
  },
};

const homeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.API_REQUEST_HOME:
      if (action.payload.dataKey === 'Events') {
        if (action.payload.start === 0) {
          return {
            ...state,
            loading: {...state.loading, events: true},
          };
        } else {
          return {
            ...state,
            moreLoading: {...state.moreLoading, events: true},
          };
        }
      } else if (action.payload.dataKey === 'Search') {
        if (action.payload.start === 0) {
          return {
            ...state,
            loading: {...state.loading, search_results: true},
          };
        } else {
          return {
            ...state,
            moreLoading: {...state.moreLoading, search_results: true},
          };
        }
      } else if (action.payload.dataKey === 'Markets') {
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
      } else if (action.payload.dataKey === 'Bets') {
        if ('betKey' in action.payload) {
          if (action.payload.start === 0) {
            return {
              ...state,
              loading: {
                ...state.loading,
                bets: {
                  ...state.loading.bets,
                  [action.payload.betKey]: true,
                },
              },
            };
          } else {
            return {
              ...state,
              moreLoading: {
                ...state.moreLoading,
                bets: {
                  ...state.moreLoading.bets,
                  [action.payload.betKey]: true,
                },
              },
            };
          }
        } else {
          // start will always be 0 and end will always be 9 when loading the initial page for every bet tab
          // therefore we don't need to check if start is 0 like we do above when we are loading another page.
          return {
            ...state,
            loading: {
              ...state.loading,
              bets: {},
            },
            moreLoading: {
              ...state.moreLoading,
              bets: {},
            },
          };
        }
      }
    case actionTypes.API_SUCCESS_HOME:
      if (action.payload.dataKey === 'Events') {
        return {
          ...state,
          data: {
            ...state.data,
            events: [...state.data.events, ...action.payload.data],
          },
          loading: {...state.loading, events: false},
          moreLoading: {...state.moreLoading, events: false},
        };
      } else if (action.payload.dataKey === 'Search') {
        return {
          ...state,
          data: {
            ...state.data,
            search_results: [
              ...state.data.search_results,
              ...action.payload.data,
            ],
          },
          loading: {...state.loading, search_results: false},
          moreLoading: {...state.moreLoading, search_results: false},
        };
      } else if (action.payload.dataKey === 'Markets') {
        if ('marketName' in action.payload) {
          // load another page for a specific market tab
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
      } else if (action.payload.dataKey === 'Bets') {
        if ('betKey' in action.payload) {
          // load another page for a specific bet tab
          return {
            ...state,
            data: {
              ...state.data,
              bets: {
                ...state.data.bets,
                [action.payload.betKey]:
                  action.payload.betKey in state.data.bets
                    ? [
                        ...state.data.bets[action.payload.betKey],
                        ...action.payload.data,
                      ]
                    : [...action.payload.data],
              },
            },
            loading: {...state.loading, bets: false},
            moreLoading: {...state.moreLoading, bets: false},
          };
        } else {
          // load first page for every bet tab
          let loading = {},
            moreLoading = {};
          for (const [betKey, betKeys] of Object.entries(action.payload.bets)) {
            loading[betKey] = false;
            moreLoading[betKey] = false;
          }

          // load first page for every bet tab
          return {
            ...state,
            data: {
              ...state.data,
              bets: {
                ...action.payload.bets,
              },
            },
            loading: {...state.loading, bets: loading},
            moreLoading: {...state.moreLoading, bets: moreLoading},
          };
        }
      }
    case actionTypes.API_LIST_END_HOME:
      if (action.payload.dataKey === 'Events') {
        return {
          ...state,
          isListEnd: {...state.isListEnd, events: action.payload.isListEnd},
          loading: {...state.loading, events: false},
          moreLoading: {...state.moreLoading, events: false},
        };
      } else if (action.payload.dataKey === 'Search') {
        return {
          ...state,
          isListEnd: {
            ...state.isListEnd,
            search_results: action.payload.isListEnd,
          },
          loading: {...state.loading, search_results: false},
          moreLoading: {...state.moreLoading, search_results: false},
        };
      } else if (action.payload.dataKey === 'Markets') {
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
      } else if (action.payload.dataKey === 'Bets') {
        return {
          ...state,
          isListEnd: {
            ...state.isListEnd,
            bets: {
              ...state.isListEnd.bets,
              [action.payload.betKey]: action.payload.isListEnd,
            },
          },
          loading: {
            ...state.loading,
            bets: {
              ...state.loading.bets,
              [action.payload.betKey]: false,
            },
          },
          moreLoading: {
            ...state.moreLoading,
            bets: {
              ...state.moreLoading.bets,
              [action.payload.betKey]: false,
            },
          },
        };
      }
    case actionTypes.RESTORE_DEFAULT_HOME:
      if (action.payload.dataKey === 'Events') {
        return {
          ...state,
          data: {...state.data, events: []},
          isListEnd: {...state.isListEnd, events: false},
          loading: {...state.loading, events: false},
          moreLoading: {...state.moreLoading, events: false},
        };
      } else if (action.payload.dataKey === 'Search') {
        return {
          ...state,
          data: {...state.data, search_results: []},
          isListEnd: {...state.isListEnd, search_results: false},
          loading: {...state.loading, search_results: false},
          moreLoading: {...state.moreLoading, search_results: false},
        };
      } else if (action.payload.dataKey === 'Markets') {
        return {
          ...state,
          data: {...state.data, markets: {}},
          isListEnd: {...state.isListEnd, markets: {}},
          loading: {...state.loading, markets: {}},
          moreLoading: {...state.moreLoading, markets: {}},
        };
      } else if (action.payload.dataKey === 'Bets') {
        return {
          ...state,
          data: {...state.data, bets: {}},
          isListEnd: {...state.isListEnd, bets: {}},
          loading: {...state.loading, bets: {}},
          moreLoading: {...state.moreLoading, bets: {}},
        };
      }
    case actionTypes.RESTORE_DEFAULT_HOME_SINGLE_TAB:
      if (action.payload.dataKey === 'Events') {
        return {
          ...state,
          data: {...state.data, events: []},
          isListEnd: {...state.isListEnd, events: false},
          loading: {...state.loading, events: false},
          moreLoading: {...state.moreLoading, events: false},
        };
      } else if (action.payload.dataKey === 'Markets') {
        return {
          ...state,
          data: {
            ...state.data,
            markets: {
              ...state.data.markets,
              [action.payload.marketName]: [],
            },
          },
          isListEnd: {
            ...state.isListEnd,
            markets: {
              ...state.isListEnd.markets,
              [action.payload.marketName]: false,
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
    case actionTypes.UPDATE_HOME:
      if (action.payload.dataKey === 'Events') {
        return {
          ...state,
          data: {
            ...state.data,
            events: state.data.events.map(event =>
              event.id === action.payload.new.id
                ? {...action.payload.new}
                : event,
            ),
          },
        };
      } else if (action.payload.dataKey === 'Markets') {
        return {
          ...state,
          data: {
            ...state.data,
            markets: {
              ...state.data.markets,
              [action.payload.marketName]: state.data.markets[
                action.payload.marketName
              ].map(market =>
                market.id === action.payload.new.id
                  ? {...action.payload.new}
                  : market,
              ),
            },
          },
        };
      }
    case actionTypes.UPDATE_BETS:
      if (action.payload.dataKey === 'Bets') {
        let merged = [];

        return {
          ...state,
          data: {
            ...state.data,
            bets: {
              ...state.data.bets,
              [action.payload.betKey]: state.data.bets[
                action.payload.betKey
              ].map(bet => {
                merged.push(
                  ...bet,
                  ...action.payload.bets[action.payload.betKey].find(
                    itmInner => itmInner.id === bet.id,
                  ),
                );
              }),
            },
          },
        };
      }
    case actionTypes.BATCH_UPDATE_HOME:
      if (action.payload.dataKey === 'Events') {
        const oldEventMap = state.data.events.reduce((map, event) => {
          return map.set(event.id, event);
        }, new Map());

        const array = action.payload.data.map(newEvent => {
          const oldEvent = oldEventMap.get(newEvent.id);
          if (oldEvent) {
            return propsAreEqual(oldEvent, newEvent) ? oldEvent : newEvent;
          } else {
            return newEvent;
          }
        });

        return {
          ...state,
          data: {
            ...state.data,
            events: array,
          },
        };
      } else if (action.payload.dataKey === 'Markets') {
        return {
          ...state,
          data: {
            ...state.data,
            markets: {
              ...state.data.markets,
              [action.payload.marketName]: state.data.markets[
                action.payload.marketName
              ].map(market =>
                market.id === action.payload.new.id
                  ? {...action.payload.new}
                  : market,
              ),
            },
          },
        };
      }
    case actionTypes.SAVE_CLOSED_APP_TIMESTAMP:
      return {
        ...state,
        closed_timestamp: action.payload,
      };
    case actionTypes.SET_ALREADY_CONFIGURED_REVENUECAT:
      return {
        ...state,
        alreadyConfiguredRevenueCat: action.payload.alreadyConfiguredRevenueCat,
      };
    default:
      return state;
  }
};

export default homeDataReducer;
