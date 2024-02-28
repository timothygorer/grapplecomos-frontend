import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {BlurView} from 'expo-blur'; // You'll need to install this library

const BlurButton = props => {
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={props.onPress}
      disabled={props.disabled}>
      <BlurView style={styles.blurContainer} intensity={100} tint={'dark'}>
        <Text style={styles.text}>{props.title}</Text>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFFB3', // primary color with 0.7 opacity
  },
  blurContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default BlurButton;
