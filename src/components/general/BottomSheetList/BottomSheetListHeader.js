import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
import {getFontFamily} from '../../../shared/utils';
import {useTheme} from '@react-navigation/native';

const BottomSheetListHeader = ({title}) => {
  const {dark} = useTheme();
  const baseTextColor = {
    color: dark ? '#FFFFFF' : '#262626',
  };
  return <Text style={[styles.text, baseTextColor]}>{title || 'Title'}</Text>;
};

export default BottomSheetListHeader;

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 10,
  },
});
