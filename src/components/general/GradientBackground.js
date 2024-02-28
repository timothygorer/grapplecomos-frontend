import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
const GradientBackground = ({
  topGradient,
  bottomGradient,
  commandColors,
  children,
  style,
}) => {
  const {dark} = useTheme();
  const lightThemeBg = ['transparent', 'transparent'];
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={dark ? commandColors : lightThemeBg}
      style={[styles.defaultStyle, style]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={dark ? topGradient : lightThemeBg}
        locations={[0, 0.35]}
        style={styles.defaultStyle}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={dark ? bottomGradient : lightThemeBg}
          locations={[0.1, 1]}
          style={styles.defaultStyle}>
          {children}
        </LinearGradient>
      </LinearGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
  },
});

export default GradientBackground;
