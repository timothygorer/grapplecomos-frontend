import React from 'react';
import {Text, StyleSheet, Pressable, View, Platform} from 'react-native';
import Check from '../../../assets/images/svg/javascript_svgs/Check';
import {getFontFamily} from '../../../shared/utils';
import {useTheme} from '@react-navigation/native';

const BottomSheetListItem = ({
  onChange,
  data,
  currentActiveIndex,
  multipleSelectionsAllowed,
  isBottomTabsSheet,
}) => {
  const {dark} = useTheme();
  const baseTextColor = {
    color: dark ? 'rgba(255, 255, 255, 0.8)' : '#5A5A5A',
  };
  const onPressHandler = ({pressed}) => pressed && styles.pressed;

  return (
    <Pressable
      style={onPressHandler}
      onPress={
        !isBottomTabsSheet
          ? onChange && onChange.bind(this, data)
          : onChange && onChange.bind(this, data.index)
      }>
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            baseTextColor,
            !isBottomTabsSheet
              ? data.isActive && {
                  color: dark ? '#FFFFFF' : '#9E00FE',
                }
              : data.index === currentActiveIndex && {
                  color: dark ? '#FFFFFF' : '#9E00FE',
                },
          ]}>
          {data.name}
        </Text>
        {!isBottomTabsSheet
          ? data.isActive && <Check />
          : data.index === currentActiveIndex && <Check />}
      </View>
    </Pressable>
  );
};

export default BottomSheetListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: 23,
    fontWeight: '700',
    marginVertical: 10,
  },
});
