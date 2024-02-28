import React, {Component, useEffect, useReducer, useRef, useState} from 'react';
import {LogBox, StyleSheet, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {OurDarkTheme, OurDefaultTheme} from './src/shared/styles/theme';
import {OnboardingStack} from './src/navigation/onboarding';
// import {
//   appsFlyerDeepLinkListener,
//   DLListener,
//   initializeAppsflyerSdk,
//   linking,
//   onAppOpenAttributionCanceller,
//   onDeepLinkCanceller,
//   onInstallConversionDataCanceller,
// } from './src/services/appsflyer/appsflyer';
// import AnimatedLoader from 'react-native-animated-loader';
// import {initializeSentry} from './src/services/monitoring/sentry';
// import {initializeOneSignal} from './src/services/push/push';
import {TabNavigator} from './src/navigation/tabnavigator';
import {useSelector} from 'react-redux';
// import messaging from '@react-native-firebase/messaging';
import {
  getCompletedOnboardingAsyncStorage,
  setCompletedOnboardingAsyncStorage,
} from './src/shared/utils/helpers';
import DataProvider, {useData} from './src/shared/utils/DataContext';
import AuthProvider, {useAuth, withAuth} from './src/shared/utils/AuthContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PersistGate} from 'redux-persist/integration/react';
// import {initializeApp} from 'firebase/app';
import Constants, {ExecutionEnvironment} from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {Chat, OverlayProvider} from 'stream-chat-expo';
import {StreamChat} from 'stream-chat';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider, observer} from 'mobx-react';
import {StoresProvider} from './src/common/hooks/use-stores';
import {getStores} from './AppStores';
import {QueryProvider} from './src/services';
import NavigationService, {
  navigationRef,
} from './src/navigation/NavigationService';
import {StreamApp} from 'expo-activity-feed';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ThemedStyles from './src/styles/ThemedStyles';
import {Provider as ReduxProvider} from 'react-redux';
import {store as redux_store} from './src/redux/store';
import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from 'expo-av';
import mobileAds from 'react-native-google-mobile-ads';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ErrorBoundary from './src/common/components/ErrorBoundary';
// import {check, request, PERMISSIONS, RESULTS} from 'expo-permissions';

const API_KEY = 'gqp7auuzq5b3';
// const client = StreamChat.getInstance(API_KEY);

LogBox.ignoreLogs([
  'Require cycle:',
  'Non-serializable values were found in the navigation state',
  'source.uri should not be an empty string',
  'Failed prop type: Invalid prop',
  'Possible Unhandled Promise Rejection',
  'LinearGradient colors and locations props should be arrays of the same length',
  'Could not find',
  'Sending',
  'Each child',
  'ImmutableState',
  '[AppLovinSdk]',
  'Some error occurred',
  'Mismatch between',
  'new Native',
  'Encountered two',
]);

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
console.log(
  'Constants.executionEnvironment is ',
  Constants.executionEnvironment,
);
let analytics, messaging;
if (!isExpoGo) {
  console.log('! expo go.');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  analytics = require('@react-native-firebase/analytics').default;
  messaging = require('@react-native-firebase/messaging').default;
}

type Props = {};

@observer
class App extends Component<Props> {
  // const initializeAppLovin = () => {
  //   console.log('APPLOVIN.');
  //   if (Platform.OS === 'ios' && parseFloat(Platform.Version) >= 14.5) {
  //     // Enable the iOS consent flow programmatically - NSUserTrackingUsageDescription must be added to the Info.plist
  //     AppLovinMAX.setConsentFlowEnabled(true);
  //     AppLovinMAX.setPrivacyPolicyUrl('https://linedaddy.com/privacy/'); // mandatory
  //     AppLovinMAX.setTermsOfServiceUrl('https://linedaddy.com/terms/'); // optional
  //   }
  //
  //   const KEY =
  //     'h37RRZuxkfl7hnc3xMKAiTv1LmV6HztpxUtkeyk10a_pt4sm-HRGW0acNfpmEfz4VgF5yDO7R7ufN1D_VuEI1z';
  //   AppLovinMAX.setVerboseLogging(true);
  //
  //   AppLovinMAX.initialize(KEY)
  //     .then(configuration => {
  //       // Attach ad listeners for interstitial ads, rewarded ads, and banner ads
  //       attachAdListeners();
  //       AppLovinMAX.showMediationDebugger();
  //     })
  //     .catch(error => {
  //       console.log('AppLovinMAX Error occurred: ', error);
  //     });
  // };

  // const attachAdListeners = () => {
  //   // Native Ad Listeners
  //   AppLovinMAX.addEventListener('OnNativeAdLoadedEvent', adInfo => {
  //     console.log('Native ad loaded from: ' + adInfo.networkName);
  //   });
  //   AppLovinMAX.addEventListener('OnNativeAdLoadFailedEvent', errorInfo => {
  //     console.log(
  //       'Native ad failed to load with error code ' +
  //         errorInfo.code +
  //         ' and message: ' +
  //         errorInfo.message,
  //     );
  //   });
  //   AppLovinMAX.addEventListener('OnNativeAdClickedEvent', adInfo => {
  //     console.log('Native ad clicked');
  //   });
  //   AppLovinMAX.addEventListener('OnNativeAdRevenuePaid', adInfo => {
  //     console.log('Native ad revenue paid: ' + adInfo.revenue);
  //   });
  // };

  // useEffect(() => {
  //   // set global audio settings for the app
  //   Audio.setAudioModeAsync({
  //     playsInSilentModeIOS: true,
  //     interruptionModeIOS: InterruptionModeIOS.DoNotMix,
  //     shouldDuckAndroid: false,
  //     interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  //     staysActiveInBackground: true,
  //   });
  //
  //   mobileAds()
  //     .initialize()
  //     .then(adapterStatuses => {
  //       // Initialization complete!
  //       console.log('Initialized admob.');
  //     });
  // }, []);

  render() {
    const stores = getStores();

    return (
      <StreamApp
        apiKey={'gqp7auuzq5b3'}
        token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.wQ_asT1i14aQa-v6WXhcNLpGYIoTNbJGekio4B8LAaQ"
        appId="1266985
">
        <GestureHandlerRootView style={appContainerStyle}>
          <SafeAreaProvider>
            <DataProvider>
              <AuthProvider>
                <QueryProvider>
                  <StoresProvider>
                    <ReduxProvider store={redux_store}>
                      <Provider key="app" {...stores}>
                        <NavigationContainer
                          // linking={linking}
                          ref={navigationRef}>
                          <BottomSheetModalProvider>
                            <ErrorBoundary
                              message="An error occurred"
                              containerStyle={ThemedStyles.style.centered}>
                              <TabNavigator
                                spinnerActive={false}
                                setSpinnerActive={() => {}}
                              />
                            </ErrorBoundary>
                          </BottomSheetModalProvider>
                        </NavigationContainer>
                      </Provider>
                    </ReduxProvider>
                  </StoresProvider>
                </QueryProvider>
              </AuthProvider>
            </DataProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </StreamApp>
    );
  }
}

export default App;

const appContainerStyle = ThemedStyles.combine(
  'flexContainer',
  'bgPrimaryBackground',
);
