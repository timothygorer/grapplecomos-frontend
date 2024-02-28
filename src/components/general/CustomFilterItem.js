import React from 'react';

// React native components
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';

// Styles
import {LinearGradient} from 'expo-linear-gradient';

// Theme colors
import {useTheme} from '@react-navigation/native';

// Fonts
import {getFontWeight, getFontFamily, adaptiveFont} from '../../shared/utils';

const CustomFilterItem = ({active, title, setActive}) => {
  const gradient = {
    darkModeGradient: ['#9E00FE', '#6058F8', '#1ED761'],
    lightModeGradient: ['#9E00FE', '#6058F8'],
  };

  const {colors, dark: darkTheme} = useTheme();

  return active ? (
    <TouchableOpacity activeOpacity={0.6} onPress={setActive}>
      <LinearGradient
        colors={
          darkTheme ? gradient.darkModeGradient : gradient.lightModeGradient
        }
        style={styles.gradient}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}>
        <View
          style={[
            styles.container,
            darkTheme ? styles.darkModeBackground : styles.lightModeBackground,
          ]}>
          <Text
            style={[
              styles.text,
              {
                color: colors.primaryText,
              },
            ]}>
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity activeOpacity={0.6} onPress={setActive}>
      <View
        style={[
          styles.container,
          styles.notActive,
          {
            backgroundColor: darkTheme ? 'transparent' : '#F2F2F2',
            borderColor: darkTheme ? '#ffffff' : '#4B4B4B',
          },
        ]}>
        <Text
          style={[
            styles.text,
            {
              color: colors.primaryText,
            },
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomFilterItem;

// Button styles
const styles = StyleSheet.create({
  container: {
    margin: 1.5,
    paddingRight: 4,
    paddingLeft: 4,
    paddingBottom: 8,
    paddingTop: 8,
    minHeight: 37,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: adaptiveFont(32, 12),
    fontWeight: getFontWeight('bold'),
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    textAlign: 'center',
  },
  gradient: {
    borderRadius: 32,
    width: 'auto',
  },
  lightModeBackground: {
    borderRadius: 32,
    backgroundColor: '#ffffff',
  },
  darkModeBackground: {
    borderRadius: 32,
    backgroundColor: '#292929',
    borderColor: 'red',
  },
  notActive: {
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 32,
  },
});
