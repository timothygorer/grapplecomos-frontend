import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  closed_timestamp: null,
  alreadyConfiguredRevenueCat: false,
  data: {
    events: [],
    markets: {},
    notifications: [],
    bets: {},
    search_results: {timestamp: -Number.MAX_VALUE, results: []},
  },
  isLoading: {
    events: false,
    markets: {},
    notifications: false,
    bets: {},
    search_results: false,
  },
  isMoreLoading: {
    events: false,
    markets: {},
    notifications: false,
    bets: {},
    search_results: false,
  },
  isListEnd: {
    events: false,
    markets: {},
    notifications: false,
    bets: {},
    search_results: false,
  },
  isError: {
    events: false,
    markets: false,
    notifications: false,
    bets: false,
    search_results: false,
  },
  message: {
    events: '',
    markets: {},
    notifications: '',
    bets: {},
    search_results: '',
  },
};

function searchActionIsValid(state, action) {
  return action.payload.timestamp >= state.data.search_results.timestamp;
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    apiRequest(state, action) {
      if (action.payload.dataKey === 'Events') {
        if (action.payload.start === 0) {
          state.isLoading.events = true;
        } else {
          state.isMoreLoading.events = true;
        }
      } else if (action.payload.dataKey === 'Search') {
        if (searchActionIsValid(state, action)) {
          if (action.payload.start === 0) {
            state.isLoading.search_results = true;
          } else {
            state.isMoreLoading.search_results = true;
          }
          state.data.search_results.timestamp = action.payload.timestamp;
        }
      } else if (action.payload.dataKey === 'Markets') {
        if ('marketName' in action.payload) {
          if (action.payload.start === 0) {
            state.isLoading.markets[action.payload.marketName] = true;
          } else {
            state.isMoreLoading.markets[action.payload.marketName] = true;
          }
        } else {
          // start will always be 0 and end will always be 9 when loading the initial page for every market tab
          // therefore we don't need to check if start is 0 like we do above when we are loading another page.
          state.isLoading.markets = {};
          state.isMoreLoading.markets = {};
        }
      } else if (action.payload.dataKey === 'Bets') {
        if ('betKey' in action.payload) {
          if (action.payload.start === 0) {
            state.isLoading.bets[action.payload.betKey] = true;
          } else {
            state.isMoreLoading.bets[action.payload.betKey] = true;
          }
        } else {
          // start will always be 0 and end will always be 9 when loading the initial page for every bet tab
          // therefore we don't need to check if start is 0 like we do above when we are loading another page.
          state.isLoading.bets = {};
          state.isMoreLoading.bets = {};
        }
      }
    },
    apiSuccess(state, action) {
      if (action.payload.dataKey === 'Events') {
        state.data.events = [...state.data.events, ...action.payload.data];
        state.isLoading.events = false;
        state.isMoreLoading.events = false;
      } else if (action.payload.dataKey === 'Search') {
        if (searchActionIsValid(state, action)) {
          state.data.search_results.results = [
            ...state.data.search_results.results,
            ...action.payload.data,
          ];
          state.isLoading.search_results = false;
          state.isMoreLoading.search_results = false;
          state.data.search_results.timestamp = action.payload.timestamp;
        }
      } else if (action.payload.dataKey === 'Markets') {
        if ('marketName' in action.payload) {
          // load another page for a specific market tab
          state.data.markets[action.payload.marketName] =
            action.payload.marketName in state.data.markets
              ? [
                  ...state.data.markets[action.payload.marketName],
                  ...action.payload.data,
                ]
              : [...action.payload.data];
          state.isLoading.markets[action.payload.marketName] = false;
          state.isMoreLoading.markets[action.payload.marketName] = false;
        } else {
          let isLoading = {},
            isMoreLoading = {};
          for (const [marketName, marketOffers] of Object.entries(
            action.payload.markets,
          )) {
            isLoading[marketName] = false;
            isMoreLoading[marketName] = false;
          }

          // load first page for every market tab
          state.data.markets = action.payload.markets;
          state.isLoading.markets = isLoading;
          state.isMoreLoading.markets = isMoreLoading;
        }
      } else if (action.payload.dataKey === 'Bets') {
        if ('betKey' in action.payload) {
          // load another page for a specific bet tab
          state.data.bets[action.payload.betKey] =
            action.payload.betKey in state.data.bets
              ? [
                  ...state.data.bets[action.payload.betKey],
                  ...action.payload.data,
                ]
              : [...action.payload.data];
          state.isLoading.bets[action.payload.betKey] = false;
          state.isMoreLoading.bets[action.payload.betKey] = false;
        } else {
          // load first page for every bet tab
          let isLoading = {},
            isMoreLoading = {};
          for (const [betKey, betKeys] of Object.entries(action.payload.bets)) {
            isLoading[betKey] = false;
            isMoreLoading[betKey] = false;
          }

          // load first page for every bet tab
          state.data.bets = action.payload.bets;
          state.isLoading.bets = isLoading;
          state.isMoreLoading.bets = isMoreLoading;
        }
      }
    },
    apiListEnd(state, action) {
      if (action.payload.dataKey === 'Events') {
        state.isListEnd.events = action.payload.isListEnd;
        state.isLoading.events = false;
        state.isMoreLoading.events = false;
      } else if (action.payload.dataKey === 'Search') {
        state.isListEnd.search_results = action.payload.isListEnd;
        state.isLoading.search_results = false;
        state.isMoreLoading.search_results = false;
      } else if (action.payload.dataKey === 'Markets') {
        state.isListEnd.markets[action.payload.marketName] =
          action.payload.isListEnd;
        state.isLoading.markets[action.payload.marketName] = false;
        state.isMoreLoading.markets[action.payload.marketName] = false;
      } else if (action.payload.dataKey === 'Bets') {
        state.isListEnd.bets[action.payload.betKey] = action.payload.isListEnd;
        state.isLoading.bets[action.payload.betKey] = false;
        state.isMoreLoading.bets[action.payload.betKey] = false;
      }
    },
    restoreDefault(state, action) {
      if (action.payload.dataKey === 'Events') {
        state.data.events = [];
        state.isListEnd.events = false;
        state.isLoading.events = false;
        state.isMoreLoading.events = false;
      } else if (action.payload.dataKey === 'Search') {
        state.data.search_results.results = [];
        state.isListEnd.search_results = false;
        state.isLoading.search_results = false;
        state.isMoreLoading.search_results = false;
      } else if (action.payload.dataKey === 'Markets') {
        state.data.markets = {};
        state.isListEnd.markets = {};
        state.isLoading.markets = {};
        state.isMoreLoading.markets = {};
      } else if (action.payload.dataKey === 'Bets') {
        state.data.bets = {};
        state.isListEnd.bets = {};
        state.isLoading.bets = {};
        state.isMoreLoading.bets = {};
      }
    },
    saveClosedAppTimestamp(state, action) {
      state.closed_timestamp = action.payload;
    },
    setAlreadyConfiguredRevenueCat(state, action) {
      state.alreadyConfiguredRevenueCat = action.payload;
    },
  },
});

export const {
  apiRequest,
  apiSuccess,
  apiListEnd,
  restoreDefault,
  saveClosedAppTimestamp,
  setAlreadyConfiguredRevenueCat,
} = homeSlice.actions;
export default homeSlice.reducer;
