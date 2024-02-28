import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import SectionRow from '../../../components/Home/SectionRow';
import CloseX from '../../../assets/images/svg/javascript_svgs/CloseX';
import {BlurView} from 'expo-blur';
import {FontAwesome5} from '@expo/vector-icons';
import BlurButton from '../../../components/Home/BlurButton';
import {supabase} from '../../../services/supabaseClient';

const LoggedOutCard = ({
  index,
  section,
  onPress,
  buttonText = 'Log in',
  loggedOut = true,
}) => {
  return (
    <View style={[styles.container]} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.title1(section)}>{section.name}</Text>
        {'description' in section && (
          <Text style={styles.description}>{section.description}</Text>
        )}
        {loggedOut && (
          <>
            <View style={styles.divider} />
            <View style={{marginTop: 8}}>
              <BlurButton title={buttonText} onPress={onPress} />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default LoggedOutCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Assuming ultraThinMaterial is a semi-transparent white
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    marginLeft: 20,
    marginRight: 20,
    width: 350,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title1: section => ({
    color: '#000',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 34,
    letterSpacing: 0.364,
    textAlign: 'description' in section ? 'flex-start' : 'center',
  }),
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,255,0.40)', // Adjust this color
    marginVertical: 8,
  },
  description: {
    color: 'rgba(0, 0, 0, 0.70)',
    fontSize: 13,
    fontWeight: '400', // This corresponds to the normal font weight
    lineHeight: 18,
    letterSpacing: -0.078,
    marginVertical: 12,
  },
});
