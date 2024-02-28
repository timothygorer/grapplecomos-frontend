import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const CustomButton = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name={'person-circle'} color={'white'} size={36} />
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    alignSelf: 'stretch',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    backgroundColor: '#1A1433',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    marginRight: 12, // This replaces gap as gap is not supported in React Native
  },
  text: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 17,
    flex: 1, // This makes the input stretch to fill the remaining space
    fontWeight: '400',
    lineHeight: 22,
  },
});

export default CustomButton;
