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
  ActivityIndicator,
  Image,
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
  const {move_id, vol = 1, move_title} = props.route.params;
  console.log('propsrouteparams', props.route.params, vol);
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

  const copy = `
# Some header

@[youtube](u75QsVveW6g)
`;

  useEffect(() => {
    (async () => {
      const {data, error} = await supabase
        .from('tile')
        .select('*, subtile (*, chapter (*))')
        .eq('move_id', move_id)
        .limit(1)
        .single();
      console.log('move is', data, error, profile?.saved_notes);
      setMove(data);
      setLiked(
        profile?.saved_notes?.map(n => n.move_title).includes(data?.move_title),
      );
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: 'Instructional Screen',
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
                navigation.navigate('HomeScreen');
              }
            }}
            color={'white'}
          />
        </View>
      ),
      headerRight: () => (
        <View style={{marginRight: 12}}>
          <BlurIconButton
            iconType={'AntDesign'}
            name={liked ? 'heart' : 'hearto'}
            size={18}
            onPress={() => {
              debounce(async () => {
                if (profile && move) {
                  const updatedProfile = await updateSavedNotes(
                    profile.id,
                    profile.saved_notes
                      ? liked
                        ? profile.saved_notes.filter(
                            n => move?.move_title !== n.move_title,
                          )
                        : [
                            ...profile.saved_notes,
                            {
                              ...move,
                            },
                          ]
                      : [
                          {
                            ...move,
                          },
                        ],
                  ); // throws error
                  setLiked(!liked);
                  setProfile(updatedProfile);
                } else {
                  navigation.navigate('LoginStack', {
                    screen: 'LoginWelcomeScreen',
                  });
                }
              });
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

  const renderItem = (item, index) => {
    return (
      <React.Fragment key={index}>
        <SectionRow
          section={{
            move_title: item.name,
            id: item.move_id,
          }}
          onPress={async () => {
            console.log('ok.', item, vol);

            navigation.push('NotesScreen2', {
              chapter_title: item.name,
              chapter_time: item.chapter_time,
              raw_notes: item.raw_notes,
              volume_url: move?.subtile[vol - 1]?.volume_url,
            });
          }}
          isFirstCard={index === 0}
          isLastCard={index === move?.subtile[vol - 1]?.chapter?.length - 1}
        />
      </React.Fragment>
    );
  };

  return (
    <>
      <ImageBackground source={require('../../../assets/Background8.jpg')}>
        {move ? (
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={
              move?.subtile[vol - 1]?.chapter.sort(
                (a, b) => a.chapter_number - b.chapter_number,
              ) ?? []
            }
            renderItem={({item, index}) => renderItem(item, index)}
            onEndReachedThreshold={0.001}
            ListHeaderComponent={() => {
              return (
                <View style={{marginBottom: 20}}>
                  <InstructionalInfoCard
                    section={{
                      name: move?.move_title,
                      author: move?.move_author,
                      categories: move?.move_categories,
                      index: 1,
                      vol,
                      numVolumes: move?.subtile.length,
                    }}
                  />
                  {/*<View style={{ flexDirection: 'row', bottom:'35%'}}>*/}
                  {/*    <View style={{position:'absolute',left: 15}}><BlurIconButton*/}
                  {/*        iconType={'Ionicons'}*/}
                  {/*        name={'arrow-back'}*/}
                  {/*        size={18}*/}
                  {/*        onPress={() => {*/}
                  {/*            console.log('ns.')*/}
                  {/*            navigation.push('NotesScreen', {move_id: 1, vol: vol + 1})*/}

                  {/*        }}*/}
                  {/*        color={'white'}*/}
                  {/*    />*/}
                  {/*    </View>*/}
                  {/*    <View style={{position:'absolute',right: 15}}>*/}
                  {/*        <BlurIconButton*/}
                  {/*    iconType={'Ionicons'}*/}
                  {/*    name={'arrow-forward'}*/}
                  {/*    size={18}*/}
                  {/*    onPress={() => {*/}
                  {/*        console.log('ns.')*/}
                  {/*        navigation.push('NotesScreen', {move_id: 1, vol: vol + 1})*/}

                  {/*    }}*/}
                  {/*    color={'white'}*/}
                  {/*/>*/}
                  {/*    </View>*/}
                  {/*</View>*/}
                </View>
              );
            }}
            contentContainerStyle={styles.container(headerHeight)}
            ListFooterComponent={() => (
              <View style={styles.footerFlatListContainer} />
            )}
          />
        ) : (
          <Image source={require('../../../assets/Background8.jpg')} />
        )}
      </ImageBackground>
    </>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: headerHeight => ({
    marginTop: headerHeight + 20,
    alignItems: 'center',
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
  footerFlatListContainer: {
    height: 150,
  },
});
