import React, {useMemo} from 'react';
import {StyleSheet, Pressable, Platform, Text} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {getFontWeight} from './shared/utils';

export const TABBAR_HEIGHT = 48;
const DEFAULT_COLOR = 'rgba(0, 0, 0, 1)';

export const EventDateItem = props => {
  const {
    name,
    index,
    onPress,
    onLayout,
    scrollEnabled,
    indexDecimal,
    label,
    style,
    activeColor = DEFAULT_COLOR,
    inactiveColor = DEFAULT_COLOR,
    inactiveOpacity = 0.7,
    pressColor = '#DDDDDD',
    pressOpacity = Platform.OS === 'ios' ? 0.2 : 1,
    dayOfWeek,
    month,
    dayOfMonth,
    selected,
    ...rest
  } = props;
  const {dark} = useTheme();

  const dynamicTextStyles = {
    color: dark ? (selected ? '#272727' : 'grey') : selected ? 'black' : 'grey',
  };

  return (
    <Pressable
      onLayout={onLayout}
      style={({pressed}) => [
        {opacity: pressed ? pressOpacity : 1},
        !scrollEnabled && styles.grow,
        styles.item,
        style,
        selected ? styles.selectedButton : null,
      ]}
      onPress={() => onPress(name)}
      android_ripple={{
        borderless: true,
        color: pressColor,
      }}
      {...rest}>
      <Text
        style={[
          styles.dayOfWeek,
          styles.text,
          dynamicTextStyles,
          {fontWeight: getFontWeight('bold')},
        ]}>
        {dayOfWeek}
      </Text>
      <Text
        style={[
          styles.month,
          styles.text,
          dynamicTextStyles,
          {fontWeight: getFontWeight('semibold')},
        ]}>
        {month} {dayOfMonth}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  grow: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: TABBAR_HEIGHT,
  },
  label: {
    margin: 4,
  },
  container: {
    marginHorizontal: 12,
  },
  dayOfWeek: {
    textTransform: 'capitalize',
  },
  month: {
    textTransform: 'uppercase',
  },
  text: {
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFUIDisplay',
  },
  selectedButton: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0, // x
      height: 4, // y
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // for android, adjust as needed
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#f9f9f9',
  },
});
