import React from 'react';
import {CustomBottomTabBar} from '../components/general/CustomBottomTabBar';
import {
  InstructionalStack,
  HomeStack,
  LikedStack,
  ProfileStack,
  SearchStack,
  ComposeStack,
} from './stacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSharedValue} from 'react-native-reanimated';
import {useAuth} from '../shared/utils/AuthContext';

const SCREENS_WITHOUT_TABBAR = [
  'OffersModalStack',
  'Notifications',
  'SettingsStack',
  'LoginStack',
  'SignupStack',
  'SearchScreen',
  'InstructionalScreen',
  'NotesStack',
  'NotesScreen',
  'NotesScreen2',
  'NewNoteScreen',
  'EditNotesScreen',
  'Chat',
  'ThreadScreen',
  'ChannelSettingsStack',
  'ProfileStack',
  'LikedSearchScreen',
  'LikedNotesScreen',
  'ChannelStack',
  'Compose',
  'Activity',
  'BottomSheet',
  'SinglePost',
  'SettingsScreen',
  'ProfileScreen',
  'ComposeStack',
];

const Tab = createBottomTabNavigator();

export const TabNavigator = ({spinnerActive, setSpinnerActive}) => {
  const animatedBottomTabBarValue = useSharedValue(0);

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
      })}
      tabBar={props => {
        const visibleStackIndex = props.state.index;
        const visibleStack = props.state.routes?.[visibleStackIndex];
        const visibleStackScreens = visibleStack?.state?.routes;
        const visibleScreen =
          visibleStackScreens?.[visibleStackScreens?.length - 1];
        const visibleScreenName = visibleScreen
          ? visibleScreen?.name
          : visibleStack.name;

        return SCREENS_WITHOUT_TABBAR.includes(visibleScreenName) ? null : (
          <CustomBottomTabBar
            navigation={props.navigation}
            {...props}
            animatedBottomTabBarValue={animatedBottomTabBarValue}
          />
        );
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        initialParams={{
          spinnerActive,
          setSpinnerActive,
          animatedBottomTabBarValue,
        }}
      />
      <Tab.Screen
        name="ComposeStack"
        component={ComposeStack}
        initialParams={{
          spinnerActive,
          setSpinnerActive,
          animatedBottomTabBarValue,
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        initialParams={{animatedBottomTabBarValue}}
      />
    </Tab.Navigator>
  );
};
