import {Platform} from 'react-native';
// import Purchases, {LOG_LEVEL} from 'react-native-purchases';

export const initializeRevenueCatWithAppUserId = app_user_id => {
  (async () => {
    if (Platform.OS === 'ios') {
      await Purchases.configure({
        apiKey: 'appl_LTFQVcnGPCARkMtLwjqCTLcsbBR',
        appUserID: app_user_id,
      });
      const appUserId = await Purchases.getAppUserID();
      console.log('Purchases AppUserId is: ', appUserId);
    } else if (Platform.OS === 'android') {
      await Purchases.configure({
        apiKey: 'goog_rwWPcmkZHHAUBgNwKKphpyduWFX',
        appUserID: app_user_id,
      });

      const appUserId = await Purchases.getAppUserID();
      console.log('Purchases AppUserId is: ', appUserId);
    }
  })();
};
