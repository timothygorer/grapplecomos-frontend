import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {useTheme} from '@react-navigation/native';
import {adaptiveFont, getFontFamily, getFontWeight} from '../../shared/utils';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import CourseItem from '../../components/Home/CourseItem.js';
import {getRandomImage} from '../../shared/utils/helpers.js';
import PlaceholderCourseItem from '../Home/PlaceholderCourseItem';
import InstructionalInfoCard from '../../screens/HomeStack/NotesScreens/InstructionalInfoCard';
import LoggedOutCard from '../../screens/HomeStack/NotesScreens/LoggedOutCard';
import {supabase} from '../../services/supabaseClient';
import {IS_IPAD, isAndroidTablet} from '../../config/Config';

const window = Dimensions.get('window');
const PAGE_WIDTH = window.width;

const CustomCarousel = ({
  featuredMoves,
  isLoading,
  randomImages,
  setIsLoading,
  setFeaturedMoves,
}) => {
  const {colors, dark} = useTheme();
  const [index, setIndex] = React.useState(0);
  const [isVertical, setIsVertical] = React.useState(false);
  const [isFast, setIsFast] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef(null);

  const baseOptions = isVertical
    ? {
        vertical: true,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH / 2,
      }
    : {
        vertical: false,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH / 2,
      };

  return (
    <>
      {!featuredMoves ? null : featuredMoves.length > 0 ? (
        <>
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily:
                Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
              paddingLeft: 20,
              marginBottom: 10,
              marginTop: 20,
              color: 'white',
            }}>
            Match Breakdowns
          </Text>
          <Carousel
            {...baseOptions}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            enabled={!isLoading}
            loop
            ref={ref}
            testID={'xxx'}
            style={styles.carouselContainer(IS_IPAD)}
            autoPlay={false}
            autoPlayInterval={isFast ? 100 : 4000}
            data={featuredMoves}
            pagingEnabled={isPagingEnabled}
            renderItem={({item, index}) => {
              return (
                <View style={{marginHorizontal: 20}}>
                  {isLoading ? (
                    <PlaceholderCourseItem isCarouselBlock={true} />
                  ) : (
                    <CourseItem
                      course={item}
                      isCarouselBlock={true}
                      randomImage={randomImages[index]}
                    />
                  )}
                </View>
              );
            }}
            onProgressChange={(_, absoluteProgress) => {
              if (absoluteProgress % 1 === 0)
                setIndex(Math.round(absoluteProgress));
            }}
            scrollAnimationDuration={100}
          />
          <View
            style={{
              margin: 10,
              alignItems: 'center',
            }}>
            <AnimatedDotsCarousel
              length={featuredMoves.length}
              currentIndex={index}
              maxIndicators={featuredMoves.length}
              interpolateOpacityAndColor={false}
              activeIndicatorConfig={{
                color: 'white',
                margin: 3,
                opacity: 1,
                size: 8,
              }}
              inactiveIndicatorConfig={{
                color: 'grey',
                margin: 3,
                opacity: 0.5,
                size: 8,
              }}
              decreasingDots={[
                {
                  config: {
                    color: '#F96B2B',
                    margin: 3,
                    opacity: 0.5,
                    size: 6,
                  },
                  quantity: 1,
                },
                {
                  config: {
                    color: '#F96B2B',
                    margin: 3,
                    opacity: 0.5,
                    size: 4,
                  },
                  quantity: 1,
                },
              ]}
            />
          </View>
        </>
      ) : (
        <LoggedOutCard
          section={{
            name: 'Failed to fetch moves',
            description: 'Please try again later',
          }}
          buttonText={'Retry'}
          onPress={async () => {
            const {data, error} = await supabase.from('tile').select('*');

            setFeaturedMoves(data.concat(data).concat(data));
            setIsLoading(false);
          }}
        />
      )}
    </>
  );
};

export default React.memo(CustomCarousel);

const styles = StyleSheet.create({
    carouselContainer: (is_ipad, isAndroidTablet) => ({
        height: 360,
        alignItems: is_ipad || isAndroidTablet ? 'center' : 'flex-start'
    })
})
