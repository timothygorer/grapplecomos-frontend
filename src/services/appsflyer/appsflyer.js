import appsFlyer from 'react-native-appsflyer';
import {Alert, Linking} from 'react-native';
import {getEventGivenName} from '../../shared/utils/games';
import {navigate, navigationRef} from '../../shared/utils';
import {
  getCompletedOnboardingAsyncStorage,
  setCompletedOnboardingAsyncStorage,
} from '../../shared/utils/helpers';
import {supabase} from '../supabaseClient.js';
// import {setOneSignalPlayerId} from '../push/push';
import {createOrGetProfile, profileComplete} from '../user/user';
import {StackActions} from '@react-navigation/routers';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export const onDeepLinkCanceller = appsFlyer.onDeepLink(res => {
  console.log('onDeepLinking: ' + JSON.stringify(res));
  console.log('status: ' + res.status);
  console.log('type: ' + res.type);
});

export const onAppOpenAttributionCanceller = appsFlyer.onAppOpenAttribution(
  res => {
    console.log('onAppOpenAttribution called.');
    console.log(res);
  },
);

export const onInstallConversionDataCanceller =
  appsFlyer.onInstallConversionData(res => {
    const isFirstLaunch = res?.data?.is_first_launch;

    if (isFirstLaunch && JSON.parse(isFirstLaunch) === true) {
      if (res.data.af_status === 'Non-organic') {
        const media_source = res.data.media_source;
        const campaign = res.data.campaign;
        alert(
          'This is first launch and a Non-Organic install. Media source: ' +
            media_source +
            ' Campaign: ' +
            campaign,
        );
      } else if (res.data.af_status === 'Organic') {
        alert('This is first launch and a Organic Install');
      }
    } else {
      // alert('This is not first launch');
    }
  });

export const DLListener = appsFlyer.onDeepLink(res => {
  console.log('*DLListener*', res);
  // if (res?.deepLinkStatus !== 'NOT_FOUND') {
  //   const productName = res?.data?.af_productName;
  //   const product = getProductByName(productName);
  //   console.log(product);
  //   if (product) {
  //     navigation.navigate('Item', {
  //       product: product,
  //       addToCart: addProductToCart,
  //       deepLinkValues: res,
  //     });
  //   }
  // }
});

export const initializeAppsflyerSdk = () => {
  console.log('reached this func.');
  appsFlyer.initSdk(
    {
      devKey: 'rCR2DTq8pGytFNR2J65hBn',
      isDebug: true, // set to true if you want to see data in the logs
      appId: '1634482993',
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
    },
    result => {
      console.log('Initialized appsflyer ', result);
    },
    error => {
      console.error('Failed to initialize appsflyer ', error);
    },
  );
};

function generateRandomString(length = 4) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const appsFlyerDeepLinkListener = (
  setCompletedOnboardingFlag,
  completedOnboardingFlag,
  forceUpdateApp,
  setProfile,
  setAuthStatus,
  setSpinnerActive,
  restartSpinnerTimer,
  clearSpinnerTimer,
  isActiveSpinnerTimer,
) => {
  Linking.addEventListener('url', async event => {
    console.log(
      'event is in appsFlyerDeepLinkListener - ',
      event,
      setCompletedOnboardingFlag,
      completedOnboardingFlag,
      forceUpdateApp,
      setProfile,
      setSpinnerActive,
      restartSpinnerTimer,
      clearSpinnerTimer,
      isActiveSpinnerTimer,
    );
    // if (event.url.includes(`/linedaddyapp.onelink.me/`)) {
    //   //This will process the link as a onelink if it contains the appsflyerOnelink ID.
    //   // This is the workaround to process both appsflyer and non appsflyer links.
    //   appsFlyer.performOnAppAttribution(
    //     event.url,
    //     res => {
    //       console.log('Processed a oneLink', res);
    //     },
    //     error => {
    //       console.log('Failed to process a oneLink', error);
    //     },
    //   );
    // } else {
    // console.log('hi, nav ref is ', navigationRef);

    const currentRoute = navigationRef.getCurrentRoute();

    if (event.url.startsWith('linedaddy://join-server')) {
      let url = new URL(event.url);
      let serverName = url.searchParams.get('server-name');
      console.log('parsed sn is', serverName);
      const s = generateRandomString(4);

      navigate('HomeStack', {
        screen: 'JoinServerScreen',
        params: {serverName, s},
      });
    }
    if (!event.url.startsWith('linedaddy://home/')) {
      let urlString = event.url.replace('app#', 'app?');
      let url = new URL(urlString);
      let refreshToken = url.searchParams.get('refresh_token');
      let error = url.searchParams.get('error');

      const routeParams = navigationRef.getCurrentRoute().params;
      const {cameFrom, wantsPremium} = routeParams; // came from OnboardingSignupScreen or Profile

      // check for refreshToken - this could be a user signing up or signing in via OAuth or magic link
      if (refreshToken) {
        try {
          let profile;
          restartSpinnerTimer();
          setSpinnerActive(true);

          const {error: sessionError} = await supabase.auth.refreshSession({
            refresh_token: refreshToken,
          }); // This call is needed to log the user in. Wasn't well documented in supabase v2, but discord had the solution.

          if (sessionError) {
            throw sessionError;
          }

          const {
            data: {user},
            error: userError,
          } = await supabase.auth.getUser();

          if (userError) {
            throw userError;
          }

          const {id, email} = user;

          // must fetch profile because only profiles table has 'username' which is needed to check for profile completion.
          // will throw error if there is a failure to create/retrieve profile.
          profile = await createOrGetProfile('email', email, id);
          // const updatedProfile = await setOneSignalPlayerId(profile);
          // setProfile(updatedProfile); // Set the profile in AuthContext
          setAuthStatus('SIGNED_IN');

          await sleep(1000);
          setSpinnerActive(false);
          clearSpinnerTimer();

          // profileComplete being true means we don't need to go through rest of onboarding flow
          if (profileComplete(profile)) {
            const result = await getCompletedOnboardingAsyncStorage();
            if (!result) {
              await setCompletedOnboardingAsyncStorage(
                true,
                setCompletedOnboardingFlag,
                forceUpdateApp,
              );
            } else {
              if (currentRoute.name === 'ConfirmPhoneCodeScreen') {
                navigationRef.current.dispatch(StackActions.popToTop());
                navigationRef.current.goBack();
              }
            }
          } else {
            if (cameFrom === 'OnboardingSignupPage1') {
              navigate('SignupStack', {
                screen: 'CreateYourProfileScreen',
                params: {
                  cameFrom,
                  setCompletedOnboardingFlag,
                  completedOnboardingFlag,
                  forceUpdateApp,
                },
              });
            } else {
              navigate('SignupStack', {
                screen: 'CreateYourProfileScreen',
                params: {
                  cameFrom,
                  wantsPremium,
                },
              });
            }
          }
        } catch (err) {
          isActiveSpinnerTimer ? clearSpinnerTimer() : null;
          console.error('Error occurred in appsFlyerDeepLinkListener: ', err);
          Alert.alert(
            'Email link has expired or is invalid. Please try again later or with a different login method.',
          );
          setSpinnerActive(false);
        }
      } else if (error) {
        console.error('Error occurred in appsFlyerDeepLinkListener: ', error);
        Alert.alert(
          'Email link has expired or is invalid. Please try again later or with a different login method.',
        );
      }
    } else {
      const decodedURI = decodeURI(event.url.replace('linedaddy://home/', ''));
      const params = decodedURI.split('/', 2);
      console.log('params DL is ', params);

      // TODO tgorer: is this the proper way to write this?
      if (params.length == 2) {
        const type = params[0];
        const name = params[1];

        if (type.toLowerCase() === 'team') {
          const {data: teamData} = await supabase
            .from('teams')
            .select('*')
            .ilike('name', '%' + name + '%')
            .limit(1)
            .single();

          console.log('teamData is ', teamData);

          if (teamData) {
            const result = await getCompletedOnboardingAsyncStorage();

            // Force the onboarding if user is not onboarded.
            if (!result) {
              await setCompletedOnboardingAsyncStorage(
                true,
                setCompletedOnboardingFlag,
                forceUpdateApp,
              );
            }
            navigate('OffersModalStack', {
              screen: 'TeamModal',
              params: {
                data: teamData,
                isModal: true,
                dataTableName: 'Team',
              },
            });
          } else {
            Alert.alert(
              'Team not found. Please try again with a different link.',
            );
          }
        } else if (type.toLowerCase() === 'event') {
          const gameObj = await getEventGivenName(name);
          if (gameObj) {
            const result = await getCompletedOnboardingAsyncStorage();

            // Force the onboarding if user is not onboarded.
            if (!result) {
              await setCompletedOnboardingAsyncStorage(
                true,
                setCompletedOnboardingFlag,
                forceUpdateApp,
              );
            }
            navigate('InstructionalScreen', {
              gameObj,
              reloadAllOffersData: true,
              dataTableName: 'Event',
            });
          } else {
            Alert.alert(
              'Game not found. Please try again with a different link.',
            );
          }
        }
      }
    }
  });
};

const config = {
  screens: {
    HomeStack: {
      screens: {
        HomeScreen: {
          path: 'home/:type/:eventName',
          parse: {
            eventName: name => decodeURI(name),
          },
        },
      },
    },
  },
};

export const linking = {
  prefixes: ['https://linedaddyapp.onelink.me', 'linedaddy://'],
  config,
};
