import * as React from 'react';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getInstructionals} from '../../shared/utils/games.js';
import NavigationBar from '../../components/general/NavigationBar.js';

import {
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
import CustomCarousel from './CustomCarousel.tsx';
import DiscoverServerBlock from './DiscoverServerBlock.js';
import CourseItem from '../../components/Home/CourseItem.js';
import {getRandomImage} from '../../shared/utils/helpers.js';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {supabase} from '../../services/supabaseClient.js';

const DiscoverServers = () => {
  const navigation = useNavigation();
  const [servers, setServers] = useState( [
        {
            id: 1,
            is_featured: true,
            categories: ['Fundamentals', 'Escapes', 'Guard'],
            name: 'hello1'
        },
        {
            id: 2,
            is_featured: false,
            categories: ['Guard_Passing', 'Wrestling'],
            name:'hello2'
        },
        {
            id: 3,
            is_featured: true,
            categories: ['Mount Attacks', 'Side Control Attacks', 'Turtle'],
            name:'hello3'
        },
        {
            id: 4,
            is_featured: false,
            categories: ['Back Attacks', 'Submissions', 'Drills'],
            name:'hello4'
        },
        {
            id: 5,
            is_featured: true,
            categories: ['Fundamentals', 'Submissions'],
            name:'hello5'
        }
    ]);
  const featuredServers = servers.filter(s => s.is_featured);
  const fundamentals = servers.filter(s =>
    s.categories.includes('Fundamentals'),
  );
  console.log('fundamentals is', fundamentals);
  const escapes = servers.filter(s => s.categories.includes('Escapes'));
  const guard = servers.filter(s => s.categories.includes('Guard'));
  const guardPassing = servers.filter(s =>
    s.categories.includes('Guard_Passing'),
  );
  const wrestling = servers.filter(s => s.categories.includes('Wrestling'));
  const mountAttacks = servers.filter(s =>
    s.categories.includes('Mount Attacks'),
  );
  const sideControlAttacks = servers.filter(s =>
    s.categories.includes('Side Control Attacks'),
  );
  const turtle = servers.filter(s => s.categories.includes('Turtle'));
  const backAttacks = servers.filter(s =>
    s.categories.includes('Back Attacks'),
  );
  const submissions = servers.filter(s => s.categories.includes('Submissions'));
  const drills = servers.filter(s => s.categories.includes('Drills'));
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    (async () => {
      // const {data, error} = await supabase.rpc('get_random_instructionals');
      // setServers(data);
      const numbers = Array(10)
        .fill(0)
        .map(_ => getRandomImage());
      setRandomImages(numbers);
    })();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/Background2.jpg')}
      style={styles.backgroundImage}>
      <SafeAreaView edges={['bottom']} style={{flex: 1}}>
        <>
          <NavigationBar
            title={'Home'}
            secondRightButton={() => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginStack', {
                    screen: 'NewLoginScreen',
                  });
                }}>
                <MaterialCommunityIcons name="account-circle" size={26} color="white" />
              </TouchableOpacity>
            )}
          />
        </>
        <SectionList
          // ListHeaderComponent={() => <CustomCarousel servers={servers} />}
          keyExtractor={(item, index) => item + index}
          stickySectionHeadersEnabled={false}
          sections={[
            {server_category: 'Featured Servers', data: featuredServers},
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
            {
              server_category: 'More Instructionals',
              data: submissions,
              horizontal: false,
            },
          ]}
          renderSectionHeader={({section}) => (
            <>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily:
                    Platform.OS === 'ios'
                      ? getFontFamily('text')
                      : 'SFUIDisplay',
                  paddingLeft: 10,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                {section.server_category}
              </Text>
              {section.horizontal && (
                <FlatList
                  data={section.data}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.toString()}
                  renderItem={({item, index}) => (
                    <View style={{margin: 10}}>
                      <CourseItem
                        course={item}
                        randomImage={randomImages[index % 10]}
                      />
                    </View>
                  )}
                />
              )}
            </>
          )}
          renderItem={({item, section}) => {
            if (!section.horizontal) {
              return (
                <View>
                  <View style={{padding: 5}}>
                    <DiscoverServerBlock
                      // key={index}
                      item={item}
                      section={section}
                      isCarouselBlock={true}
                      showsImageHeader={false}
                    />
                  </View>
                </View>
              );
            }
            return null;
          }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DiscoverServers;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#F2F6FF',
  },
});
