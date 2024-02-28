import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';
import {Switch, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useTheme} from '@react-navigation/native';
import DottedLine from '../../assets/images/svg/javascript_svgs/DottedLine.js';
import arrowIcon from '../../assets/images/png/arrow-icon-right/arrow-icon-right.png';
import closeX from '../../assets/images/png/close-x/close-x.png';
import {adaptiveFont, getFontFamily} from '../../shared/utils';
import AntDesign from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons';

const {width: screenWidth} = Dimensions.get('screen');
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Fixme tgorer: implement.
const ChannelSettings = props => {
  const {colors, dark} = useTheme();
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {deleteChannelScreen} = props.route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Channel Settings',
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

  const AccountBlockSettingData = {
    showTitle: true,
    title: '',
    data: [
      {
        title: 'Mute <insert-sever-name-here>',
        callback: handleClickLogInOrLogOut,
      },
    ],
  };

  const AccountBlockSettingDataTwo = {
    showTitle: true,
    title: 'Notification Settings',
    data: [
      {
        title: 'Default Server Settings',
        callback: handleClickLogInOrLogOut,
      },
      {
        title: 'All Messages',
        callback: async () => {},
      },
      {
        title: 'Only @mentions',
        callback: () => {},
      },
    ],
  };

  const renderDeleteChannelSettings = (title, index) => {
    if (index === 0) {
      return (
        <View style={styles.mainItemsBlockContainer}>
          <Text style={styles.itemsTitle}>{title}</Text>

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Channel Name"
            onChangeText={text => {}}
            style={{
              marginTop: 10,
              fontFamily:
                Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
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
            }}
            placeholderTextColor={dark ? '#8F8D8A' : 'rgb(79,79,79)'}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.mainItemsBlockContainer, {marginBottom: 30}]}>
          {index !== 0 ? <Text style={styles.itemsTitle}>{title}</Text> : null}
          <View
            style={[
              styles.itemsContainer,
              {
                borderColor: dark ? '#4B4B4B' : 'rgb(198, 195, 193)',
                backgroundColor: dark ? '#2F3135' : 'white',
                shadowColor: dark ? 'transparent' : '#595959',
              },
            ]}>
            <View style={styles.itemMainContainer}>
              <TouchableOpacity style={styles.itemContainer} onPress={() => {}}>
                <Text style={[styles.itemText, {color: 'black'}]}>{title}</Text>

                <Switch />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };

  const renderChannelNotificationSettings = (
    {title, showTitle, data},
    index,
  ) => {
    return (
      <View style={styles.mainItemsBlockContainer}>
        {index !== 0 ? <Text style={styles.itemsTitle}>{title}</Text> : null}
        <View
          style={[
            styles.itemsContainer,
            {
              borderColor: dark ? '#4B4B4B' : 'rgb(198, 195, 193)',
              backgroundColor: dark ? '#2F3135' : 'white',
              shadowColor: dark ? 'transparent' : '#595959',
            },
          ]}>
          {data.map(({title, callback}, secondIndex) => (
            <View style={styles.itemMainContainer}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  setSelectedIndex(secondIndex);
                }}>
                <Text style={[styles.itemText, {color: 'black'}]}>{title}</Text>

                {index === 0 ? (
                  <Switch />
                ) : selectedIndex === secondIndex ? (
                  <AntDesign name="checkcircle" size={24} color="black" />
                ) : (
                  <FontAwesome5 name="circle" size={24} color="black" />
                )}
              </TouchableOpacity>
              {secondIndex !== data.length - 1 && (
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
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: dark ? '#202224' : 'rgb(255, 255, 255)',
        },
      ]}>
      {deleteChannelScreen ? (
        <>
          {renderDeleteChannelSettings('Channel Name', 0)}
          {renderDeleteChannelSettings('Channel Permissions', 1)}
          <Button title={'Delete Channel'} />
        </>
      ) : (
        <>
          {renderChannelNotificationSettings(AccountBlockSettingData, 0)}
          {renderChannelNotificationSettings(AccountBlockSettingDataTwo, 1)}
        </>
      )}
    </ScrollView>
  );
};

export default ChannelSettings;

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
  dottedLineContainer: {
    position: 'absolute',
    bottom: -20,
  },
});
