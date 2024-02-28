import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {
  Channel,
  MessageList,
  MessageInput,
  ChannelList,
  useChatContext,
} from 'stream-chat-expo';
import {useAuth} from '../../shared/utils/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheetList from '../../components/general/BottomSheetList/BottomSheetList.js';
import {useSharedValue} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import arrowIcon from '../../assets/images/png/arrow-icon-right/arrow-icon-right.png';
import DottedLine from '../../assets/images/svg/javascript_svgs/DottedLine.js';
import {adaptiveFont, getFontFamily} from '../../shared/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SectionRow from "../../components/Home/SectionRow";

const {height, width} = Dimensions.get('screen');
const marketsBottomSheetSnapPoint = [height * 0.6];
const dark = true;
const {width: screenWidth} = Dimensions.get('screen');

const ChannelScreen = props => {
  const {
    channels,
    chatChannels,
    servers,
    selectedServerIndex,
    setSelectedServerIndex,
    fetchServers,
    profile,
  } = useAuth();
  const {client} = useChatContext();
  const [addServerPressed, setAddServerPressed] = useState(false);
  const [showChatsPressed, setShowChatsPressed] = useState(false);
  const navigation = useNavigation();
  const {userId} = useAuth();

  const privateFilters = {type: 'messaging', members: {$in: [userId]}};
  const publicFilters = {
    type: {$ne: 'messaging'},
    members: {$in: [userId]},
  };

  const ExploreServersData = {
    showTitle: true,
    title: 'Options',
    data: [
      {
        title: 'Explore Servers',
        callback: () => {
          navigation.navigate('DiscoverServersScreen');
        },
      },
    ],
    exploreServers: true,
  };

  const AppBlockSettingData = {
    showTitle: true,
    title: 'Options',
    data: [
      {
        title: 'Create a Server',
        callback: () => {
          navigation.navigate('ChannelSettingsStack', {
            screen: 'ServerPrivacyScreen',
          });
        },
      },
    ],
    exploreServers: false,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerBackground: () => (
      //   <LinearGradient
      //     colors={dark ? ['#240498', '#121212', '#121212'] : ['#fff', '#fff']}
      //     style={{flex: 1}}
      //     start={{x: 0.0, y: -0.5}}
      //     end={{x: 0.2, y: 3.3}}
      //   />
      // ),
      headerTransparent: true,
      headerStyle: {
        backgroundColor: '#0f0f0f',
        shadowColor: 'rgba(66, 70, 76, 0.2)',
        shadowOffset: {
          width: 0, // x
          height: 1, // y
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 5, // used only in android
      },

      title: null,
      headerTitleAlign: 'center',
    });
  }, [dark, navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchServers();
    }, []),
  );

  const AvatarItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        if (index === 0) {
          setAddServerPressed(true);
        } else if (index === 1) {
          navigation.navigate('JoinServerScreen', {serverName: 'fsff'});
        } else if (index === 3) {
          setShowChatsPressed(true);
        } else {
          setAddServerPressed(false);
          setSelectedServerIndex(index - 1);
        }
      }}>
      <View style={styles.avatarContainer}>
        {index === 1 ? (
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 30,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="message1" size={24} color="black" />
          </View>
        ) : index === 0 ? (
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 30,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="plus" size={24} color="black" />
          </View>
        ) : (
          <Image
            source={{
              uri: 'https://dummyimage.com/24x24/fff/aaa',
            }}
            style={styles.avatar}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  // const tabType = 'pregame';
  const bottomSheetRef = useRef(null);
  const animatedBottomSheetValue = useSharedValue(0);
  const onBottomSheetOpenHandler = ref => {
    console.log('snap.');
    ref.current.snapToIndex(0);
  };

  const renderServerButton = ({data, title, exploreServers}) => {
    return (
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
              onPress={item.callback}>
              <Text style={[styles.itemText, {color: 'black'}]}>
                {item.title}
              </Text>
              <Image style={styles.itemIcon} source={arrowIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const renderContent = ({data, title}) => (
    <View style={styles.mainItemsBlockContainer}>
      <Text style={[styles.itemsTitle, {paddingLeft: 10}]}>Channels</Text>
      <View
        style={[
          styles.itemsContainer,
          {
            borderColor: dark ? '#4B4B4B' : 'rgb(198, 195, 193)',
            backgroundColor: dark ? '#2F3135' : 'white',
            shadowColor: dark ? 'transparent' : '#595959',
          },
        ]}>
        {data.length === 0 ? (
          <>
            <View
              style={{
                padding: 10,
                paddingLeft: 0,
              }}>
              <Text style={{color: 'white'}}>No channels yet.</Text>
            </View>
            <View style={styles.itemMainContainer}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  navigation.navigate('ChannelSettingsStack', {
                    screen: 'NewChannel',
                  })
                }>
                <Text style={[styles.itemText, {color: 'black'}]}>
                  + Add Channel
                </Text>
                <Image style={styles.itemIcon} source={arrowIcon} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          data.map((channel, index) => (
            <View style={styles.itemMainContainer}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate('Chat', {channel})}>
                <Text style={[styles.itemText, {color: 'black'}]}>
                  {channel?.data?.cid}
                </Text>
                <Image style={styles.itemIcon} source={arrowIcon} />
              </TouchableOpacity>
              {index !== data.length - 1 && (
                <View style={styles.dottedLineContainer}>
                  <DottedLine
                    width={screenWidth - 140}
                    height={2}
                    color={dark ? 'rgb(170, 170, 170)' : '#E5E5E5'}
                  />
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );

  const renderChats = ({data, title}) => {
    return (
      <View style={styles.mainItemsBlockContainer}>
        <View
          style={[
            styles.itemsContainer,
            {
              borderColor: dark ? '#4B4B4B' : 'rgb(198, 195, 193)',
              backgroundColor: dark ? '#2F3135' : 'white',
              shadowColor: dark ? 'transparent' : '#595959',
            },
          ]}>
          {data.map((channel, index) => (
            <View style={styles.itemMainContainer}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate('Chat', {channel})}>
                <Text style={[styles.itemText, {color: 'black'}]}>
                  {channel?.data?.cid}
                </Text>
                <Image style={styles.itemIcon} source={arrowIcon} />
              </TouchableOpacity>
              {index !== data.length - 1 && (
                <View style={styles.dottedLineContainer}>
                  <DottedLine
                    width={screenWidth - 110}
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

  const renderHeader = ({data}) => (
    <View>
      <Image
        source={{
          uri: `${profile}?${new Date()}`,
        }}
        style={styles.background}
      />
      <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            // navigation.navigate('ChannelSettingsStack', {
            //   screen: 'ServerSettings',
            // });
            navigation.navigate('DiscoverServersScreen');
          }}>
          <Ionicons name="settings-outline" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFeaturedServers = (item, index) => {
    console.log('item', item);
    return (
        <React.Fragment key={index}>
          <SectionRow
              section={{
                move_title: item.move_title,
                id: item.move_id,
                move_raw_notes: item.move_raw_notes,
              }}
              onPress={async  () => {
              }}
              isFirstCard={index === 0}
              isLastCard={index === 4}
              width={'100%'}
          />
        </React.Fragment>
    );
  }

  return (
    <>
      <ImageBackground
        source={require('../../assets/Background1.jpg')}
        style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', flex: 1,marginTop:100}}>
        <FlatList
          bounces={true}
          data={[1, 2, 3, 4, 5]}
          renderItem={AvatarItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{width: 100}}
        />
        <ScrollView
          contentContainerStyle={[styles.mainContainer]}
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          {addServerPressed ? (
            <>
              {renderServerButton(ExploreServersData)}
              {renderServerButton(AppBlockSettingData)}
              <View style={{ paddingVertical:20}}>
              {[1,2,3,4,5].map((item,index) => renderFeaturedServers(item,index))}
              </View>
            </>
          ) : showChatsPressed ? (
            <>{renderChats(chatChannels ? chatChannels : {data: []})}</>
          ) : (
            <>
              {/*{renderHeader({data: []})}*/}
              {/*{renderContent(chatChannels ? chatChannels : {data: []})}*/}
              {renderContent(channels ? channels : {data: []})}
            </>
          )}
        </ScrollView>
      </View>
      <BottomSheetList
        data={[1, 2, 3, 4, 5]}
        snapPoints={marketsBottomSheetSnapPoint}
        animatedPosition={animatedBottomSheetValue}
        sheetRef={bottomSheetRef}
        title={'All markets'}
        // currentActiveIndex={index}
        // onChange={onChangeIndexHandler}
        isBottomTabsSheet={true}
      />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // This will make the image circular
  },
  mainItemsBlockContainer: {
    width: '100%',
  },
  mainContainer: {
    padding: 10,
    paddingBottom: 100,
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
    flex: 1,
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
  background: {
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  settingsButton: {
    top: 10,
    right: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChannelScreen;
