import React from 'react';
import {I18nManager, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {LinearGradient} from 'expo-linear-gradient';

const {isRTL} = I18nManager;

const Indicator = ({indexDecimal, itemsLayout, style, fadeIn = false}) => {
  console.log(
    ' indexDecimal.value is ',
    indexDecimal.value,
    itemsLayout.map((_, i) => i),
    itemsLayout.map(v => (isRTL ? -1 * v.x : v.x)),
  );
  const opacity = useSharedValue(fadeIn ? 0 : 1);

  const stylez = useAnimatedStyle(() => {
    const transform =
      itemsLayout.length > 1
        ? [
            {
              translateX: interpolate(
                indexDecimal.value,
                itemsLayout.map((_, i) => i),
                // when in RTL mode, the X value should be inverted
                itemsLayout.map(v => (isRTL ? -1 * v.x : v.x)),
              ),
            },
          ]
        : undefined;

    const width =
      itemsLayout.length > 1
        ? interpolate(
            indexDecimal.value,
            itemsLayout.map((_, i) => i),
            itemsLayout.map(v => v.width),
          )
        : itemsLayout[0]?.width;

    return {
      transform,
      width,
      opacity: withTiming(opacity.value),
    };
  }, [indexDecimal, itemsLayout]);

  React.useEffect(() => {
    if (fadeIn) {
      opacity.value = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeIn]);

  return null;
  // return (
  //   <Animated.View
  //     style={[
  //       stylez,
  //       style,
  //       {height: 2, backgroundColor: 'purple', position: 'absolute', bottom: 0},
  //     ]}>
  //     <LinearGradient
  //       start={{x: 0, y: 0}}
  //       end={{x: 1, y: 0}}
  //       colors={['#9E00FE', '#6058F8']}
  //       style={styles.tabBarIndicatorGradient}
  //     />
  //   </Animated.View>
  // ); // fixme tgorer not sure why this is broken.
};

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

export {Indicator};
