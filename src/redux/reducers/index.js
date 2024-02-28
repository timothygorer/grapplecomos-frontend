import {combineReducers} from '@reduxjs/toolkit';
import search from './search';
import notificationReducer from './notificationReducer';
import profilePhotoReducer from './profilePhoto';
import offersDataReducer from './offersDataReducer';
import authenticationReducer from './authenticationReducer';
import settingsReducer from './settingsReducer';
import homeData from '../slices/homeSlice';

export default combineReducers({
    search,
    authenticationData: authenticationReducer,
    notifications: notificationReducer,
    profilePhoto: profilePhotoReducer,
    homeData: homeData,
    offersData: offersDataReducer,
    settingsData: settingsReducer,
});
