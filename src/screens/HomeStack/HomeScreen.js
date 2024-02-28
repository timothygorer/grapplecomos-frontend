import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import NavigationBar from '../../components/general/NavigationBar.js';

import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getFontFamily} from '../../shared/utils';
import CustomCarousel from '../../components/general/CustomCarousel';
import CourseItem from '../../components/Home/CourseItem.js';
import {getRandomImage} from '../../shared/utils/helpers.js';
import {supabase} from '../../services/supabaseClient.js';
import BlurIconButton from '../../components/Home/BlurIconButton';
import {useAuth} from '../../shared/utils/AuthContext';
import {
  useAnimatedReaction,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import PlaceholderCourseItem from '../../components/Home/PlaceholderCourseItem';
import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
} from 'expo-activity-feed';
import MediaView from '../../common/components/MediaView';
import CaptureFab from '../../capture/CaptureFab';
import Actions from '../../newsfeed/activity/Actions';
import ActivityModel from '../../newsfeed/ActivityModel';
import {useInfiniteNewsfeed} from '../../modules/newsfeed/hooks/useInfiniteNewsfeed';
const stream = require('getstream');

const entity = {
  text: 'HEY',
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
  'thumbs:down:count': 5,
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
  subtype: 'sample_subtype',
  entity_guid: 'entity_guid_789',
  owner_guid: 'owner_guid_123',
  custom_type: 'custom_type_sample',
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
  type: 'sample_type',
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

const DiscoverServers = props => {
  const {animatedBottomTabBarValue} = props.route.params;
  const navigation = useNavigation();
  const {profile, authStatus} = useAuth();
  const [moves, setMoves] = useState([]);
  const [featuredMoves, setFeaturedMoves] = useState(null);
  const fundamentals =
    featuredMoves?.filter(s => s.category === 'Fundamentals') ?? [];
  const escapes = moves?.filter(s => s.category === 'Escapes') ?? [];
  const guard = moves?.filter(s => s.category === 'Guard') ?? [];
  const guardPassing = moves?.filter(s => s.category === 'Guard Passing') ?? [];
  const wrestling = moves?.filter(s => s.category === 'Wrestling') ?? [];
  const mountAttacks = moves?.filter(s => s.category === 'Mount Attacks') ?? [];
  const sideControlAttacks =
    moves?.filter(s => s.category === 'Side Control Attacks') ?? [];
  const turtle = moves?.filter(s => s.category === 'Turtle') ?? [];
  const backAttacks = moves?.filter(s => s.category === 'Back Attacks') ?? [];
  const submissions = moves?.filter(s => s.category === 'Submissions') ?? [];
  const drills = moves?.filter(s => s.category === 'Drills') ?? [];
  const [randomImages, setRandomImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldGetNextPage, setShouldGetNextPage] = useState(false);
  const [start, setStart] = useState(20);
  const [end, setEnd] = useState(29);

  useEffect(() => {
    (async () => {
      const numbers = Array(9)
        .fill(0)
        .map(_ => getRandomImage());
      setRandomImages([require('../../assets/Background8.jpg'), ...numbers]);
      const {data: random, error} = await supabase.rpc(
        'get_random_moves_by_categories',
        {
          category_list: [
            'Fundamentals',
            'Guard',
            'Back Attacks',
            'Breakdowns',
            'Catch Wrestling',
            'Conditioning',
            'Drills',
            'Escapes',
            'Fundamentals',
            'Guard',
            'Guard Passing',
            'Judo',
            'Kids Programs',
            'MMA',
            'Mindset',
            'Mount Attacks',
            'Sambo',
            'Self Defense',
            'Side Control Attacks',
            'Strength Training',
            'Striking',
            'Submissions',
            'Takedowns',
            'Turtle',
            'Wrestling',
          ],
        },
      );
      console.log('err is ', error);
      setFeaturedMoves(random.slice(0, 10));
      setMoves(random.slice(10, 100));
      setIsLoading(false);
    })();
  }, []);

  const [animatedValue, setAnimatedValue] = useState(useSharedValue(0));
  const yOffset = useSharedValue(0);
  const SWIPE_THRESHOLD = 2;

  useAnimatedReaction(
    () => animatedValue.value,
    (result, previous) => {
      if (result > 1800) {
        return;
      }
      const diff = result - previous;
      console.log(result, previous);

      if (diff > SWIPE_THRESHOLD) {
        animatedBottomTabBarValue.value = withSpring(100, {
          damping: 100,
          mass: 0.3,
        });
        console.log('set to ', animatedBottomTabBarValue.value);
      } else if (diff < -SWIPE_THRESHOLD) {
        animatedBottomTabBarValue.value = withSpring(0, {
          damping: 100,
          mass: 0.3,
        });
        console.log('else set to ', animatedBottomTabBarValue.value);
      }
    },
    [animatedValue],
  );

  const handleScroll = event => {
    yOffset.value = event.nativeEvent.contentOffset.y;
    setAnimatedValue(yOffset);
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerFlatListContainer}>
        {otherMoves.length > 0 && shouldGetNextPage && (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  };

  const videoRef = useRef(null);

  const onPressActivity = activity => {
    console.log('pressed.');
    navigation.navigate('SinglePost', {
      activity,
    });
  };

  useEffect(() => {
    (async () => {
      const client = stream.connect(
        'gqp7auuzq5b3',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmM2ZDVhM2QtNTIyNC00OWU3LWJlZDctNTI1MGNhMmVhMzBkIn0.9pxdgbGDbbIQ_hOwgoLaxY6llOHPG3EKgwdlgrIFJkI',
        '1266985',
      );
    })();
  }, []);

  return (
    <>
      <View style={styles.navigationBarContainer}>
        <NavigationBar
          title={'Home'}
          firstRightButton={() => (
            <BlurIconButton
              name={'search'}
              onPress={() => navigation.navigate('SearchScreen')}
              iconType={'FontAwesome'}
              size={19}
              borderRadius={16}
            />
          )}
          secondRightButton={() => (
            <BlurIconButton
              name={'account-circle'}
              iconType={'MaterialCommunityIcons'}
              onPress={() => {
                if (authStatus === 'SIGNED_IN') {
                  navigation.navigate('ProfileStack', {
                    screen: 'ProfileScreen',
                  });
                } else {
                  navigation.navigate('LoginStack', {
                    screen: 'LoginWelcomeScreen',
                  });
                }
              }}
              size={26}
              borderRadius={20}
            />
          )}
        />
      </View>
    </>
  );
};

export default DiscoverServers;

const composeFABStyle = {bottom: 96};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#F2F6FF',
  },
  navigationBarContainer: {
    backgroundColor: 'black',
  },
  footerFlatListContainer: {
    flex: 1,
    marginTop: 25,
    height: 40,
  },
});
