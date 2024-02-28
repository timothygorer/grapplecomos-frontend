import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as Font from 'expo-font';
import {
  Alert,
  ColorSchemeName,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';
import {INavigation, RefLinkModal} from './interface';
import {useNavigation, useTheme} from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons';
import ArrowLeft from '../../../assets/images/svg/javascript_svgs/ArrowLeft.js';
import {useAuth} from '../../../shared/utils/AuthContext.js';
import {getChapterContent} from '../../../shared/utils/games.js';
import Markdown, {MarkdownIt} from '@cosmicmedia/react-native-markdown-display';
import GlassButton from '../../../components/Home/GlassButton';
import * as Device from 'expo-device';
import InstructionalInfoCard from './InstructionalInfoCard';
import {useHeaderHeight} from '@react-navigation/elements';
import {updateSavedNotes} from '../../../services/user/user';
import BlurIconButton from '../../../components/Home/BlurIconButton';
import {supabase} from '../../../services/supabaseClient';
import {useDebounce} from '../../../hooks/useDebounce';
import blockEmbedPlugin from 'markdown-it-block-embed';
import SectionRow from '../../../components/Home/SectionRow';
import LoggedOutCard from './LoggedOutCard';
import {
  InterruptionModeAndroid,
  InterruptionModeIOS,
  Video,
  Audio,
} from 'expo-av';
import Slider from '@react-native-community/slider';
import MediaView from '../../../common/components/MediaView';

const markdownItInstance = MarkdownIt({typographer: true}).use(
  blockEmbedPlugin,
  {
    containerClassName: 'video-embed',
  },
);

interface IProps {
  navigation: INavigation;
  theme?: ColorSchemeName;
}

function createContentStyle(theme: ColorSchemeName) {
  // Can be selected for more situations (cssText or contentCSSText).
  const contentStyle = {
    // backgroundColor: '#2e3847',
    // color: '#fff',
    caretColor: 'red', // initial valid// initial valid
    placeholderColor: 'gray',
    // cssText: '#editor {background-color: #f3f3f3}', // initial valid
    contentCSSText: 'font-size: 16px; min-height: 200px;', // initial valid
  };
  if (theme === 'light') {
    // contentStyle.backgroundColor = '#fff';
    // contentStyle.color = '#000033';
    contentStyle.placeholderColor = '#a9a9a9';
  }
  return contentStyle;
}

// const Icon = ({module, width, height}) => {
//   Asset.fromModule(module).downloadAsync();
//   return {module, width, height};
// };

const PlaylistItem = ({name, uri, isVideo}) => {
  return {name, uri, isVideo};
};

const PLAYLIST = [
  PlaylistItem({
    name: 'Big Buck Bunny',
    uri: 'https://mediacdn.cincopa.com/v2/1099353/11825!ZxjFAAAAAAAiQB/6/NewWaveJiu-JitsuOpenGuardVolume2byJohnDanaher2.mp4.mp4',
    isVideo: true,
  }),
];

const ICON_THROUGH_EARPIECE = 'speaker-phone';
const ICON_THROUGH_SPEAKER = 'speaker';

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const DISABLED_OPACITY = 0.5;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - 14 * 2;

const NotesScreen = props => {
  console.log('type is', Device.deviceType);
  const navigation = useNavigation();
  const {dark} = useTheme();
  const {raw_notes, chapter_title, chapter_time, volume_url} =
    props.route.params;
  console.log('propsrouteparams', props.route.params);
  const {profile, setProfile} = useAuth();
  let from;
  if ('from' in props.route.params) {
    ({from} = props.route.params);
  }
  const richText = useRef<RichEditor>(null);
  const linkModal = useRef<RefLinkModal>();
  const scrollRef = useRef<ScrollView>(null);
  // save on html
  const contentRef = useRef(null);
  const [content, setContent] = useState(null);

  const [emojiVisible, setEmojiVisible] = useState(false);
  const [disabled, setDisable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [move, setMove] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const headerHeight = useHeaderHeight();
  const {debounce} = useDebounce();
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Video state
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstancePosition, setPlaybackInstancePosition] = useState(0);
  const [playbackInstanceDuration, setPlaybackInstanceDuration] = useState(0);

  const handleVideoStatusUpdate = status => {
    if (status.isLoaded) {
      setPlaybackInstancePosition(status.positionMillis);
      setPlaybackInstanceDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);

      if (!isSeeking) {
        setSliderValue(status.positionMillis / status.durationMillis);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const handleSlidingStart = () => {
    setIsSeeking(true);
    if (isPlaying) {
      videoRef.current.pauseAsync();
    }
  };

  const handleSlidingComplete = async value => {
    const newPosition = value * playbackInstanceDuration;
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(newPosition);
      setIsSeeking(false);
      if (isPlaying) {
        videoRef.current.playAsync();
      }
    }
  };

  const copy = `
# Some header

@[youtube](u75QsVveW6g)
`;

  // this shows you the tree that is used by the react-native-markdown-display
  // const astTree = markdownItInstance.parse(copy, {});
  // console.log('ast is', astTree);

  //this contains the html that would be generated - not used by react-native-markdown-display but useful for reference
  // const html = markdownItInstance.render(copy);
  // console.log(html);

  useEffect(() => {
    (async () => {
      console.log('raw_notes is ', raw_notes);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      });
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: 'Chapter Screen',
      headerLeft: () => (
        <View style={{marginLeft: 12}}>
          <BlurIconButton
            iconType={'Ionicons'}
            name={'arrow-back'}
            size={18}
            onPress={() => {
              if (from === 'LikedSearchScreen') {
                navigation.navigate('LikedSearchScreen');
              } else {
                navigation.goBack();
              }
            }}
            color={'white'}
          />
        </View>
      ),
      // headerRight: () => (
      //   <View style={styles.headerLeftContainer}>
      //     <Pressable
      //       onPress={() => navigation.goBack()}
      //       style={stylesPressChangeHandler}>
      //       <ArrowLeft size={24} color={dark ? 'white' : 'black'} />
      //     </Pressable>
      //   </View>
      // ),
      headerTintColor: 'white',
      headerTitleAlign: 'center',
    });
  }, [dark, navigation, liked, profile, move]);

  function timeStringToMilliseconds(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }

  const entity = {
    text: 'HEY! I am interested in making the world a better place',
    pinned: false,
    time_created: '2023-12-01T08:00:00Z',
    message: 'This is a sample message.',
    title: 'Sample Title',
    mature: false,
    edited: '0',
    paywall: '',
    time_updated: '2023-12-01T10:30:00Z',
    supermind: {
      request_guid: 'supermind_guid_123',
      is_reply: true,
      receiver_user: {
        guid: 'user_guid_456',
        name: 'Receiver User',
      },
    },
    'is:following': true,
    'thumbs_down_count': 5,
    thumbs_up_count: 20,
    'comments:count': 15,
    thumbs_down_user_guids: ['user_guid_1', 'user_guid_2'],
    thumbs_up_user_guids: ['user_guid_3', 'user_guid_4'],
    seen: true,
    rowKey: 'row_key_123',
    boosted_guid: 'boosted_guid_789',
    description: 'Sample description.',
    containerObj: {
      guid: 'group_guid_123',
      name: 'Sample Group',
    },
    remind_object: {
      guid: 'remind_guid_456',
      message: 'Reminder message.',
    },
    thumbnails: {
      small: 'thumbnail_url_small',
      medium: 'thumbnail_url_medium',
      large: 'thumbnail_url_large',
    },
    paywall_unlocked: true,
    guid: 'activity_guid_789',
    entity_guid: 'entity_guid_789',
    owner_guid: 'owner_guid_123',
    custom_type: 'video',
    custom_data: [1, 2, 3],
    nsfw: [1, 2],
    flags: {
      mature: true,
      flag2: 'value2',
    },
    reminds: 10,
    quotes: 8,
    impressions: 100,
    perma_url: 'perma_url_sample',
    cinemr_guid: 'cinemr_guid_123',
    thumbnail_src: 'thumbnail_src_url',
    dontPin: false,
    boosted: true,
    wire_threshold: {
      type: 'money',
      min: 50,
      support_tier: 'tier_1',
    },
    _preview: true,
    attachments: {
      attachment_guid: 'attachment_guid_123',
      custom_data: {
        key1: 'value1',
        key2: 'value2',
      },
      custom_type: 'attachment_type_sample',
    },
    spam: false,
    type: 'object',
    remind_deleted: false,
    remind_users: [
      {
        guid: 'user_guid_101',
        name: 'User 1',
      },
      {
        guid: 'user_guid_102',
        name: 'User 2',
      },
    ],
    blurhash: 'blurhash_sample',
    blurb: 'Sample blurb.',
    container_guid: 'container_guid_123',
    tags: ['tag1', 'tag2'],
    goal_button_text: 'Goal Button Text',
    goal_button_url: 'https://example.com/goal',
    canonical_url: 'https://example.com/canonical',
  };
  const mediaRef = useRef(null);

  return (
    <>
      <ImageBackground
        source={require('../../../assets/Background8.jpg')}
        style={{flex: 1}}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.container(headerHeight)}
          stickyHeaderIndices={[0]}>
          <MediaView
            ref={mediaRef}
            entity={entity}
            is_notes={true}
            onPress={() => {}}
            autoHeight={true}
            // onVideoOverlayPress={
            //   this.props.maxContentHeight ? this.navToActivity : undefined
            // }
            video={{uri: volume_url}}
            onReadyForDisplay={() => {
              const startPositionInMillis =
                timeStringToMilliseconds(chapter_time);
              console.log(
                'start pos: ',
                startPositionInMillis,
                volume_url,
                chapter_title,
              );
              mediaRef.current.setPositionAsync(startPositionInMillis);
            }}
          />

          {raw_notes && (
            <View style={styles.markdownContainer}>
              <Markdown
                style={{
                  body: {color: 'white', fontSize: 16},
                  heading1: {color: 'white'},
                  code_block: {color: 'black', fontSize: 14},
                }}>
                {raw_notes}
              </Markdown>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: headerHeight => ({
    marginTop: headerHeight + 20,
  }),
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    width: 350,
    marginLeft: 20,
  },
  markdownContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'black',
  },
});
