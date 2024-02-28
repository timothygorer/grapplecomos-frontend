import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons'; // Assuming you are using this popular library
// import {BlurView, VibrancyView} from '@react-native-community/blur';
import {BlurView} from 'expo-blur';

const GlassButton = ({
  title,
  onPress,
  name,
  type,
  color = 'rgba(0,0,0,0.3)',
}) => {
  let icon;
  switch (type) {
    case 'Ionicons':
      icon = <Ionicons name={name} size={24} color={color} />;
      break;
    case 'MaterialCommunityIcons':
      icon = <MaterialCommunityIcons name={name} size={24} color={color} />;
      break;
    case 'AntDesign':
      icon = <AntDesign name={name} size={24} color={color} />;
      break;
    default:
      icon = <FontAwesome name={name} size={24} color={color} />;
  }

  return (
      <TouchableOpacity onPress={onPress}>
      <BlurView tint='light' style={styles.buttonContainer}>
      {icon}
      <Text style={styles.buttonText(color)}>{title}</Text>
    </BlurView>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    overflow:'hidden',
    borderColor: 'rgba(255, 255, 255, 0.60)',
    // backgroundColor: 'rgba(255, 255, 255, 0.40)',
    paddingVertical: 18,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(69, 42, 124, 0.15)',
        shadowOffset: {
          width: 0,
          height: 40,
        },
        shadowOpacity: 0.4,
        shadowRadius: 40,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonText: color => ({
    color: color,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    marginLeft: 12, // Gap between the icon and text
  }),
});

export default GlassButton;
