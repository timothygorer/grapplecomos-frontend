import React from 'react';
import {
  View,
  Text,
  Platform,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useTheme} from '@react-navigation/native';
import DottedLine from '../../assets/images/svg/javascript_svgs/DottedLine.js';
import arrowIcon from '../../assets/images/png/arrow-icon-right/arrow-icon-right.png';
import closeX from '../../assets/images/png/close-x/close-x.png';
import {adaptiveFont, getFontFamily} from '../../shared/utils';

const {width: screenWidth} = Dimensions.get('screen');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const Settings = props => {
  const {colors, dark} = useTheme();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Settings',
      headerLeft: null,
      headerTintColor: 'black',
      headerStyle: [
        styles.headerStyle,
        {
          backgroundColor: dark ? '#2F3135' : 'white',
          shadowColor: dark ? 'transparent' : '#595959',
        },
      ],
      headerRight: () => (
        <View style={{right: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={closeX}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [dark, navigation]);

  const handleRestorePurchases = async () => {};

  const handleClickGetPremium = async () => {};

  const handleClickDarkMode = () => navigation.navigate('DarkModeScreen');

  const handleClickEditProfile = () => navigation.navigate('EditProfile');

  const handleClickLogInOrLogOut = async () => {};

  const AppBlockSettingData = {
    showTitle: true,
    title: 'App',
    data: [
      {
        title: 'Dark Mode',
        callback: handleClickDarkMode,
      },
      {
        title: 'Restore Purchases',
        callback: handleRestorePurchases,
      },
      {
        title: 'Help Center',
        callback: () => {},
      },
      {
        title: 'Terms Of Use',
        callback: () => {},
      },
      {
        title: 'Privacy',
        callback: () => {},
      },
      {
        title: 'Open Source Licenses',
        callback: () => {},
      },
    ],
  };

  const AccountBlockSettingData = {
    showTitle: true,
    title: 'Account',
    data: [
      {
        title: 'Log in',
        callback: handleClickLogInOrLogOut,
      },
      {
        title: 'Restart Onboarding',
        callback: async () => {},
      },
      {
        title: 'Delete Account',
        callback: () => {},
      },
    ],
  };

  const renderContent = ({title, showTitle, data}) => (
    <View style={styles.mainItemsBlockContainer}>
      {showTitle && <Text style={styles.itemsTitle}>{title}</Text>}
      <View
        style={[
          styles.itemsContainer,
          {
            borderColor: dark ? '#4B4B4B' : 'rgb(198, 195, 193)',
            backgroundColor: dark ? '#2F3135' : 'white',
            shadowColor: dark ? 'transparent' : '#595959',
          },
        ]}>
        {data.map(({title, callback}, index) => (
          <View style={styles.itemMainContainer}>
            <TouchableOpacity style={styles.itemContainer} onPress={callback}>
              <Text style={[styles.itemText, {color: 'black'}]}>{title}</Text>
              <Image style={styles.itemIcon} source={arrowIcon} />
            </TouchableOpacity>
            {index !== data.length - 1 && (
              <View style={styles.dottedLineContainer}>
                <DottedLine
                  width={screenWidth - 70}
                  height={2}
                  color={dark ? 'rgb(170, 170, 170)' : '#E5E5E5'}
                />
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: dark ? '#202224' : 'rgb(255, 255, 255)',
        },
      ]}>
      {renderContent(AppBlockSettingData)}
      {renderContent(AccountBlockSettingData)}
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainItemsBlockContainer: {
    width: screenWidth - 40,
    alignSelf: 'center',
    marginVertical: 12.5,
  },
  mainContainer: {
    flexGrow: 1,
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
  itemsContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    borderWidth: Platform.OS === 'ios' ? 0.5 : 1,
  },
  itemsTitle: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(13, 13),
    fontWeight: '700',
    color: 'rgb(151, 150, 148)',
    textTransform: 'uppercase',
  },
  itemMainContainer: {
    marginVertical: 20,
    position: 'relative',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemIcon: {
    width: 20,
    height: 20,
  },
  itemText: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
  },
  dottedLineContainer: {
    position: 'absolute',
    bottom: -20,
  },
});
