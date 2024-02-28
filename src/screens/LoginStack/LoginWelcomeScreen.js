import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {adaptiveFont, getFontFamily} from '../../shared/utils';
import {useDebounce} from '../../hooks/useDebounce';
import TermsOfServicePrivacyPolicy from '../../components/general/TermsOfServicePrivacyPolicy';
import SignInButton from '../../components/general/SignInButton';
import AppleLogo from '../../assets/images/svg/javascript_svgs/AppleLogo';
// import InAppBrowser from 'react-native-inappbrowser-reborn';
import BlurButton from '../../components/Home/BlurButton.js';
import GoogleLogo from '../../assets/images/svg/javascript_svgs/GoogleLogo.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {supabase} from '../../services/supabaseClient.js';
import {useData} from '../../shared/utils/DataContext.js';
import Title from '../SignupStack/Title';
import CustomTextInput from '../SettingsStack/CustomTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as AppleAuthentication from 'expo-apple-authentication';
import {useAuth} from '../../shared/utils/AuthContext';
import {createOrGetProfile} from '../../services/user/user';
import BlurIconButton from '../../components/Home/BlurIconButton';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const renderSignInButtons = data =>
  data.map(({text, logo, callback, backgroundColor, textColor}, index) => {
    const lastIndex = data.length - 1 > index;
    return (
      <View style={{marginBottom: lastIndex ? 16 : 0}}>
        <SignInButton
          text={text}
          logo={logo}
          callback={callback}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />
      </View>
    );
  });

export const LoginWelcomeScreen = props => {
  const navigation = useNavigation();
  const {colors, dark} = useTheme();
  const [userEmail, setUserEmail] = useState('');
  const {debounce} = useDebounce();
  const {setProfile, setAuthStatus} = useAuth();

  // const {cameFrom} = props.route.params;
  const cameFrom = "OnboardingSignupPage1";
  let setCompletedOnboardingAsyncStorage,
    setCompletedOnboardingFlag,
    completedOnboardingFlag,
    forceUpdateApp,
    backButtonVisible,
    skipAccountCreationTextVisible,
    wantsPremium,
    closeButtonNotVisible;

  // const {
  //   spinnerActive,
  //   setSpinnerActive,
  //   restartSpinnerTimer,
  //   clearSpinnerTimer,
  //   isActiveSpinnerTimer,
  // } = useData();

  if (cameFrom === 'OnboardingSignupPage1') {
    // ({
    //   // setCompletedOnboardingAsyncStorage,
    //   // setCompletedOnboardingFlag,
    //   // completedOnboardingFlag,
    //   // forceUpdateApp,
    //   // backButtonVisible,
    //   // skipAccountCreationTextVisible,
    //   // closeButtonNotVisible,
    // } = props.route.params);
  } else {
    ({backButtonVisible, skipAccountCreationTextVisible} = props.route.params);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTintColor: colors.primaryText,
      headerStyle: [
        styles.headerStyle,
        {
          backgroundColor: dark ? '#2F3135' : 'white',
          shadowColor: dark ? 'transparent' : '#595959',
        },
      ],
      headerTitle: () => null,
      headerLeft: () => null,
      // headerRight: () => (
      //   <View style={{right: 20}}>
      //     <BlurIconButton
      //       iconType={'AntDesign'}
      //       name={'close'}
      //       size={18}
      //       onPress={() => navigation.goBack()}
      //     />
      //   </View>
      // ),
    });
  }, [colors.primaryText, dark, navigation]);

  const handlerContinueWithPhoneOrEmail = () => {};

  const handleSkipAccountCreation = async () => {
    // setSpinnerActive(true);
    await sleep(500);
    // await setCompletedOnboardingAsyncStorage(
    //   true,
    //   setCompletedOnboardingFlag,
    //   forceUpdateApp,
    // );
    // setSpinnerActive(false);
  };

  async function handleAppleButtonPress() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // Sign in via Supabase Auth.
      if (credential.identityToken) {
        const {
          error,
          data: {user},
        } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });
        console.log(JSON.stringify({error, user}, null, 2));
        if (!error) {
          // User is signed in.
          const profile = await createOrGetProfile(
            'email',
            user.email,
            user.id,
          ); // will throw error if there is a failure to create/retrieve profile.
          setProfile(profile); // Set the profile in AuthContext
          setAuthStatus('SIGNED_IN');

          await sleep(1000);
          navigation.navigate('CreateUsernameScreen');
        }
      } else {
        throw new Error('No identityToken.');
      }
    } catch (e) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }

  function handleOtherAccountOptionsPress(
    navigation,
    cameFrom,
    setCompletedOnboardingAsyncStorage,
    completedOnboardingFlag,
    forceUpdateApp,
    backButtonVisible,
    wantsPremium,
  ) {
    console.log('handleOtherAccountOptionsPress called.');
    if (cameFrom === 'OnboardingSignupPage1') {
      navigation.navigate('LoginStack', {
        screen: 'SignupAuthScreen',
        params: {
          cameFrom,
          setCompletedOnboardingAsyncStorage,
          setCompletedOnboardingFlag,
          completedOnboardingFlag,
          forceUpdateApp,
        },
      });
    } else {
      // Came from Profile or other
      navigation.navigate('SignupAuthScreen', {
        cameFrom,
        backButtonVisible,
        wantsPremium,
      });
    }
  }

  const signInButtonsData = [
    {
      text: 'Sign in with Apple',
      logo: <AppleLogo width={18} height={18} />,
      callback: handleAppleButtonPress,
      backgroundColor: 'black',
      textColor: '#fff',
    },
  ];

  const textInputStyles = {
    backgroundColor: dark ? '#2F3135' : '#fff',
    shadowColor: dark ? 'transparent' : '#595959',
    color: dark ? 'white' : 'black',
  };

  const onUserEmailUserChange = value => setUserEmail(value);

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handleContinueWithEmail = async () => {
    if (validateEmail(userEmail)) {
      try {
        await AsyncStorage.setItem('email', userEmail);

        // restartSpinnerTimer();
        // setSpinnerActive(true);

        const {user, error} = await supabase.auth.signInWithOtp({
          email: userEmail,
        });
        console.log('handleContinueWithEmail user is ', user, error);

        if (error) {
          throw error;
        }

        await sleep(1000);
        // setSpinnerActive(false);
        // clearSpinnerTimer();

        if (cameFrom === 'OnboardingSignupPage1') {
          navigation.navigate('ConfirmPhoneCodeScreen', {
            cameFrom,
            email: userEmail,
            phoneOrEmail: 'email',
            // setCompletedOnboardingAsyncStorage,
            // setCompletedOnboardingFlag,
            completedOnboardingFlag,
          });
        } else {
          navigation.navigate('ConfirmPhoneCodeScreen', {
            cameFrom,
            email: userEmail,
            phoneOrEmail: 'email',
          });
        }
      } catch (error) {
        // spinnerActive ? setSpinnerActive(false) : null;
        // isActiveSpinnerTimer ? clearSpinnerTimer() : null;
        setTimeout(
          () =>
            Alert.alert(
              'Some error occurred. Please wait 60 seconds before trying again.',
            ),
          0,
        );
      }
    } else {
      Alert.alert('Invalid email entered. ');
    }
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={screenHeight / 4}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
      <ImageBackground
        source={require('../../assets/Background1.jpg')}
        style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.container}>
          <Title />

          <View style={styles.signInButtonGroup}>
            {renderSignInButtons(signInButtonsData)}
            {skipAccountCreationTextVisible && (
              <TouchableOpacity onPress={handleSkipAccountCreation}>
                <Text style={styles.skipAccountCreationText}>
                  Skip account creation and continue as guest.
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.textContainer}>
              <Text style={[styles.formText]}>OR CONTINUE WITH EMAIL</Text>
            </View>

            <View style={styles.textContainer}>
              <CustomTextInput
                placeholderText={'Enter your email'}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onUserEmailUserChange}
                iconType={'MaterialIcons'}
                iconName={'email'}
              />
            </View>

            <View style={{marginTop: 15}}>
              <BlurButton
                title={'Continue with email'}
                onPress={handleContinueWithEmail}
              />
            </View>
          </View>

          <TermsOfServicePrivacyPolicy />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default LoginWelcomeScreen;

const styles = StyleSheet.create({
  headerStyle: {
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },
  mainContainer: {
    flex: 1,
    paddingTop: screenHeight * 0.15,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    borderRadius: 30,
    height: 400,
  },
  logoText: {
    fontSize: adaptiveFont(36, 36),
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontWeight: '700',
    alignItems: 'center',
    marginTop: 34,
    marginBottom: 5,
  },
  buttonGroup: {
    marginTop: 40,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    width: screenWidth - 40,
    borderRadius: 32,
    borderWidth: Platform.OS === 'android' ? 1 : 0.5,
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: adaptiveFont(16, 16),
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontWeight: '500',
    letterSpacing: -0.02,
    color: '#9E00FE',
  },
  skipAccountCreationText: {
    color: '#8F8D8A',
    fontSize: adaptiveFont(13, 13),
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
  },
  signInButtonGroup: {
    marginTop: 40,
    marginBottom: 30,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject, // This ensures the overlay takes the full space of the ImageBackground
    backgroundColor: '#F2F6FF',
    opacity: 0.2,
  },
  textInputStyle: {
    marginTop: 15,
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
    fontWeight: '400',
    width: screenWidth - 45,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#C6C3C1',
    paddingHorizontal: 16,
    paddingVertical: 14.5,
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },
  formText: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(13, 13),
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'white',
  },
  textContainer: {
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textInputContainer: {
    marginVertical: 8,
  },
});
