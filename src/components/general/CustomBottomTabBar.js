import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import HomeOpen from '../../assets/images/svg/javascript_svgs/HomeOpen';
import HomeClosed from '../../assets/images/svg/javascript_svgs/HomeClosed';
import HeartOpen from '../../assets/images/svg/javascript_svgs/HeartOpen';
import HeartClosed from '../../assets/images/svg/javascript_svgs/HeartClosed';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {BlurView} from 'expo-blur';
import {Ionicons} from '@expo/vector-icons';
import ProfileOpen from '../../assets/images/svg/javascript_svgs/ProfileOpen';
import ProfileClosed from '../../assets/images/svg/javascript_svgs/ProfileClosed';

export const CustomBottomTabBar = ({
  state,
  descriptors,
  animatedBottomTabBarValue,
}) => {
  const {colors, dark} = useTheme();
  const navigation = useNavigation();

  const TabBarIcons = [
    {
      index: 0,
      open: <HomeOpen color="rgba(0,0,255,0.3)" />,
      closed: <HomeClosed color="rgba(0,0,255,0.3)" />,
      title: 'Home',
    },
    {
      index: 1,
      open: (
        <Ionicons name="book-outline" size={24} color="rgba(0,0,255,0.3)" />
      ),
      closed: (
        <Ionicons name="book-sharp" size={24} color="rgba(0,0,255,0.3)" />
      ),
      title: 'Instructionals',
    },
    {
      index: 2,
      open: <HeartOpen color="rgba(0,0,255,0.3)" />,
      closed: <HeartClosed color="rgba(0,0,255,0.3)" />,
      title: 'Saved',
    },
  ];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animatedBottomTabBarValue.value,
        },
      ],
    };
  });

  console.log('animatedBottomTabBarValue is ', animatedBottomTabBarValue.value);

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <BlurView intensity={100} tint={'light'}>
        <View style={styles.itemsContainer}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              if (!isFocused) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({name: route.name, merge: true});
              }
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                onPress={onPress}
                style={styles.item}>
                {isFocused
                  ? TabBarIcons[index].closed
                  : TabBarIcons[index].open}
                <Text style={{color: 'rgba(0,0,255,0.3)'}}>
                  {TabBarIcons[index].title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 30,
    paddingTop: 10,
  },
  item: {
    alignItems: 'center',
  },
});
