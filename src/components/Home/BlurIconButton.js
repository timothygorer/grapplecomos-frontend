import React from 'react';
import {BlurView} from 'expo-blur';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const BlurIconButton = ({
  name,
  onPress,
  iconType,
  size,
  borderRadius = 20,
  color = 'white',
}) => {
  let icon;
  switch (iconType) {
    case 'Ionicons':
      icon = <Ionicons name={name} size={size} color={color} />;
      break;
    case 'MaterialCommunityIcons':
      icon = <MaterialCommunityIcons name={name} size={size} color={color} />;
      break;
    case 'AntDesign':
      icon = <AntDesign name={name} size={size} color={color} />;
      break;
    default:
      icon = <FontAwesome name={name} size={size} color={color} />;
  }

  return (
    <BlurView
      blurType={'light'}
      style={styles.buttonContainer(size, borderRadius)}>
      <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>
    </BlurView>
  );
};

export default BlurIconButton;

const styles = StyleSheet.create({
  buttonContainer: (size, borderRadius) => ({
    alignItems: 'center',
    justifyContent: 'center',
    width: size < 26 ? size * 2 : size * 1.69,
    height: size < 26 ? size * 2 : size * 1.69,
    borderRadius: borderRadius,
    overflow: 'hidden',
  }),
});
