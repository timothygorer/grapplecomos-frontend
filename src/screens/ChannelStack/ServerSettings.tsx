import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FinalLinedaddyText from '../../assets/images/svg/javascript_svgs/FinalLinedaddyText';
import LD from '../../assets/images/svg/javascript_svgs/LD';
import arrowIcon from '../../assets/images/png/arrow-icon-right/arrow-icon-right.png';
import DottedLine from '../../assets/images/svg/javascript_svgs/DottedLine.js';
import {adaptiveFont, getFontFamily} from '../../shared/utils';
import closeX from '../../assets/images/png/close-x/close-x.png';
import {useChatContext} from 'stream-chat-expo';
import {useAuth} from '../../shared/utils/AuthContext';
import {supabase} from '../../services/supabaseClient.js';
import {API, graphqlOperation} from 'aws-amplify';
import {openGallery} from '../../services/camera/camera.js';

const {width: screenWidth} = Dimensions.get('screen');
const unique = arr => [...new Set(arr)];

const ServerSettings = () => {
  const {
    servers,
    selectedServerIndex,
    setSelectedServerIndex,
    channels,
    setProfile,
    profile,
  } = useAuth();
  const {client} = useChatContext();
  const navigation = useNavigation();
  const [showPage2, setShowPage2] = useState(false);
  const [showPage3, setShowPage3] = useState(false);
  const [showNotificationsPage, setShowNotificationsPage] = useState(false);
  const server = servers[selectedServerIndex];
  const [admins, setAdmins] = useState([]);
  const dark = false;
  const [selectedIndex, setSelectedIndex] = useState({
    'Server Visibility': 0,
    'Permission to Use @everyone': 0,
    'Default Notification Settings': 0,
  });
  const [avatarPhotoPath, setAvatarPhotoPath] = useState('');
  const [headerPhotoPath, setHeaderPhotoPath] = useState('');

  useEffect(() => {
    (async () => {
      const serverName = server.name;
      const privateFilters = {
        type: 'team',
        serverName: {$in: [serverName]},
      };
      const channels = await client.queryChannels(privateFilters);
      const allAdmins = [];

      await Promise.all(
        channels.map(async (channel, index) => {
          const members = await channel.queryMembers({channel_role: 'admin'});
          const memberNames = members.members.map(item => ({
            title: item?.user?.name,
          }));
          allAdmins.push(...memberNames); // This will spread the members and push them into allMembers array
        }),
      );
      console.log(allAdmins);
      setAdmins(unique(allAdmins));
    })();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Server Settings',
      headerTintColor: 'black',
      headerStyle: [
        styles.headerStyle,
        {
          backgroundColor: dark ? '#2F3135' : 'white',
          shadowColor: dark ? 'transparent' : '#595959',
        },
      ],
      headerLeft: () =>
        showPage2 || showPage3 || showNotificationsPage ? (
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => {
              if (showPage2) {
                setShowPage2(false);
              } else if (showPage3) {
                setShowPage3(false);
                setShowPage2(true);
              } else {
                setShowNotificationsPage(false);
              }
            }}
          />
        ) : null,
      headerRight: () =>
        showPage2 || showPage3 || showNotificationsPage ? null : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={closeX}
            />
          </TouchableOpacity>
        ),
    });
  }, [navigation, showPage2, showPage3, showNotificationsPage]);

  const ItemBlock = ({title, showTitle, data, indexName}) => {
    return (
      <View style={styles.mainItemsBlockContainer}>
        <Text style={styles.itemsTitle}>{indexName}</Text>
        <View
          style={[
            styles.itemsContainer,
            {
              borderColor: 'rgb(198, 195, 193)',
              backgroundColor: 'white',
              shadowColor: '#595959',
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
                    color={'#E5E5E5'}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  };

  const Page3A = () => {
    return (
      <View
        style={{width: screenWidth - 40, alignSelf: 'center', paddingTop: 20}}>
        <Text style={styles.itemsTitle}>Name</Text>
        <TextInput
          // multiline={true}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Server Name"
          value={showPage2}
          onChangeText={text => {}}
          style={{
            marginVertical: 12.5,
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
        <Text style={[styles.itemsTitle, {marginTop: 20}]}>Name</Text>

        <TextInput
          multiline={true}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Description"
          value={showPage2}
          onChangeText={text => {}}
          style={{
            height: 75,
            marginVertical: 12.5,
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
  };

  const Page3B = ({data, indexName}) => {
    return (
      <View style={styles.mainItemsBlockContainer}>
        <Text style={styles.itemsTitle}>{indexName}</Text>
        <View
          style={[
            styles.itemsContainer,
            {
              borderColor: 'rgb(198, 195, 193)',
              backgroundColor: 'white',
              shadowColor: '#595959',
            },
          ]}>
          {data.map((title, index) => (
            <View style={styles.itemMainContainer}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  setSelectedIndex(selectedIndex => ({
                    ...selectedIndex,
                    [indexName]: index,
                  }));
                }}>
                <Text style={[styles.itemText, {color: 'black'}]}>{title}</Text>
                {selectedIndex[indexName] === index ? (
                  <AntDesign name="checkcircle" size={24} color="black" />
                ) : (
                  <FontAwesome5 name="circle" size={24} color="black" />
                )}
              </TouchableOpacity>
              {index !== data.length - 1 && (
                <View style={styles.dottedLineContainer}>
                  <DottedLine
                    width={screenWidth - 70}
                    height={2}
                    color={'#E5E5E5'}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  };

  const NotificationsPage = ({data, indexName}) => {
    return (
      <View style={styles.mainItemsBlockContainer}>
        <Text style={styles.itemsTitle}>{indexName}</Text>
        <View
          style={[
            styles.itemsContainer,
            {
              borderColor: 'rgb(198, 195, 193)',
              backgroundColor: 'white',
              shadowColor: '#595959',
            },
          ]}>
          {data.map((title, index) => (
            <View style={styles.itemMainContainer}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  setSelectedIndex(selectedIndex => ({
                    ...selectedIndex,
                    [indexName]: index,
                  }));
                }}>
                <Text style={[styles.itemText, {color: 'black'}]}>{title}</Text>
                {selectedIndex[indexName] === index ? (
                  <AntDesign name="checkcircle" size={24} color="black" />
                ) : (
                  <FontAwesome5 name="circle" size={24} color="black" />
                )}
              </TouchableOpacity>
              {index !== data.length - 1 && (
                <View style={styles.dottedLineContainer}>
                  <DottedLine
                    width={screenWidth - 70}
                    height={2}
                    color={'#E5E5E5'}
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {!showPage2 && !showNotificationsPage ? (
        <>
          <View style={styles.backgroundContainer}>
            <Image
              source={{
                uri: `${profile}?${new Date()}`,
              }}
              style={styles.background}
            />
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.defaultAvatarContainer}>
                <Image
                  source={{
                    uri: `${profile}?${new Date()}`,
                  }}
                  style={{width: 68, height: 68}}
                />
              </View>
              {showPage3 ? (
                <TouchableOpacity
                  onPress={async () => {
                    const imagePath = await openGallery('', '', setProfile);
                    console.log('ip', imagePath);
                    setAvatarPhotoPath(imagePath);
                  }}>
                  <Text style={{paddingLeft: 10, paddingBottom: 3}}>
                    Edit Iconnn
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {showPage3 ? (
              <TouchableOpacity
                onPress={async () => {
                  const imagePath = await openGallery('', '', setProfile);
                  console.log('ip', imagePath);
                  setHeaderPhotoPath(imagePath);
                }}>
                <Text
                  style={{
                    paddingRight: 10,
                    paddingBottom: 3,
                    alignSelf: 'flex-end',
                  }}>
                  Edit Cover Photo
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </>
      ) : null}

      {showPage2 ? (
        <>
          <ItemBlock
            data={[
              {
                title: 'General',
                callback: () => {
                  setShowPage2(false);
                  setShowPage3(true);
                },
              },
              {
                title: 'Channels',
                callback: () => {
                  navigation.navigate('EditChannelsScreen');
                },
              },
              {
                title: 'Links',
                callback: () => {
                  navigation.navigate('MembersScreen');
                },
              },
            ]}
            indexName={'Settings'}
          />
          <ItemBlock
            data={[
              {
                title: 'All Members',
                callback: () => {
                  setShowPage2(true);
                },
              },
              {
                title: 'Admins',
                callback: () => {},
              },
              {
                title: 'Mods',
                callback: () => {
                  navigation.navigate('MembersScreen');
                },
              },
              {
                title: 'Private Access',
                callback: () => {},
              },
              {
                title: 'Banned Users',
                callback: () => {},
              },
              {
                title: 'Share Invite Link',
                callback: () => {},
              },
            ]}
            indexName="Manage Members"
          />
        </>
      ) : showPage3 ? (
        <>
          {<Page3A />}

          {
            <Page3B
              data={['Public', 'Private']}
              indexName={'Server Visibility'}
            />
          }
          {
            <Page3B
              data={['All Members', 'Only Admins']}
              indexName={'Permission to Use @everyone'}
            />
          }
          {
            <Page3B
              data={['All messages', 'Only @mentions']}
              indexName={'Default Notification Settings'}
            />
          }
          <View style={{marginBottom: 40}}>
            <Button
              title={'Delete Server'}
              onPress={async () => {
                const result = await supabase
                  .from('servers')
                  .delete()
                  .eq('name', server?.name);
                console.log('result is', result);
              }}
            />
          </View>
        </>
      ) : showNotificationsPage ? (
        <>
          <NotificationsPage
            data={['All messages', 'Only @mentions', 'No messages']}
            indexName={'Receive Notifications for'}
          />
          <NotificationsPage
            data={['@everyone from Admins', '@everyone from Non-Admins']}
            indexName={'Include'}
          />
          <NotificationsPage
            data={['Reactions to my messages']}
            indexName={'Reaction Notifications'}
          />
          <NotificationsPage
            data={['']}
            indexName={'Channel Rule Exceptions'}
          />
        </>
      ) : (
        <>
          <ItemBlock
            data={[
              {
                title: 'Server Settings',
                callback: () => {
                  setShowPage2(true);
                },
              },
              {
                title: 'Notifications',
                callback: () => {
                  setShowNotificationsPage(true);
                },
              },
              {
                title: 'View Members',
                callback: () => {
                  navigation.navigate('MembersScreen');
                },
              },
              {
                title: 'Invite Friends',
                callback: () => {},
              },
            ]}
            indexName={'Settings'}
          />
          <ItemBlock data={admins} indexName={'Admins'} />
        </>
      )}
    </ScrollView>
  );
};

export default ServerSettings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
  },
  backgroundContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFF',
  },
  background: {
    height: 120,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -42,
    marginStart: 16,
  },
  defaultAvatarContainer: {
    zIndex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 68,
    width: 68,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderRadius: 50,
    borderColor: '#FFF',
    overflow: 'hidden',
  },
  mainItemsBlockContainer: {
    width: screenWidth - 40,
    alignSelf: 'center',
    marginVertical: 12.5,
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
