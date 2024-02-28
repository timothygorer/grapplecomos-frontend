import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {adaptiveFont, getFontFamily} from '../../shared/utils';

const {width: screenWidth} = Dimensions.get('screen');

export const SignInButton = ({
  logo,
  text,
  callback,
  backgroundColor,
  textColor,
}) => {
  const {dark, colors} = useTheme();

  const textColorStyle = {
    color: textColor || colors.primaryText,
  };

  const containerBackgroundColor = {
    backgroundColor: backgroundColor
      ? backgroundColor
      : dark
      ? '#2F3135'
      : '#fff',
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={callback}>
      <View style={[styles.container, containerBackgroundColor]}>
        <View style={styles.logoContainer}>{logo}</View>
        <Text style={[styles.text, textColorStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SignInButton;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'center',
  },
  container: {
    paddingVertical: 10.5,
    paddingHorizontal: 10.5,
    width: screenWidth - 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C6C3C1',
  },
  text: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
    fontWeight: '500',
  },
  logoContainer: {
    marginRight: 6,
  },
});
