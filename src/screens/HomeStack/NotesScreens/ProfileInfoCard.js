import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import BlurIconButton from '../../../components/Home/BlurIconButton';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from "../../../shared/utils/AuthContext";

const ProfileInfoCard = ({email}) => {
  const navigation = useNavigation();
  const {profile} = useAuth()

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../../assets/Background3.jpg')}
          style={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{email}</Text>
          {/*<Text style={styles.footnoteText}>Footnote Text</Text>*/}
        </View>
        <BlurIconButton
          name={'settings'}
          size={20}
          iconType={'Ionicons'}
          borderRadius={12}
          onPress={() => navigation.navigate('SettingsScreen')}
        />
      </View>
      <View style={styles.divider} />
      <Text style={styles.textBox}>{profile?.username ?? 'GrappleCosmos User'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.20)',
    backgroundColor: 'rgba(40, 27, 90, 0.50)',
    shadowColor: 'rgba(42, 28, 91, 0.50)',
    shadowOffset: {width: 0, height: 30},
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 10,
    width: 359,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  avatar: {
    borderRadius: 66 / 2, // Half the width and height to make it circular
    borderWidth: 2,
    borderColor: '#FFF',
    width: 66,
    height: 66,
    flexShrink: 0, // Corresponds to the CSS flex-shrink property
  },
  infoContainer: {
    marginHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1, // This will expand the container to fill the available space
  },
  titleText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 28,
    letterSpacing: 0.35,
    marginBottom: 2, // This will act as the gap between the texts
  },
  footnoteText: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
  },
  divider: {
    height: 1,
    alignSelf: 'stretch', // This will make the divider stretch to fill its container
    backgroundColor: 'rgba(255, 255, 255, 0.10)', // Semi-transparent white
  },
  textBox: {
    marginTop: 16,
    alignSelf: 'stretch',
    color: '#FFF',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0.35,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 10},
    textShadowRadius: 40,
  },
});

export default ProfileInfoCard;
