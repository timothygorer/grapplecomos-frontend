import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
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
import {useAuth} from '../../shared/utils/AuthContext.js';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSharedValue} from 'react-native-reanimated';
import {useStreamChatTheme} from '../../hooks/useStreamChatTheme.js';
import {useTheme} from '@react-navigation/native';

const {height, width} = Dimensions.get('screen');
const marketsBottomSheetSnapPoint = [height * 0.6];

const ChatScreen = props => {
  const {dark, colors} = useTheme();
  const navigation = useNavigation();
  const [tab, setTab] = useState('private');
  const {userId} = useAuth();
  const {client} = useChatContext();
  const {channel} = props.route.params;
  const [selectedThread, setSelectedThread] = useState();
  const messageId = null;
  const chatStyle = useStreamChatTheme();
  console.log('cs', chatStyle);
  const {bottom} = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: dark ? '#0f0f0f' : colors.background,
        shadowColor: 'rgba(66, 70, 76, 0.2)',
        shadowOffset: {
          width: 0, // x
          height: 1, // y
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 5, // used only in android
      },
      // headerLeft: () => (
      //   <Ionicons
      //     name="arrow-back"
      //     size={24}
      //     color={dark ? 'white' : 'black'}
      //     onPress={() => navigation.goBack()}
      //   />
      // ),
      // headerRight: () => (
      //   <Ionicons
      //     name="settings-outline"
      //     size={24}
      //     color="white"
      //     onPress={() =>
      //       navigation.navigate('ChannelSettingsStack', {
      //         screen: 'ChannelSettingsScreen',
      //       })
      //     }
      //   />
      // ),
      title: 'Chats',
      headerTintColor: dark ? 'white' : 'black',
    });
  }, [colors, dark, navigation]);

  useFocusEffect(() => {
    setSelectedThread(undefined);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: dark ? 'black' : 'white',
        paddingBottom: bottom,
      }}>
      <Channel
        channel={channel}
        disableTypingIndicator
        enforceUniqueReaction
        initialScrollToFirstUnreadMessage
        keyboardVerticalOffset={Platform.OS === 'ios' ? -30 : -300}
        messageId={messageId}
        NetworkDownIndicator={() => null}
        thread={selectedThread}
        myMessageTheme={chatStyle}>
        <MessageList
          myMessageTheme={chatStyle}
          onThreadSelect={thread => {
            setSelectedThread(thread);
            console.log(thread);
            navigation.navigate('ThreadScreen', {
              channel,
              thread,
            });
          }}
        />
        <MessageInput />
      </Channel>
    </View>
  );
};

export default ChatScreen;
