// OneSignal Init Code
// import OneSignal from 'react-native-onesignal';
import {updateOneSignalPlayerIds} from '../user/user';

// export const initializeOneSignal = () => {
//   OneSignal.setLogLevel(6, 0);
//   OneSignal.setAppId('bde7bd0a-deda-4f93-b505-f9539e2ddbe2');
//   // END OneSignal Init Code
//
//   // Prompt for push on iOS
//   OneSignal.promptForPushNotificationsWithUserResponse(async response => {
//     console.log('Prompt response:', response);
//   });
//
//   // Method for handling notifications received while app in foreground
//   OneSignal.setNotificationWillShowInForegroundHandler(
//     notificationReceivedEvent => {
//       console.log(
//         'OneSignal: notification will show in foreground:',
//         notificationReceivedEvent,
//       );
//       let notification = notificationReceivedEvent.getNotification();
//       console.log('notification: ', notification);
//       const data = notification.additionalData;
//       console.log('additionalData: ', data);
//       // Complete with null means don't show a notification.
//       notificationReceivedEvent.complete(notification);
//     },
//   );
//
//   // Method for handling notifications opened
//   OneSignal.setNotificationOpenedHandler(notification => {
//     console.log('OneSignal: notification opened:', notification);
//   });
// };

// export const setOneSignalPlayerId = async profile => {
//   try {
//     if (profile) {
//       const {userId: osUserId} = await OneSignal.getDeviceState(); // OneSignal user id is also known as player id
//
//       const currentPlayerIds = [...profile.onesignal_player_ids];
//       currentPlayerIds.indexOf(osUserId) === -1
//         ? currentPlayerIds.push(osUserId)
//         : null;
//
//       const updatedProfile = await updateOneSignalPlayerIds(
//         profile.id,
//         currentPlayerIds,
//       );
//       return updatedProfile;
//     } else {
//       throw new Error('profile is empty.');
//     }
//   } catch (error) {
//     console.error('Error occurred in setOneSignalPlayerId: ', error);
//   }
// };

// export const removeOneSignalPlayerId = async profile => {
//   try {
//     if (profile) {
//       const {userId: osUserId} = await OneSignal.getDeviceState(); // OneSignal user id is also known as player id
//
//       const currentPlayerIds = [...profile.onesignal_player_ids];
//       const index = currentPlayerIds.indexOf(osUserId);
//       if (index > -1) {
//         // only splice array when item is found
//         currentPlayerIds.splice(index, 1); // 2nd parameter means remove one item only
//       }
//
//       const updatedProfile = await updateOneSignalPlayerIds(
//         profile.id,
//         currentPlayerIds,
//       );
//       return updatedProfile;
//     } else {
//       throw new Error('profile is empty.');
//     }
//   } catch (error) {
//     console.error('Error occurred in removeOneSignalPlayerId: ', error);
//   }
// };
