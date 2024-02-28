import React from 'react';
import InstructionalDetailScreen from '../screens/InstructionalStack/InstructionalDetailScreen.js';
import LikedScreen from '../screens/LikedStack/LikedScreen';
import LoginWelcomeScreen from '../screens/LoginStack/LoginWelcomeScreen';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import ConfirmPhoneCodeScreen from '../screens/LoginStack/ConfirmPhoneCodeScreen';

import ProfileScreen from '../screens/ProfileStack/ProfileScreen';
import SettingsScreen from '../screens/ProfileStack/SettingsScreen';
import {SearchScreen} from '../components/Home/SearchScreen';

import {Platform, Pressable, StyleSheet} from 'react-native';
import {adaptiveFont, getFontFamily} from '../shared/utils';
import BottomSheetList from '../components/general/BottomSheetList/BottomSheetList';
import {AntDesign, FontAwesome5, Ionicons} from '@expo/vector-icons';
import HomeScreen from '../screens/HomeStack/HomeScreen';
import ImageGalleryScreen from '../media/ImageGalleryScreen';
import FeedScreen from '../screens/HomeStack/feed';
import NewTweetScreen from '../screens/HomeStack/new-tweet';
import NotesScreen from '../screens/HomeStack/NotesScreens/NotesScreen.tsx';
import {EditNotesScreenNew} from '../screens/HomeStack/NotesScreens/EditNotesScreenNew.tsx';
import {LikedSearchScreen} from '../screens/LikedStack/LikedSearchScreen';
import {WebViewModal} from '../components/Login/WebViewModal';
import NotesScreen2 from '../screens/HomeStack/NotesScreens/NotesScreen2';
import ChannelScreen from '../screens/ChannelStack/ChannelScreen';
import DiscoverServersScreen from '../screens/ChannelStack/DiscoverServersScreen';
import {ServerSearchScreen} from '../screens/ChannelStack/ServerSearchScreen';
import {ThreadScreen} from '../screens/ChannelStack/ThreadScreen';
import ChatScreen from '../screens/ChannelStack/ChatScreen';
import ChannelMembersScreen from '../screens/ChannelStack/ChannelMembersScreen';
import InviteMembersScreen from '../screens/ChannelStack/InviteMembersScreen';
import JoinServerScreen from '../screens/ChannelStack/JoinServerScreen';
import NewChannelScreen from '../screens/ChannelStack/NewChannelScreen';
import EditChannelsScreen from '../screens/ChannelStack/EditChannelsScreen';
import ChannelSettingsScreen from '../screens/ChannelStack/ChannelSettingsScreen';
import ServerPrivacyScreen from '../screens/ChannelStack/ServerPrivacyScreen';
import CreateServerScreen from '../screens/ChannelStack/CreateServerScreen';
import ServerSettings from '../screens/ChannelStack/ServerSettings';
import MembersScreen from '../screens/ChannelStack/MembersScreen';
import TweetScreen from '../screens/HomeStack/tweet-detail-screen';
import ComposeScreen from '../compose/ComposeScreen';
import {NewsfeedScreen} from '../modules/newsfeed';
import BottomSheetScreen from '../common/components/bottom-sheet/BottomSheetScreen';
import InstructionalScreen from '../screens/InstructionalStack/InstructionalScreen';
import ModalTransition from './ModalTransition';
import ThemedStyles from '../styles/ThemedStyles';
import {useAuth} from '../shared/utils/AuthContext';
import CreateUsernameScreen from '../screens/ProfileStack/CreateUsernameScreen';

const Stack = createStackNavigator();
const defaultScreenOptions = {
  headerShown: false,
  cardStyle: {backgroundColor: 'transparent'},
  gestureEnabled: false,
  keyboardHandlingEnabled: false,
  presentation: 'transparentModal',
  ...ModalTransition,
  cardOverlayEnabled: true,
};

export const HomeStack = props => {
  const {spinnerActive, setSpinnerActive, animatedBottomTabBarValue} =
    props.route.params;
  const {authStatus} = useAuth();
  console.log('AUTH = ', authStatus);

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="NewsfeedScreen"
        component={NewsfeedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ImageGallery" component={ImageGalleryScreen} />
      <Stack.Screen
        name="BottomSheet"
        component={BottomSheetScreen}
        options={{
          cardOverlayEnabled: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Activity"
        getComponent={() => require('../newsfeed/ActivityScreen').withModal}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        getComponent={() => require('../topbar/searchbar/SearchScreen').default}
      />
      <Stack.Screen
        name="DiscoverySearch"
        getComponent={() =>
          require('../discovery/v2/search/DiscoverySearchScreen')
            .DiscoverySearchScreen
        }
      />
      <Stack.Screen
        name="Compose"
        getComponent={() => require('../compose/ComposeStack').default}
        options={TransitionPresets.ModalPresentationIOS}
      />

      <Stack.Screen
        name="InstructionalScreen"
        component={InstructionalDetailScreen}
      />
      <Stack.Screen
        name="LoginStack"
        options={{headerShown: false, presentation: 'modal'}}
        initialParams={{spinnerActive, setSpinnerActive}}
        component={LoginStack}
      />
      <Stack.Screen
        name="ChannelStack"
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
        component={ChannelStack}
      />
      <Stack.Screen
        name="BottomSheetList"
        options={{headerShown: false, presentation: 'modal'}}
        component={BottomSheetList}
      />
      <Stack.Screen
        name="NotesStack"
        component={NotesStack}
        options={{presentation: 'modal', headerShown: false}}
      />
      <Stack.Screen name="EditNotesScreen" component={EditNotesScreenNew} />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        initialParams={{spinnerActive, setSpinnerActive}}
        options={{headerShown: false}}
      />
      {/*<Stack.Screen*/}
      {/*    name="LoginWelcomeScreen"*/}
      {/*    component={LoginWelcomeScreen}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*    name="ConfirmPhoneCodeScreen"*/}
      {/*    component={ConfirmPhoneCodeScreen}*/}
      {/*/>*/}
    </Stack.Navigator>
  );
};

export const ComposeStack = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen
        name="Compose"
        getComponent={() => require('../compose/ComposeStack').default}
        options={TransitionPresets.ModalPresentationIOS}
      />
    </Stack.Navigator>
  );
};

export const SearchStack = props => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Discovery"
        getComponent={() =>
          require('../discovery/v2/DiscoveryV2Screen').DiscoveryV2Screen
        }
      />
      <Stack.Screen
        name="DiscoverySearch"
        getComponent={() =>
          require('../discovery/v2/search/DiscoverySearchScreen')
            .DiscoverySearchScreen
        }
      />
      <Stack.Screen
        name="SearchScreen"
        getComponent={() => require('../topbar/searchbar/SearchScreen').default}
      />
      <Stack.Screen
        name="Activity"
        getComponent={() => require('../newsfeed/ActivityScreen').default}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const NotesStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotesScreen"
        component={NotesScreen}
        initialParams={props.route.params}
      />
      <Stack.Screen name="NotesScreen2" component={NotesScreen2} />
    </Stack.Navigator>
  );
};

export const LikedStack = props => {
  const {animatedBottomTabBarValue} = props.route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LikedScreen"
        component={LikedScreen}
        initialParams={{animatedBottomTabBarValue}}
      />
      <Stack.Screen
        name="LikedSearchScreen"
        component={LikedSearchScreen}
        options={{presentation: 'transparentModal'}}
      />
      <Stack.Screen name="LikedNotesScreen" component={NotesScreen} />
      <Stack.Screen
        name="LoginStack"
        options={{headerShown: false, presentation: 'modal'}}
        component={LoginStack}
      />
    </Stack.Navigator>
  );
};

export const InstructionalStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InstructionalScreen"
        component={InstructionalScreen}
        initialParams={props.route.params}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InstructionalDetailScreen"
        component={InstructionalDetailScreen}
      />
      <Stack.Screen
        name="LoginStack"
        options={{headerShown: false, presentation: 'modal'}}
        component={LoginStack}
      />
    </Stack.Navigator>
  );
};

export const ProfileStack = props => {
  const {spinnerActive, setSpinnerActive} = props.route.params;

  return (
    <Stack.Navigator screenOptions={ThemedStyles.defaultScreenOptions}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        initialParams={{spinnerActive, setSpinnerActive}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginStack"
        options={{headerShown: false, presentation: 'modal'}}
        initialParams={{spinnerActive, setSpinnerActive}}
        component={LoginStack}
      />
    </Stack.Navigator>
  );
};

export const LoginStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: styles.headerTitleStyle,
        headerTitleAlign: 'center',
        headerStyle: styles.headerStyle,
      }}>
      <Stack.Screen name="LoginWelcomeScreen" component={LoginWelcomeScreen} />
      <Stack.Screen
        name="ConfirmPhoneCodeScreen"
        component={ConfirmPhoneCodeScreen}
      />
      <Stack.Screen
        name="WebViewModal"
        component={WebViewModal}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="SignupStack"
        options={{headerShown: false}}
        component={SignupStack}
      />
      <Stack.Screen
        name="CreateUsernameScreen"
        options={{headerShown: false}}
        component={CreateUsernameScreen}
      />
    </Stack.Navigator>
  );
};

export const SignupStack = props => {
  const {spinnerActive, setSpinnerActive} = props.route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ConfirmPhoneCodeScreen"
        options={{headerShown: false}}
        component={ConfirmPhoneCodeScreen}
      />
    </Stack.Navigator>
  );
};

export const ChannelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Channels"
        component={ChannelScreen}
        options={({navigation, route}) => ({
          title: 'Channels',
          headerRight: () => (
            <MembersIcon route={route} navigation={navigation} />
          ),
        })}
      />
      <Stack.Screen
        name="DiscoverServersScreen"
        component={DiscoverServersScreen}
        options={({navigation, route}) => ({
          title: 'Discover Servers',
          headerRight: () => (
            <AntDesign
              name="search1"
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate('ServerSearchScreen');
              }}
              style={{marginRight: 15}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ServerSearchScreen"
        component={ServerSearchScreen}
        options={({navigation, route}) => ({
          title: 'Search by Server Name',
          presentation: 'transparentModal',
        })}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen
        name="ThreadScreen"
        component={ThreadScreen}
        options={({navigation, route}) => ({
          title: 'Thread',
          headerRight: () => (
            <Ionicons
              name="settings-outline"
              size={24}
              color="white"
              onPress={() =>
                navigation.navigate('ChannelSettingsStack', {
                  screen: 'ChannelSettingsScreen',
                })
              }
            />
          ),
        })}
      />

      <Stack.Screen
        name="ChannelMembers"
        component={ChannelMembersScreen}
        options={{title: 'Channel Members'}}
      />
      <Stack.Screen
        name="InviteMembers"
        component={InviteMembersScreen}
        options={{title: 'Invite Members'}}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{title: 'Settings', presentation: 'modal'}}
      />
      <Stack.Screen
        name="ChannelSettingsStack"
        component={ChannelSettingsStack}
        options={{headerShown: false, presentation: 'modal'}}
      />
      <Stack.Screen
        name="JoinServerScreen"
        component={JoinServerScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ChannelSettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewChannel"
        component={NewChannelScreen}
        options={{title: 'New Channel'}}
      />

      <Stack.Screen
        name="EditChannelsScreen"
        component={EditChannelsScreen}
        options={{
          title: 'Edit Channels',
        }}
      />
      <Stack.Screen
        name="ChannelSettingsScreen"
        component={ChannelSettingsScreen}
        options={{
          title: 'Channel Settings',
        }}
        initialParams={{deleteChannelScreen: false}}
      />
      <Stack.Screen
        name="ServerPrivacyScreen"
        component={ServerPrivacyScreen}
        options={{
          title: 'Create a Server',
        }}
      />
      <Stack.Screen
        name="CreateServerScreen"
        component={CreateServerScreen}
        options={{
          title: 'Create a Server',
        }}
      />
      <Stack.Screen
        name="ServerSettings"
        component={ServerSettings}
        options={{
          title: 'Server Settings',
        }}
      />
      <Stack.Screen
        name="MembersScreen"
        component={MembersScreen}
        options={{
          title: 'All Members',
        }}
      />
    </Stack.Navigator>
  );
};

export const SettingsStack = props => {
  const {spinnerActive, setSpinnerActive} = props.route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: styles.headerTitleStyle,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="LoginStack"
        options={{headerShown: false}}
        initialParams={{spinnerActive, setSpinnerActive}}
        component={LoginStack}
      />
      <Stack.Screen
        name="SignupStack"
        options={{headerShown: false}}
        initialParams={{spinnerActive, setSpinnerActive}}
        component={SignupStack}
      />
      {/*<Stack.Screen name="EditProfile" component={EditProfile} />*/}
    </Stack.Navigator>
  );
};

const MembersIcon = ({route, navigation}) => {
  if (!route?.params?.channel) {
    return null;
  }

  return (
    <Pressable
      style={styles.icon}
      onPress={() =>
        navigation.navigate('ChannelMembers', {
          channel: route.params.channel,
        })
      }>
      <FontAwesome5 name="users" size={24} color="lightgray" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(18, 18),
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
