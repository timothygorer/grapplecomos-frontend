import React, {useLayoutEffect, useState} from 'react';
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
import {updateUsername, usernameBelongsToSelf, usernameExists} from "../../services/user/user";

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const CreateUsernameScreen = props => {
    const navigation = useNavigation();
    const {profile, signOut, setProfile} = useAuth();
    const [username, setUsername] = useState('')
    const [isNotAvailable, setIsNotAvailable] = useState(false);
    const {debounce} = useDebounce(); // 500ms debounce time

    const checkUsername = async text => {
        setUsername(text);
        let result = validateUsername(text);

        if (
            result &&
            text.length >= 5 &&
            text.length <= 20
        ) {
            let usernameTaken = await usernameExists(text);

            console.log("P is ", profile)
            const belongsToSelf = await usernameBelongsToSelf(
                profile['username'],
                text,
            );
            console.log('taken ', usernameTaken, 'belongs to self: ', belongsToSelf);

            if (!usernameTaken || belongsToSelf) {
                setIsNotAvailable(false);
            } else {
                setIsNotAvailable(true);
            }
        } else {
            setIsNotAvailable(false);
        }
    };

    const validateUsername = username => {
        // only alphanumeric characters
        var regex = /^([A-Za-z]|[0-9])+$/;
        return regex.test(username);
    };

    return (
        <ImageBackground
            source={require('../../assets/Background1.jpg')}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <NavigationBar
                isModal={false}
                title={'Choose Username'}
                titleFontSize={18}
                leftButton={() => (
                    <BlurIconButton
                        iconType={'Ionicons'}
                        name={'arrow-back'}
                        size={18}
                        onPress={() => navigation.goBack()}
                    />
                )}
            />
            <KeyboardAwareScrollView
                extraHeight={screenHeight / 4}
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 100}}>
                <View style={[styles.contentContainer]}>
                    <Text style={styles.instructionsText}>
                        Enter your desired username
                    </Text>
                    {/*<View style={styles.textInputContainer}>*/}
                    {/*  <CustomButton text={'Choose photo'} />*/}
                    {/*</View>*/}
                    <View style={styles.textInputContainer}>
                        <CustomTextInput
                            iconType={'MaterialCommunityIcons'}
                            iconName={'format-letter-case'}
                            placeholderText={'Username'}
                            disabled={false}
                            value={username}
                            onChangeText={(text) => {
                                debounce(checkUsername(text))
                            }}
                        />
                    </View>
                    {isNotAvailable && (
                        <Text style={{color: 'red'}}>
                            Username is already taken
                        </Text>
                    )}
                    {!isNotAvailable && username.length >= 5 &&
                        username.length <= 20 && <View style={styles.textInputContainer}>
                            <BlurButton title={'Continue'} onPress={async () => {
                                if (username.length < 6 || username.length > 21) {
                                    Alert.alert(
                                        'Username must be at between 5 and 20 characters long.',
                                    );
                                } else {
                                    try {
                                        // console.log('setSpinnerActive is ', setSpinnerActive);
                                        // restartSpinnerTimer();
                                        // setSpinnerActive(true);

                                        if (!profile) {
                                            throw new Error(
                                                'Somehow the profile fetched from getProfile is null/undefined.',
                                            );
                                        }

                                        let usernameTaken = await usernameExists(username);
                                        console.log('taken ', usernameTaken);

                                        const belongsToSelf = await usernameBelongsToSelf(
                                            profile['username'],
                                            username,
                                        );

                                        if (!usernameTaken || belongsToSelf) {
                                            const updatedProfile = await updateUsername(
                                                profile['id'],
                                                username,
                                            ); // throws error if issue occurs with args passed or supabase
                                            setProfile(updatedProfile);
                                            // setSpinnerActive(false);
                                            // clearSpinnerTimer();

                                            navigation.navigate('NewsfeedScreen')
                                        } else {
                                            // spinnerActive ? setSpinnerActive(false) : null;
                                            // clearSpinnerTimer();

                                            setTimeout(
                                                () =>
                                                    Alert.alert(
                                                        'Username already taken. Please choose a different one.',
                                                    ),
                                                0,
                                            );
                                        }
                                    } catch (error) {
                                        console.error('Error occurred setting username: ', error);
                                        // spinnerActive ? setSpinnerActive(false) : null;
                                        // isActiveSpinnerTimer ? clearSpinnerTimer() : null;
                                        setTimeout(
                                            () =>
                                                Alert.alert(
                                                    'Error occurred setting username. Please try again later.',
                                                ),
                                            0,
                                        );
                                    }
                                }
                            }}/>
                        </View>}
                    {/*<View style={styles.textInputContainer}>*/}
                    {/*  <BlurButton*/}
                    {/*    title={'Log Out'}*/}
                    {/*    onPress={async () => {*/}
                    {/*      signOut();*/}
                    {/*      navigation.navigate('HomeScreen');*/}
                    {/*    }}*/}
                    {/*  />*/}
                    {/*</View>*/}
                    {/*<View style={styles.textInputContainer}>*/}
                    {/*  <BlurButton*/}
                    {/*    title={'Delete Account'}*/}
                    {/*    onPress={async () => {*/}
                    {/*      if (profile) {*/}
                    {/*        const {data, error} = await supabase*/}
                    {/*          .from('profiles')*/}
                    {/*          .delete()*/}
                    {/*          .eq('id', profile.id);*/}
                    {/*        if (!error) {*/}
                    {/*          Alert.alert('Account deleted successfully.');*/}
                    {/*          navigation.navigate('HomeScreen');*/}
                    {/*        }*/}
                    {/*      }*/}
                    {/*    }}*/}
                    {/*  />*/}
                    {/*</View>*/}
                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    );
};

export default CreateUsernameScreen;

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
