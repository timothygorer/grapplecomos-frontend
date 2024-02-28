import * as React from 'react';
import {useEffect, useState} from 'react';
import NavigationBar from '../../components/general/NavigationBar.js';

import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  SectionList,
  StyleSheet,
  Text,
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

const InstructionalScreen = props => {
  const {animatedBottomTabBarValue} = props.route.params;
  const navigation = useNavigation();
  const {profile, authStatus} = useAuth();
  const [moves, setMoves] = useState([]);
  const [featuredMoves, setFeaturedMoves] = useState(null);
  const fundamentals =
    moves?.filter(s => s.category === 'Fundamentals') ?? [];
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
      console.log('err is ', error, random.slice(0, 10), 'random.');
      // setFeaturedMoves(random.slice(0, 10));
      setMoves(random.slice(0, 10));
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

  return (
    <View style={{flex:1, backgroundColor: 'black'}}>
      <View style={styles.navigationBarContainer}>
        <NavigationBar
          title={'Instructionals'}
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
      <SectionList
        scrollEnabled={!isLoading}
        bounces={false}
        onScroll={handleScroll}
        onEndReached={() => {
          console.log('end.');
          setShouldGetNextPage(true);
          setStart(start + 9);
          setEnd(end + 9);
        }}
        contentContainerStyle={{paddingBottom: 100}}
        // ListHeaderComponent={
        //   <CustomCarousel
        //     featuredMoves={featuredMoves}
        //     isLoading={isLoading}
        //     randomImages={randomImages}
        //     setIsLoading={setIsLoading}
        //     setFeaturedMoves={setFeaturedMoves}
        //   />
        // }
        keyExtractor={(item, index) => item.move_id.toString()}
        stickySectionHeadersEnabled={false}
        sections={[
          {
            server_category: 'Fundamentals',
            data: fundamentals,
            horizontal: true,
          },
          {
            server_category: 'Escapes',
            data: escapes,
            horizontal: true,
          },
          {
            server_category: 'Guard',
            data: guard,
            horizontal: true,
          },
          {
            server_category: 'Guard Passing',
            data: guardPassing,
            horizontal: true,
          },
          {
            server_category: 'Wrestling',
            data: wrestling,
            horizontal: true,
          },
          {
            server_category: 'Mount Attacks',
            data: mountAttacks,
            horizontal: true,
          },
          {
            server_category: 'Side Control Attacks',
            data: sideControlAttacks,
            horizontal: true,
          },
          {
            server_category: 'Turtle',
            data: turtle,
            horizontal: true,
          },
          {
            server_category: 'Back Attacks',
            data: backAttacks,
            horizontal: true,
          },
          {
            server_category: 'Submissions',
            data: submissions,
            horizontal: true,
          },
          {
            server_category: 'Drills',
            data: drills,
            horizontal: true,
          },
        ]}
        renderSectionHeader={({section}) => (
          <>
            {!isLoading && (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily:
                    Platform.OS === 'ios'
                      ? getFontFamily('text')
                      : 'SFUIDisplay',
                  paddingLeft: 20,
                  marginTop: 20,
                  marginBottom: 10,
                  color: 'white',
                }}>
                {section.server_category}
              </Text>
            )}
            {section.horizontal && (
              <FlatList
                data={section.data}
                scrollEnabled={!isLoading}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.move_id.toString()}
                renderItem={({item, index}) => (
                  <View style={{marginLeft: 20, marginRight: 20}}>
                    {isLoading ? (
                      <PlaceholderCourseItem
                        isCarouselBlock={false}
                        randomImage={require('../../assets/Background8.jpg')}
                      />
                    ) : (
                      <CourseItem
                        course={item}
                        randomImage={randomImages[index % 10]}
                      />
                    )}
                  </View>
                )}
              />
            )}
          </>
        )}
        renderItem={({item, index, section}) => {
          if (!section.horizontal) {
            return (
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: index === 0 ? 0 : 10,
                  marginBottom: 10,
                }}>
                <CourseItem
                  course={item}
                  randomImage={randomImages[index % 10]}
                  isCarouselBlock={true}
                />
              </View>
            );
          }
          return null;
        }}
        // ListFooterComponent={renderFooter()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default InstructionalScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#F2F6FF',
  },
  navigationBarContainer: {
    marginTop: 20,
  },
  footerFlatListContainer: {
    flex: 1,
    marginTop: 25,
    height: 40,
  },
});
