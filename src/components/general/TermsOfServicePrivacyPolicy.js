import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {adaptiveFont, getFontFamily} from '../../shared/utils';
import {useNavigation} from "@react-navigation/native";

const TermsOfServicePrivacyPolicy = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.termsOfServiceContainer}>
      <View style={styles.termsOfServiceMainTextContainer}>
        <TouchableOpacity onPress={() =>{
          navigation.navigate('WebViewModal', {url: 'https://grapplecosmos-website-j5ennbbfv-timothygorer.vercel.app/tos', title: 'Terms of Service'})}}>
          <Text style={styles.termsOfServiceActiveText}>Terms of Service </Text>
        </TouchableOpacity>
        <Text style={[styles.termsOfServiceMainText]}>and</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('WebViewModal', {url: 'https://grapplecosmos-website-j5ennbbfv-timothygorer.vercel.app/privacy-policy', title: 'Privacy Policy'})}}>
          <Text style={styles.termsOfServiceActiveText}> Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsOfServicePrivacyPolicy;

const styles = StyleSheet.create({
  termsOfServiceMainTextContainer: {
    flexDirection: 'row',
  },
  termsOfServiceContainer: {
    maxWidth: 260,
    alignSelf: 'center',
  },
  termsOfServiceMainText: {
    fontSize: adaptiveFont(13, 13),
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontWeight: '400',
    color: 'white',
  },
  termsOfServiceActiveText: {
    fontSize: adaptiveFont(13, 13),
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontWeight: '700',
    color: 'white',
  },
});
