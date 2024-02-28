import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginStack, SignupStack} from './stacks';

const Stack = createNativeStackNavigator();

export const OnboardingStack = ({
  setCompletedOnboardingAsyncStorage,
  setCompletedOnboardingFlag,
  completedOnboardingFlag,
  forceUpdateApp,
  spinnerActive,
  setSpinnerActive,
}) => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};
