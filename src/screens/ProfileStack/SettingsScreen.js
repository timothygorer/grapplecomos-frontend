import React, {useLayoutEffect} from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import Purchases from 'react-native-purchases';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDebounce} from '../../hooks/useDebounce';
// import OneSignal from 'react-native-onesignal';
// import {removeOneSignalPlayerId} from '../../services/push/push';
import NavigationBar from '../../components/general/NavigationBar';
import CustomTextInput from '../SettingsStack/CustomTextInput';
import CustomButton from '../SettingsStack/CustomButton';
import BlurButton from '../../components/Home/BlurButton';
import {useHeaderHeight} from '@react-navigation/elements';
import BlurIconButton from '../../components/Home/BlurIconButton';
import {supabase} from '../../services/supabaseClient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAuth} from '../../shared/utils/AuthContext';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const Settings = props => {
  const navigation = useNavigation();
  const {profile, signOut} = useAuth();

  return (
    <KeyboardAwareScrollView
      extraHeight={screenHeight / 4}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{backgroundColor:'black',flex:1,    alignItems: 'center',}}>
        <NavigationBar
          isModal={false}
          title={'Edit Profile'}
          leftButton={() => (
            <BlurIconButton
              iconType={'Ionicons'}
              name={'arrow-back'}
              size={18}
              onPress={() => navigation.goBack()}
            />
          )}
        />
        <View style={[styles.contentContainer]}>
          {/*<View style={styles.textInputContainer}>*/}
          {/*  <CustomButton text={'Choose photo'} />*/}
          {/*</View>*/}
          <View style={styles.textInputContainer}>
            <CustomTextInput
              iconType={'MaterialCommunityIcons'}
              iconName={'format-letter-case'}
              placeholderText={profile?.username ?? 'GrappleCosmos user'}
              disabled={true}
            />
          </View>
          {/*<View style={styles.textInputContainer}>*/}
          {/*  <CustomTextInput*/}
          {/*    iconType={'MaterialCommunityIcons'}*/}
          {/*    iconName={'draw'}*/}
          {/*  />*/}
          {/*</View>*/}
          {/*<View style={styles.textInputContainer}>*/}
          {/*  <CustomTextInput />*/}
          {/*</View>*/}
          {/*<View style={styles.textInputContainer}>*/}
          {/*  <CustomTextInput*/}
          {/*    multiline={true}*/}
          {/*    iconType={'AntDesign'}*/}
          {/*    iconName={'form'}*/}
          {/*    disabled={true}*/}
          {/*  />*/}
          {/*</View>*/}
          {/*<View style={styles.textInputContainer}>*/}
          {/*  <BlurButton title={'Save Settings'} />*/}
          {/*</View>*/}
          {/*<View style={styles.textInputContainer}>*/}
          {/*  <BlurButton*/}
          {/*    title={'Log Out'}*/}
          {/*    onPress={async () => {*/}
          {/*      signOut();*/}
          {/*      navigation.navigate('HomeScreen');*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</View>*/}
          <View style={styles.textInputContainer}>
            <BlurButton
              title={'Delete Account'}
              onPress={async () => {
                if (profile) {
                  const {data, error} = await supabase
                    .from('profiles')
                    .delete()
                    .eq('id', profile.id);
                  if (!error) {
                    Alert.alert('Account deleted successfully.');
                    navigation.navigate('HomeScreen');
                  }
                }
              }}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    width: 335,
  },
  instructionsText: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.24,
    alignSelf: 'stretch',
    paddingHorizontal: 10, // Add padding as needed
    marginBottom: 8,
  },
  choosePhotoText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  textInputContainer: {
    marginVertical: 8,
  },
});
