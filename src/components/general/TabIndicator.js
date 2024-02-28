import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const TabIndicator = ({width, tabWidth, index}) => {
  const marginLeftRef = useRef(
    new Animated.Value(index ? tabWidth : 0),
  ).current;

  useEffect(() => {
    Animated.timing(marginLeftRef, {
      toValue: tabWidth,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [marginLeftRef, tabWidth]);

  return (
    <Animated.View
      style={[
        styles.tabBarIndicator,
        {
          width: width,
          marginLeft: marginLeftRef,
        },
      ]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#9E00FE', '#6058F8']}
        style={styles.tabBarIndicatorGradient}
      />
    </Animated.View>
  );
};

export default TabIndicator;

const styles = StyleSheet.create({
  tabBarIndicator: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  tabBarIndicatorGradient: {
    height: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
