import React, {useCallback, useMemo} from 'react';
import {Platform, Pressable, Text, StyleSheet, View} from 'react-native';
import SortIcon from '../../../assets/images/svg/javascript_svgs/SortIcon';
import {useTheme} from '@react-navigation/native';
import {getFontFamily} from '../../../shared/utils';

const BottomSheetFilter = ({onPress, style}) => {
  const {dark} = useTheme();
  const textStyles = useMemo(
    () => ({
      color: dark ? '#FFFFFF' : '#262626',
    }),
    [dark],
  );

  const onPressHandler = useCallback(
    ({pressed}) => pressed && styles.pressed,
    [],
  );

  return (
    <View style={style}>
      <Pressable style={onPressHandler} onPress={onPress}>
        <View style={styles.sortContainer}>
          <SortIcon color={dark ? '#FFFFFF' : '#262626'} />
          <Text style={[styles.sortText, textStyles]}>Sportsbook</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default BottomSheetFilter;

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    marginLeft: 4,
  },
  pressed: {
    opacity: 0.5,
  },
});
