import React from 'react';
import {supabase} from '../../services/supabaseClient';
import {useDispatch, useSelector} from 'react-redux';
// import Purchases from 'react-native-purchases';
import {setIsRevenueCatPremium} from '../../redux/actions/authenticationActions';
import {initializeRevenueCatWithAppUserId} from '../../shared/utils/purchases';
import {
  restoreDefault,
  setAlreadyConfiguredRevenueCat,
} from '../../redux/slices/homeSlice';
import {getProfile, premiumUser} from '../../services/user/user';
import {Alert} from 'react-native';
// import {Amplify, API, graphqlOperation} from 'aws-amplify';
// import {upsertStreamUser} from '../../graphql/mutations.js';
// import awsconfig from '../../aws-exports';
// import {NotificationPreference} from '../../models';

// Amplify.configure({...awsconfig, Analytics: {disabled: true}});

const AuthContext = React.createContext({
  authStatus: 'SIGNED_OUT',
  setProfile: profile => {},
  signOut: () => {},
});

export default function AuthProvider({children, client}) {
  const [authStatus, setAuthStatus] = React.useState(null);
  const [profile, setProfile] = React.useState();
  // const homeData = useSelector(state => state.homeData);
  // const dispatch = useDispatch();
  const [betsFilterButtons, setBetsFilterButtons] = React.useState([
    {index: 0, title: 'All bets', key: 'all', isActive: true},
    {index: 1, title: '⏳ Open', key: 'open', isActive: false},
    {index: 2, title: '✅ Won', key: 'win', isActive: false},
    {index: 3, title: '❌ Lost', key: 'loss', isActive: false},
  ]);
  const [userId, setUserId] = React.useState(null);
  const [channels, setChannels] = React.useState(null);
  const [chatChannels, setChatChannels] = React.useState(null);
  const [servers, setServers] = React.useState([]);
  const [selectedServerIndex, setSelectedServerIndex] = React.useState(0);

  const connectStreamChatUser = async () => {
    // const userData = await Auth.currentAuthenticatedUser();
    // const {sub, email} = userData.attributes;
    // console.log(tokenResponse);
    // const token = tokenResponse?.data.getStreamToken;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTY3NWVhMTQtZTg3Mi00NmU0LWEzZDUtYjYwOWQyZDgxZWIxIn0.Iem5DvPvGVpMDSa959aIwNteBcaiVAA7zxB9RrgIS5I';
    console.log('tkn:', token);
    if (!token) {
      Alert.alert('Failed to fetch token.');
      return;
    }
    try {
      const result = await client.connectUser(
        {
          id: '5675ea14-e872-46e4-a3d5-b609d2d81eb1',
          name: 'lghstim@gmail.com',
          image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
        },
        token,
      );
      console.log('result is', result);
      // const userResponse = await API.graphql(
      //   graphqlOperation(upsertStreamUser, {id: 'ok'}),
      // );
      // console.log('userResponse is', userResponse);
      // const preferences = {
      //   notification_preference: NotificationPreference.ALL_MESSAGES,
      //   everyone_notifications: {
      //     from_admins: true,
      //     from_non_admins: false,
      //   },
      //   reactions_notifications: true,
      //   channel_exceptions: ['channel1', 'channel2'],
      // };

      // API.graphql(
      //   graphqlOperation(upsertStreamUser, {
      //     userId: '5675ea14-e872-46e4-a3d5-b609d2d81eb1',
      //     preferences: preferences,
      //   }),
      // )
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });

      const channel = client.channel('livestream', 'public', {
        name: 'Public',
      });
      await channel.watch();
    } catch (e) {
      console.log('Error', e);
    }

    setUserId('5675ea14-e872-46e4-a3d5-b609d2d81eb1');
  };

  async function setProfileGivenUserId(id) {
    getProfile(id).then(profile => {
      if (profile) {
        setProfile(profile);
        setAuthStatus('SIGNED_IN');
        if (!profile.username) {
          signOut(true); // Sign out if the username is not set.
        }
      }
    });
  }

  function signOut(noAlert) {
    supabase.auth.signOut().then(() => {
      setProfile(undefined);
      setAuthStatus('SIGNED_OUT');
      setBetsFilterButtons([
        {index: 0, title: 'All bets', key: 'all', isActive: true},
        {index: 1, title: '⏳ Open', key: 'open', isActive: false},
        {index: 2, title: '✅ Won', key: 'win', isActive: false},
        {index: 3, title: '❌ Lost', key: 'loss', isActive: false},
      ]);
      if (!noAlert) {
        Alert.alert('Signed out successfully.');
      }
    });
  }

  const fetchChannels = async () => {
    const serverName = servers[selectedServerIndex].name;
    const allChannels = await client.queryChannels({
      serverName: {$in: [serverName]},
    });
    setChannels({data: allChannels});
  };

  const fetchServers = async () => {
    const {data, error} = await supabase.from('servers').select('*');
    setServers(data);
  };

  const fetchChatChannels = async userId => {
    console.log('fetching channels.');
    const userChatChannels = await client.queryChannels({
      type: 'messaging',
      members: {$in: [userId]},
    });
    console.log('CHANNELS:', userChatChannels);
    setChatChannels({data: userChatChannels});
  };

  React.useEffect(() => {
    (async () => {
      console.log('hello, we got here.');
      await connectStreamChatUser();
      // fetchServers();
      fetchChatChannels('5675ea14-e872-46e4-a3d5-b609d2d81eb1');
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      console.log('called now.');
      // if (servers.length > 0) {
      //   fetchChannels();
      // }
    })();
  }, [servers, selectedServerIndex]);

  React.useEffect(() => {
    // Runs on first launch of the app.
    (async () => {
      console.log('WHY not?');
      let session = await supabase.auth.getSession();
      console.log('session: ', session);
      session?.data.session ?
        setProfileGivenUserId(session.data.session.user.id) : setAuthStatus('SIGNED_OUT')

      const u = await supabase.auth.getUser();
      console.log('U in AuthContext is ', u);
    })();

    supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        console.log('event: ', event, session);

        // This will fire if 1. we are already logged in when the app is first launched, or 2. we just logged in
        // if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        //   if (!homeData.alreadyConfiguredRevenueCat) {
        //     initializeRevenueCatWithAppUserId(session.user.id); // We call Purchases.configure() within this function
        //     dispatch(setAlreadyConfiguredRevenueCat(true));
        //   } else {
        //     const {customerInfo, created} = await Purchases.logIn(
        //       session.user.id,
        //     ).catch(e => {
        //       throw e;
        //     }); // Calling .logIn() here. Also note to avoid anonymous ids you don't have to call logOut. That's stated by https://www.revenuecat.com/docs/user-ids#provide-app-user-id-after-configuration
        //     const appUserId = await Purchases.getAppUserID(); // Another really helpful revenuecat post is https://community.revenuecat.com/general-questions-7/doubt-on-how-to-configure-the-sdk-after-the-user-id-is-known-1888 - without it I wouldd've had a bug for transferring purchases.
        //     console.log('Logged in. Purchases AppUserId is: ', appUserId);
        //   }
        //   const premium = await premiumUser();
        //   dispatch(setIsRevenueCatPremium({isRevenueCatPremium: premium}));
        // } else if (event === 'SIGNED_OUT') {
        //   dispatch(restoreDefault({dataKey: 'Bets'}));
        //   dispatch(setIsRevenueCatPremium({isRevenueCatPremium: false}));
        // }
      } catch (e) {}
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        profile,
        setProfile,
        signOut,
        setAuthStatus,
        betsFilterButtons,
        setBetsFilterButtons,
        channels,
        chatChannels,
        servers,
        selectedServerIndex,
        setSelectedServerIndex,
        fetchChannels,
        fetchServers,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function withAuth(Component) {
  return function AuthComponent(props) {
    const auth = useAuth();
    return <Component {...props} auth={auth} />;
  };
}