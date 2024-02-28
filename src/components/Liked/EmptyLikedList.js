import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
// import Lottie from 'lottie-react-native';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import noLikesAnimation from '../../assets/lottie/51382-astronaut-light-theme.json';

// import animation

const EmptyLikedList = () => {
  const {dark} = useTheme();
  const animationRef = useRef();

  useFocusEffect(
    React.useCallback(() => {
      animationRef.current?.play();

      // Or set a specific startFrame and endFrame with:
      animationRef.current?.play(30, 120);
    }, []),
  );

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: 16,
          marginVertical: 8,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: dark ? '#AAAAAA' : 'black',
          }}>
          Save your favorite teams or players
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: dark ? '#AAAAAA' : 'black',
          }}>
          by tapping
        </Text>
        <Ionicons
          name="heart"
          size={18}
          color={dark ? 'white' : 'black'}
          style={{marginHorizontal: 2}}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: dark ? '#AAAAAA' : 'black',
          }}>
          and check back here
        </Text>
      </View>
      <View style={{height: '100%', marginTop: 50}}>
        {/*<Lottie*/}
        {/*  loop={false}*/}
        {/*  ref={animationRef}*/}
        {/*  source={noLikesAnimation}*/}
        {/*  style={StyleSheet.absoluteFill}*/}
        {/*  resizeMode="cover"*/}
        {/*/>*/}
      </View>
    </View>
  );
};

export default EmptyLikedList;

const styles = StyleSheet.create({});
