/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ActivityIndicator, ColorSchemeName} from 'react-native';

// import NotFoundScreen from '../screens/NotFoundScreen';
// import LinkingConfiguration from './LinkingConfiguration';
// import {useAuth} from '../../shared/utils/AuthContext';

export default function Navigation({colorScheme}) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  // const {userId} = useAuth();

  // if (!userId) {
  //   return <ActivityIndicator />;
  // }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      {/*<Stack.Screen*/}
      {/*  name="NotFound"*/}
      {/*  component={NotFoundScreen}*/}
      {/*  options={{title: 'Oops!'}}*/}
      {/*/>*/}
    </Stack.Navigator>
  );
}
