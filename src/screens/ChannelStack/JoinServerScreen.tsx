import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  TextInput,
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
import {supabase} from '../../services/supabaseClient.js';

const {height, width} = Dimensions.get('screen');
const marketsBottomSheetSnapPoint = [height * 0.6];
const dark = true;
const {width: screenWidth} = Dimensions.get('screen');

const JoinServerScreen = props => {
  const {servers, selectedServerIndex, setSelectedServerIndex, fetchServers} =
    useAuth();
  const {client} = useChatContext();
  const [addServerPressed, setAddServerPressed] = useState(false);
  const navigation = useNavigation();
  const {userId} = useAuth();
  const {serverName, s} = props.route.params;
  const [serverToJoin, setServerToJoin] = useState(null);
  const [channels, setChannels] = useState(null);

  const privateFilters = {type: 'messaging', members: {$in: [userId]}};
  const publicFilters = {
    type: {$ne: 'messaging'},
    members: {$in: [userId]},
  };

  const AppBlockSettingData = {
    showTitle: true,
    title: 'Options',
    data: [
      {
        title: '',
        callback: () => {},
      },
    ],
  };

  const fetchServer = async serverName => {
    console.log('fs.');
    try {
      console.log(serverName);
      const {data, error} = await supabase
        .from('servers')
        .select('*')
        .eq('name', serverName);
      console.log(data, error, 'result.');
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        console.log('jss');
        const server = await fetchServer(serverName);
        console.log('why not reached?');
        console.log('SERVER IS', server);
        if (server.length > 0) {
          setServerToJoin(server);
          const channelsToShow = await fetchChannels(serverName);
          console.log('cts channelsToShow', channelsToShow);
          if (channelsToShow) {
            setChannels({data: channelsToShow});
          }
        }
      })();
    }, [s]),
  );

  const fetchChannels = async serverName => {
    console.log('fetch.');
    const allChannels = await client.queryChannels({
      serverName: {$in: [serverName]},
    });
    return allChannels;
  };

  // const tabType = 'pregame';
  const bottomSheetRef = useRef(null);
  const animatedBottomSheetValue = useSharedValue(0);
  const onBottomSheetOpenHandler = ref => {
    console.log('snap.');
    ref.current.snapToIndex(0);
  };

  const renderJoinServerComponent = ({data, title}) => {
    return (
      <View style={styles.mainItemsBlockContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.itemsTitle, {paddingLeft: 10}]}>{title}</Text>
        </View>
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
                onPress={() =>
                  navigation.navigate('ChannelSettingsStack', {
                    screen: 'ServerPrivacyScreen',
                  })
                }>
                <Text style={[styles.itemText, {color: 'black'}]}>
                  {item.title}
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

  const renderContent = ({data, title}) => (
    <View style={styles.mainItemsBlockContainer}>
      <View
        style={[
          styles.itemsContainer,
          {
            borderColor: dark ? '#4B4B4B' : 'rgb(198, 195, 193)',
            backgroundColor: dark ? '#2F3135' : 'white',
            shadowColor: dark ? 'transparent' : '#595959',
            marginBottom: 20,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <TouchableOpacity
          onPress={onBottomSheetOpenHandler.bind(this, bottomSheetRef)}>
          <Text style={{color: 'white'}}>Invite friends</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.itemsContainer,
          {
            borderColor: dark ? '#4B4B4B' : 'rgb(198, 195, 193)',
            backgroundColor: dark ? '#2F3135' : 'white',
            shadowColor: dark ? 'transparent' : '#595959',
            marginBottom: 20,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <TouchableOpacity
          onPress={onBottomSheetOpenHandler.bind(this, bottomSheetRef)}>
          <Text style={{color: 'white'}}>Join Server +</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={text => setName(text)}
        style={{
          marginBottom: 10,
          fontFamily:
            Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
          fontSize: adaptiveFont(16, 16),
          fontWeight: '400',
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
          height: 100,
        }}
        placeholderTextColor={dark ? '#8F8D8A' : 'rgb(79,79,79)'}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.itemsTitle, {paddingLeft: 10}]}>{title}</Text>
      </View>

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
                onPress={() => navigation.navigate('NewChannel')}>
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
                    width={screenWidth - 50}
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

  const renderHeader = ({data}) => (
    <View>
      <Image
        source={{
          uri: 'https://media.istockphoto.com/id/1194212027/vector/a-vector-illustration-textured-black-colored-grungy-old-background-resembling-a-slate-rock.jpg?s=612x612&w=0&k=20&c=bnYb1yYXV1nQ53vtmsWTSBO-YnVScZiyKfKjoTIo9Jo=',
        }}
        style={styles.background}
      />
    </View>
  );

  return (
    <>
      <SafeAreaView
        style={{flexDirection: 'row', backgroundColor: 'black', flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.mainContainer}
          showsVerticalScrollIndicator={false}>
          {addServerPressed ? (
            renderJoinServerComponent(AppBlockSettingData)
          ) : (
            <>
              {renderHeader({data: []})}
              {renderContent(channels ? channels : {data: []})}
              {/*{renderContent(channels ? channels : { data: [] })}*/}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
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
    alignSelf: 'center',
    marginVertical: 12.5,
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

export default JoinServerScreen;
