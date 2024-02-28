import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SectionRow = ({
  section,
  onPress,
  isFirstCard = false,
  isLastCard = false,
  width = 350,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container(isFirstCard, isLastCard, width)]}
      onPress={onPress}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/Background7.jpg')}
          style={styles.logo}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>{section.subtitle}</Text>
        <Text style={styles.title}>{section.move_title}</Text>
        <Text style={styles.text}>{section.volume_title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (isFirstCard, isLastCard, width) => ({
    marginBottom: 0,
    marginTop: 0,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Assuming ultraThinMaterial is a semi-transparent white
    borderTopLeftRadius: isFirstCard ? 30 : 0,
    borderTopRightRadius: isFirstCard ? 30 : 0,
    borderBottomLeftRadius: isLastCard ? 30 : 0,
    borderBottomRightRadius: isLastCard ? 30 : 0,
    // marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.60)',
    shadowColor: 'rgba(69, 42, 124, 0.15)',
    shadowOffset: {
      width: 0,
      height: 30, // This corresponds to the vertical shadow
    },
    shadowOpacity: 0.15, // This is the opacity of the shadow
    shadowRadius: 30, // This is the blur radius
    flexDirection: 'row',
    width,
  }),
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D1D1D6', // System background color with 0.3 opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: '#6C6C6C',
  },
  title: {
    fontWeight: '600', // semibold
  },
  text: {
    fontSize: 12,
    color: '#6C6C6C',
  },
});

export default SectionRow;
