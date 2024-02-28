import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

const CustomTextInput = ({
  multiline = false,
  placeholderText = 'Enter text',
  autoCapitalize = 'none',
  autoCorrect = false,
  onChangeText,
  iconType,
  iconName,
    value,
  disabled = false,
}) => {
  let icon;
  switch (iconType) {
    case 'Ionicons':
      icon = <Ionicons name={iconName} size={24} color={'white'} />;
      break;
    case 'MaterialCommunityIcons':
      icon = (
        <MaterialCommunityIcons name={iconName} size={24} color={'white'} />
      );
      break;
    case 'MaterialIcons':
      icon = <MaterialIcons name={iconName} size={24} color={'white'} />;
      break;
    case 'AntDesign':
      icon = <AntDesign name={iconName} size={24} color={'white'} />;
      break;
    default:
      icon = <FontAwesome name={iconName} size={24} color={'white'} />;
  }

  return (
    <View style={styles.container(multiline)}>
      <TouchableOpacity style={styles.iconContainer}>{icon}</TouchableOpacity>
      <TextInput
        editable={!disabled}
        placeholder={placeholderText}
        placeholderTextColor="rgba(255, 255, 255, 0.70)"
        style={styles.input}
        numberOfLines={multiline ? 5 : 1}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: multiline => ({
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    padding: 8,
    alignSelf: 'stretch',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    backgroundColor: '#1A1433',
    height: multiline ? 125 : 52,
  }),
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    marginRight: 12, // This replaces gap as gap is not supported in React Native
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 17,
    flex: 1, // This makes the input stretch to fill the remaining space
    fontWeight: '400',
    lineHeight: 22,
  },
});

export default CustomTextInput;
