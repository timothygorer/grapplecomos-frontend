import {
  createStackNavigator,
  StackScreenProps,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import PosterOptions from './PosterOptions';
import ScheduleSelector from './ScheduleSelector';
import {SupermindRequestParam} from '../SupermindComposeScreen';

export type PosterStackParamList = {
  PosterOptions: {};
  TagSelector: {};
  NsfwSelector: {};
  ScheduleSelector: {};
  MonetizeSelector: {};
  LicenseSelector: {};
  AccessSelector: {};
  PlusMonetize: {};
  MembershipMonetize: {};
  CustomMonetize: {};
  ComposeSupermind: {
    data: SupermindRequestParam;
    closeComposerOnClear?: boolean;
    onSave: (payload: SupermindRequestParam) => void;
    onClear: () => void;
  };
};

const Stack = createStackNavigator<PosterStackParamList>();

export type PosterStackScreenProps<T extends keyof PosterStackParamList> =
  StackScreenProps<PosterStackParamList, T>;

const screenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerShown: false,
  safeAreaInsets: {top: 0},
};

export default function PosterStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ScheduleSelector" component={ScheduleSelector} />
    </Stack.Navigator>
  );
}
