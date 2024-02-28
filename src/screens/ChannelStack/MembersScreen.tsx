import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {Switch, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useTheme} from '@react-navigation/native';
import DottedLine from '../../assets/images/svg/javascript_svgs/DottedLine.js';
import arrowIcon from '../../assets/images/png/arrow-icon-right/arrow-icon-right.png';
import closeX from '../../assets/images/png/close-x/close-x.png';
import {adaptiveFont, getFontFamily} from '../../shared/utils';
import AntDesign from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons';
import {useChatContext} from 'stream-chat-expo';

const {width: screenWidth} = Dimensions.get('screen');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const unique = arr => [...new Set(arr)];

const MembersScreen = props => {
  const {client} = useChatContext();
  const {colors, dark} = useTheme();
  const navigation = useNavigation();
  const [members, setMembers] = useState(null);

  // Fetch all the users which belong to a given server.
  const fetchUsers = async () => {
    const serverName = 'testserver1';
    const privateFilters = {
      type: 'team',
      serverName: {$in: [serverName]},
    };
    const channels = await client.queryChannels(privateFilters);
    const allMembers = [];

    await Promise.all(
      channels.map(async (channel, index) => {
        const members = await channel.queryMembers({});
        const memberNames = members.members.map(item => item?.user?.name);
        console.log('members:', memberNames);
        allMembers.push(...memberNames); // This will spread the members and push them into allMembers array
      }),
    );
    setMembers({data: unique(allMembers)});
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'All Members',
      headerLeft: null,
      headerTintColor: 'white',
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

  const renderContent = ({title, showTitle, data}, index) => {
    if (index === 0) {
      return (
        <View style={styles.mainItemsBlockContainer}>
          {showTitle && <Text style={styles.itemsTitle}>{title}</Text>}

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search..."
            style={{
              marginTop: 25,
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
    } else if (index === 1) {
      return (
        <View style={styles.mainItemsBlockContainer}>
          <Text style={styles.itemsTitle}>Members</Text>
          <View
            style={[
              styles.itemsContainer,
              {
                borderColor: dark ? '#4B4B4B' : 'rgb(198, 195, 193)',
                backgroundColor: dark ? '#2F3135' : 'white',
                shadowColor: dark ? 'transparent' : '#595959',
              },
            ]}>
            {data.map((item, index) => (
              <View style={styles.itemMainContainer}>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {}}>
                  <Text style={[styles.itemText, {color: 'black'}]}>
                    {item}
                  </Text>
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
    } else {
      return (
        <View style={styles.mainItemsBlockContainer}>
          <Text style={styles.itemsTitle}>Channel Permissions</Text>
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
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {}}>
                  <Text style={[styles.itemText, {color: 'black'}]}>
                    {title}
                  </Text>
                  <Switch />
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
    }
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
      {renderContent(AppBlockSettingData, 0)}
      {renderContent(members ? members : {data: []}, 1)}
    </ScrollView>
  );
};

export default MembersScreen;

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
  itemText: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
  },
  dottedLineContainer: {
    position: 'absolute',
    bottom: -20,
  },
});
