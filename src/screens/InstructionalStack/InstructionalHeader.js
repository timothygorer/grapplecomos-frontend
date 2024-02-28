import React, {useMemo} from 'react';
import {Text, View, StyleSheet} from 'react-native';
// import FastImage from 'react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import GlassButton from '../../components/Home/GlassButton.js';
import {useNavigation} from '@react-navigation/native';

const placeholderImg = 'https://dummyimage.com/48x48/fff/aaa';

const InstructionalHeader = ({data, tabType, animatedValue, onLayout}) => {
  const navigation = useNavigation();
  console.log('val', animatedValue);
  const {dark} = useTheme();

  const renderHeaderContentHandler = () => {
    return (
      <>
        <Animated.View style={[styles.shadow]}>
          <View style={styles.teamsContainer}>
            <GlassButton
              title={'Favorite'}
              onPress={() => {
                console.log('hello');
                navigation.navigate('HomeStack', {screen: 'MembersScreen'});
              }}
            />
            <GlassButton title={'Comments'} />
          </View>
        </Animated.View>
      </>
    );
  };

  const largeHeaderStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedValue.value,
        [15, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const smallHeaderStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedValue.value,
        [50, 0],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View style={[styles.outerContainer]} onLayout={onLayout}>
      {renderHeaderContentHandler(tabType)}
    </View>
  );
};

export default InstructionalHeader;

const styles = StyleSheet.create({
  outerContainer: {
    paddingTop: 4,
  },
  innerContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  shadow: {
    shadowColor: '#42464C',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  baseTeamContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offersEventStatusContainer: {
    alignSelf: 'flex-end',
  },
  championAndFuturesContainer: {
    paddingHorizontal: 32,
    paddingTop: 22,
    paddingBottom: 18,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#1D4289',
  },
  championSubTitle: {
    fontWeight: '700',
    fontSize: 14,
    opacity: 0.6,
    marginLeft: 32,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  featuresSubTitle: {
    fontWeight: '600',
    fontSize: 14,
    opacity: 0.6,
    marginLeft: 32,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 25,
    height: 32,
    marginRight: 7.25,
  },
  teamAndLeagueInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 7,
  },
  teamAndLeagueTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  smallHeaderContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: 4,
  },
});
