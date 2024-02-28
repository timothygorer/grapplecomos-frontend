import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {useTheme} from '@react-navigation/native';
import {adaptiveFont, getFontFamily, getFontWeight} from '../../shared/utils';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import CourseItem from '../../components/Home/CourseItem.js';
import {getRandomImage} from '../../shared/utils/helpers.js';

const window = Dimensions.get('window');
const PAGE_WIDTH = window.width;

const CustomCarousel = ({servers}) => {
  const popularServers = servers;
  console.log('popular:', popularServers);
  const [randomImages, setRandomImages] = useState([]);
  const {colors, dark} = useTheme();
  const [index, setIndex] = React.useState(0);
  const [isVertical, setIsVertical] = React.useState(false);
  const [isFast, setIsFast] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef<ICarouselInstance>(null);

  useEffect(() => {
    const numbers = Array(9)
      .fill(0)
      .map(_ => getRandomImage());
    setRandomImages(numbers);
  }, []);

  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH / 2,
      } as const)
    : ({
        vertical: false,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH / 2,
      } as const);

  return (
    <>
      <Text
        style={{
          fontWeight: 'bold',
          fontFamily:
            Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
          paddingLeft: 10,
          marginBottom: 10,
          marginTop: 20,
        }}>
        Popular Servers
      </Text>
      <Carousel
        {...baseOptions}
        loop
        ref={ref}
        testID={'xxx'}
        style={{height: 360}}
        autoPlay={false}
        autoPlayInterval={isFast ? 100 : 2000}
        data={popularServers}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => {
          console.log('ITEM EXISTS', item);
          return (
            <View style={{marginHorizontal: 20}}>
              <CourseItem
                course={item}
                isCarouselBlock={true}
                randomImage={randomImages[index]}
              />
            </View>
          );
        }}
        onProgressChange={(_, absoluteProgress) => {
          console.log('progress', absoluteProgress);
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
          length={popularServers.length}
          currentIndex={index}
          maxIndicators={popularServers.length}
          interpolateOpacityAndColor={false}
          activeIndicatorConfig={{
            color: '#EC3C4C',
            margin: 3,
            opacity: 1,
            size: 8,
          }}
          inactiveIndicatorConfig={{
            color: '#F96B2B',
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
  },
  betContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 300,
    borderRadius: 10,
    position: 'relative',
    marginBottom: 16,
  },
  lightThemeBetContainerBg: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c6c3c1',
  },
  darkThemeBetContainerBg: {
    backgroundColor: '#262626',
    borderRadius: 10,
  },
  betInfo: {
    flex: 1,
    padding: 16,
  },
  betTextContainer: {
    position: 'relative',
    maxWidth: '82%',
  },
  betTitle: {
    fontSize: adaptiveFont(17, 17),
    fontWeight: getFontWeight('semibold'),
    color: '#ffffff',
  },
  betSubtitle: {
    marginTop: 16,
    fontSize: adaptiveFont(13, 13),
    fontWeight: getFontWeight('medium'),
    height: '70%',
    color: '#ffffff',
  },
  teamsContainer: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  time: {
    position: 'absolute',
    bottom: 14,
    right: 16,
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(11, 11),
    textAlign: 'left',
    color: '#b8b8b8',
  },
  profileContainer: {},
  defaultAvatarContainer: {
    height: 68,
    width: 68,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderRadius: 50,
    borderColor: '#FFF',
  },
  cardContainer: (isCarouselBlock, dark) => ({
    width: isCarouselBlock ? '100%' : 320,
    height: 350,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: dark ? '#292929' : 'white',
    position: 'relative',
    padding: 10,
  }),
  headerImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  avatarImage: {
    position: 'absolute',
    left: 15,
    top: 170,
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  titleText: dark => ({
    position: 'absolute',
    left: 70,
    top: 170,
    fontSize: 18,
    fontWeight: 'bold',
    color: dark ? 'white' : 'black',
  }),
  subtitleText: dark => ({
    position: 'absolute',
    left: 70,
    top: 190,
    fontSize: 14,
    color: dark ? 'white' : 'black',
  }),
  descriptionText: dark => ({
    position: 'absolute',
    top: 210,
    left: 15,
    right: 10,
    fontSize: 12,
    padding: 20,
    color: dark ? 'white' : 'black',
  }),
  buttonsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
  moreInfoButton: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 10,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  joinButton: {
    backgroundColor: '#66ccff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default React.memo(CustomCarousel);
