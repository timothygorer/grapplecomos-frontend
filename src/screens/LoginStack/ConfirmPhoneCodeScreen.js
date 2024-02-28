import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import FinalLinedaddyText from '../../assets/images/svg/javascript_svgs/FinalLinedaddyText';
import arrowIconLeft from '../../assets/images/png/arrow-icon-left/arrow-icon-left.png';

import {supabase} from '../../services/supabaseClient';
import {createOrGetProfile, profileComplete} from '../../services/user/user';
import {useNavigation, useTheme} from '@react-navigation/native';
import {adaptiveFont, getFontFamily} from '../../shared/utils';
import TermsOfServicePrivacyPolicy from '../../components/general/TermsOfServicePrivacyPolicy';
import {useAuth} from '../../shared/utils/AuthContext';
import {setOneSignalPlayerId} from '../../services/push/push';
import {useData} from '../../shared/utils/DataContext.js';
import {useDebounce} from '../../hooks/useDebounce';
import BlurButton from '../../components/Home/BlurButton.js';

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 6;
const CELL_HEIGHT = 48;
const CELL_WIDTH = 43;

const sleep = ms => new Promise(r => setTimeout(r, ms));

const {width: screenWidth} = Dimensions.get('screen');

export const ConfirmPhoneCodeScreen = props => {
  const {colors, dark} = useTheme();

  const {
    route: {
      params: {formattedPhoneNumber, phoneOrEmail, email, cameFrom},
    },
  } = props;

  let setCompletedOnboardingAsyncStorage,
    setCompletedOnboardingFlag,
    completedOnboardingFlag,
    forceUpdateApp,
    spinnerActive,
    setSpinnerActive,
    wantsPremium;

  if (cameFrom === 'OnboardingSignupPage1') {
    ({
      route: {
        params: {
          setCompletedOnboardingAsyncStorage,
          setCompletedOnboardingFlag,
          completedOnboardingFlag,
          forceUpdateApp,
          setSpinnerActive,
          spinnerActive,
        },
      },
    } = props);
  } else {
    // Came from Profile or other
    ({
      route: {
        params: {setSpinnerActive, spinnerActive},
      },
    } = props);
  }

  // const {restartSpinnerTimer, clearSpinnerTimer, isActiveSpinnerTimer} =
  //   useData();

  const [code, setValue] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [timerValue, setTimerValue] = React.useState(60);
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [_, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setValue,
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const cellStyles = {
    color: colors.primaryText,
    backgroundColor: dark ? '#2F3135' : '#fff',
    borderColor: 'white',
    shadowColor: dark ? 'transparent' : '#595959',
    overflow: 'hidden',
  };

  const navigation = useNavigation();
  const {setProfile, setAuthStatus} = useAuth();
  const {debounce} = useDebounce();

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimerValue(lastTimerValue => {
        lastTimerValue <= 1 && clearInterval(interval);
        if (lastTimerValue <= 1) {
          setIsButtonDisabled(false);
        }
        return lastTimerValue - 1;
      });
    }, 1000); // each count lasts for a second
    // cleanup the interval on complete
    return () => clearInterval(interval);
  }, [isButtonDisabled]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerStyle: [
        myStyles.headerStyle,
        {
          backgroundColor: dark ? '#2F3135' : 'white',
          shadowColor: dark ? 'transparent' : '#595959',
        },
      ],
      headerLeft: () => (
        <View style={{left: 20}}>
          <TouchableOpacity onPress={() => debounce(() => navigation.goBack())}>
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={arrowIconLeft}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitle:
        phoneOrEmail === 'Phone'
          ? 'Verify your phone number'
          : 'Verify your email',
      headerTitleStyle: {color: 'white'},
    });
  }, [colors.primaryText, dark, navigation, phoneOrEmail]);

  const renderCell = ({index, symbol, isFocused}) => {
    return (
      <AnimatedText
        key={index}
        style={[myStyles.cell, cellStyles]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  const onChangePincodeField = text => {
    setValue(text.replace(/[^0-9]/g, ''));
  };

  const handleConfirmCode = async () => {
    try {
      if (code && code.length === 6) {
        let profile, data, error, token, id, d1, d2;

        // restartSpinnerTimer();
        // setSpinnerActive(true);
        setButtonDisabled(true);

        console.log('code is ', code, email, phoneOrEmail);

        if (phoneOrEmail === 'Phone') {
          ({error, data} = await supabase.auth.verifyOtp({
            phone: formattedPhoneNumber,
            token: code,
            type: 'sms',
          }));

          if ('refresh_token' in data.session) {
            id = data.session.user.id;
            console.log('data.session.id is ', data.session.id, data.session);
          }
        } else {
          ({data: d1, error} = await supabase.auth.verifyOtp({
            email,
            token: code,
            type: 'magiclink',
          }));

          if (error) {
            ({data: d2, error} = await supabase.auth.verifyOtp({
              email,
              token: code,
              type: 'signup',
            }));

            if (error) {
              throw error;
            }
          }

          if (d1.session && 'refresh_token' in d1.session) {
            token = d1.session.refresh_token;
            id = d1.session.user.id;
          } else if (d2.session && 'refresh_token' in d2.session) {
            token = d2.session.refresh_token;
            id = d2.session.user.id;
          }

          const {data, error: sessionError} =
            await supabase.auth.refreshSession({
              refresh_token: token,
            }); // This call is needed to log the user in. Wasn't well documented in supabase v2, but discord had the solution.

          if (sessionError) {
            throw sessionError;
          }

          console.log('data,error are', data, sessionError);
        }

        // must fetch profile because only profiles table has 'username' which is needed to check for profile completion.
        // will throw error if there is a failure to create/retrieve profile.
        profile = await createOrGetProfile(
          phoneOrEmail === 'Phone' ? 'phone' : 'email',
          phoneOrEmail === 'Phone' ? formattedPhoneNumber : email,
          id,
        ); // will throw error if there is a failure to create/retrieve profile.
        // const updatedProfile = await setOneSignalPlayerId(profile);
        setProfile(profile); // Set the profile in AuthContext
        setAuthStatus('SIGNED_IN');

        await sleep(1000);

        // clearSpinnerTimer();
        // setSpinnerActive(false);
        setButtonDisabled(false);

        debounce(() => {
          navigation.navigate('CreateUsernameScreen')
        });
      } else {
        Alert.alert('Improperly formatted code entered. Please try again.');
      }
    } catch (error) {
      console.error('Error in ConfirmCodeScreen. It is ', error);
      // isActiveSpinnerTimer ? clearSpinnerTimer() : null;
      // spinnerActive ? setSpinnerActive(false) : null;

      setTimeout(() => {
        if (error?.name === 'AuthApiError') {
          Alert.alert('Invalid code entered. Please try again.');
        } else {
          Alert.alert('Some error occurred. Please try again later.');
        }
      }, 0);
      setButtonDisabled(false);
    }
  };

  const handleResendCode = async () => {
    setIsButtonDisabled(true);
    setTimerValue(60);
    let {user, error} = await supabase.auth.signInWithOtp({
      phone: formattedPhoneNumber,
    });
    console.log('resending where values are ', user, error)
  };

  const handleResendLink = async () => {
    setIsButtonDisabled(true);
    setTimerValue(60);
    const {user, error} = await supabase.auth.signInWithOtp({
      email: email,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/Background1.jpg')}
      style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
        <View style={myStyles.contentContainer}>
            <Text
                style={[
                  myStyles.text,
                  {
                    color: 'white',
                  },
                ]}>
              Enter the code below that we sent to:
            </Text>
            <Text
                style={[
                  myStyles.text,
                  {
                    color: dark ? '#fff' : 'rgb(79,79,79)',
                    fontWeight: '700',
                  },
                ]}>
              {formattedPhoneNumber}
            </Text>
          <View style={myStyles.phoneBlockContainer}>
            <CodeField
              rootStyle={myStyles.codeFieldContainer}
              ref={ref}
              value={code}
              onChangeText={onChangePincodeField}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
            />
            <TouchableOpacity
              disabled={isButtonDisabled}
              onPress={handleResendLink}>
              <Text style={myStyles.resendCodeContainer}>
                {isButtonDisabled
                  ? `Resend code in ${timerValue}`
                  : 'Press here to resend code'}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 15,
                width: screenWidth - 45,
              }}>
              <BlurButton
                title={'Confirm Code'}
                onPress={handleConfirmCode}
                disabled={buttonDisabled}
              />
            </View>
          </View>
      </View>
    </ImageBackground>
  );
};

export default ConfirmPhoneCodeScreen;

const myStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 65,
    paddingBottom: 30,
  },
  headerStyle: {
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },
  text: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
    textAlign: 'center',
    letterSpacing: 0.32,
  },
  logoContainer: {
    marginBottom: 10,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Centers children vertically in the container
    alignItems: 'center',     // Centers children horizontally
    width: screenWidth - 30,  // Adjust width as needed
    paddingHorizontal: 15,    // Add some padding if needed
  },
  codeFieldContainer: {
    width: screenWidth * 0.8,
    maxWidth: 310,
  },
  phoneBlockContainer: {
    marginTop: 20,
    alignItems: 'center',
    minHeight: 150,
    justifyContent: 'space-between',
  },
  continueButton: {
    borderRadius: 8,
    backgroundColor: 'rgb(158, 0, 254)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    width: screenWidth - 45,
    alignSelf: 'center',
  },
  continueButtonText: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
    fontWeight: '500',
  },
  resendCodeContainer: {
    textDecorationLine: 'underline',
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(15, 15),
    fontWeight: '500',
    letterSpacing: -0.3,
    color: 'rgb(79,79,79)',
  },
  codeFieldRoot: {
    height: CELL_HEIGHT,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderRadius: 50,
  },
  cell: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: CELL_HEIGHT,
    width: CELL_WIDTH,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        lineHeight: 46,
      },
    }),
    borderRadius: 20,
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(28, 28),
    fontWeight: '600',

    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },

  root: {
    minHeight: 800,
    padding: 20,
    borderRadius: 50,
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
    borderRadius: 50,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject, // This ensures the overlay takes the full space of the ImageBackground
    backgroundColor: '#F2F6FF',
    opacity: 0.5,
  },
});
