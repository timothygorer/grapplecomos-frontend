import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './reducers';
import {configureStore} from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['homeData', 'offersData', 'notifications'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// persistor.purge();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
