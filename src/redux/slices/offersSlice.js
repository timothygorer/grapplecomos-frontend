import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';
import * as actionTypes from '../types/homeDataTypes';
import {propsAreEqual} from '../../shared/utils';
import {getEventsForRange} from '../../shared/utils/games';
import {restoreDefault} from './homeSlice';
import {apiListEnd, apiRequest, apiSuccess} from '../actions/offersDataActions';
import * as Promise from 'bluebird';
import {supabase} from '../../services/supabaseClient';
import {getOffersForMarketType} from '../../hooks/useGetVolumeChaptersData.js';

const initialState = {
  data: {
    markets: {},
  },
  isError: {
    markets: {},
  },
  isLoading: {
    markets: {},
  },
  isSuccess: {
    markets: {},
  },
  message: {
    markets: {},
  },
};

export const getAllMarketsData = createAsyncThunk(
  'offers/getAllMarketsData',
  async (data, thunkAPI) => {
    let markets = {};
    const tabs = data.tabs;
    const isPastEvent = data.isPastEvent;
    const eventName = data.eventName;

    try {
      if (tabs.length > 0) {
        // dispatch(apiRequest({dataKey: 'Markets'}));

        await Promise.map(
          tabs,
          async tab => {
            let table;
            let query;

            switch (tab.market_type) {
              case 'Spread':
                table = isPastEvent ? 'PastSpreadOfferings' : 'SpreadOfferings';
                break;
              case 'Moneyline':
                table = isPastEvent
                  ? 'PastMoneylineOfferings'
                  : 'MoneylineOfferings';
                break;
              case 'Total':
                table = isPastEvent ? 'PastTotalOfferings' : 'TotalOfferings';
                break;
              default:
                table = isPastEvent ? 'PastPropsOfferings' : 'PropsOfferings';
                break;
            }

            query = supabase
              .from(table)
              .select('*', {count: 'exact'})
              .eq('event_name', eventName)
              .eq('market_type', tab.market_type);

            if (table === 'SpreadOfferings') {
              query = query
                .neq('away_spread', '')
                .neq('away_payout', '')
                .neq('home_spread', '')
                .neq('home_payout', '');
            } else if (table === 'MoneylineOfferings') {
              query = query.neq('away_payout', '').neq('home_payout', '');
            } else if (table === 'TotalOfferings') {
              query = query
                .neq('line', '')
                .neq('over_payout', '')
                .neq('under_payout', '');
            } else if (table === 'PropsOfferings') {
              query = query.neq('payout_american', '');
            }

            if (tab.market_subtype === 'Pregame|Live') {
              query = query.or(
                'market_subtype.eq.Pregame,market_subtype.eq.Live',
              );
            } else {
              query = query.eq('market_subtype', tab.market_subtype);
            }

            const {data: offersData, error} = await query.range(0, 9);

            if (error) {
              throw error;
            }

            markets[tab.title] = offersData;
          },
          {concurrency: 50}, // fixme tgorer not sure what this number should be.
        );

        // dispatch(apiSuccess({markets: markets, dataKey: 'Markets'}));
      }
    } catch (e) {
      console.error('Some error occurred in getAllMarketsData: ', e);
    }
    return markets;
  },
);

export const getMarketTabData = createAsyncThunk(
  'offers/getMarketTabData',
  async (data, thunkAPI) => {
    // dispatch(
    //   apiRequest({
    //     start,
    //     end,
    //     dataKey: 'Markets',
    //     marketName: tabTitle,
    //   }),
    // );

    const start = data.start;
    const end = data.end;
    const marketName = data.marketName;
    const marketType = data.marketType;
    const marketSubtype = data.marketSubtype;
    const eventName = data.eventName;
    console.log(start, end, marketType, marketSubtype, eventName);

    const markets = await getOffersForMarketType(
      start,
      end,
      marketType,
      marketSubtype,
      eventName,
    );

    if (markets.data.length === 0 || markets.data.length < 10) {
      // dispatch(
      //   apiListEnd({
      //     isListEnd: true,
      //     dataKey: 'Markets',
      //     marketName: tabTitle,
      //   }),
      // );
    }

    // dispatch(
    //   apiSuccess({
    //     ...markets,
    //     dataKey: 'Markets',
    //     marketName: tabTitle,
    //   }),
    // );

    return markets;
  },
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    batchUpdateOffers(state, action) {
      const oldOffersMap = state.data.markets[action.payload.marketName].reduce(
        (map, offer) => {
          return map.set(offer.id, offer);
        },
        new Map(),
      );

      const array = action.payload.markets[action.payload.marketName].map(
        newEvent => {
          const oldEvent = oldOffersMap.get(newEvent.id);
          if (oldEvent) {
            return propsAreEqual(oldEvent, newEvent) ? oldEvent : newEvent;
          } else {
            return newEvent;
          }
        },
      );

      state.data.markets[action.payload.marketName] = array;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(getAllMarketsData.pending, state => {
        state.isLoading.markets = true;
      })
      .addCase(getAllMarketsData.fulfilled, (state, action) => {
        console.log('COMPLETE.');
        state.isLoading.markets = false;
        state.isSuccess.markets = true;
        state.data.markets = {...action.payload};
      })
      .addCase(getAllMarketsData.rejected, (state, action) => {})
      .addCase(getMarketTabData.pending, state => {
        state.isLoading.markets = true;
      })
      .addCase(getMarketTabData.fulfilled, (state, action) => {
        if ('marketName' in action.meta.arg) {
          if (action.meta.arg.marketName in state.data.markets) {
            state.data.markets[action.meta.arg.marketName] = [
              ...state.data.markets[action.meta.arg.marketName],
              ...action.payload.data,
            ];
          } else {
            state.data.markets[action.meta.arg.marketName] =
              action.payload.data;
          }
          state.isLoading.markets[action.meta.arg.marketName] = false;
          state.isSuccess.markets[action.meta.arg.marketName] = true;
        } else {
          let isLoading = {},
            isSuccess = {};
          for (const [marketName, marketOffers] of Object.entries(
            action.payload,
          )) {
            isLoading[marketName] = false;
            isSuccess[marketName] = true;
            console.log('HI w/marketName ', marketName);
          }
          console.log('REACHED RIGHT?');

          // load first page for every market tab
          state.isLoading.markets = isLoading;
          state.isSuccess.markets = isSuccess;
        }
      })
      .addCase(getMarketTabData.rejected, (state, action) => {});
  },
});

export const {batchUpdateHome} = offersSlice.actions;
export default offersSlice.reducer;
