import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {adaptiveFont, getFontFamily, getFontWeight} from '../../shared/utils';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {useRefresh} from '../../hooks/useRefresh';
import {useAuth} from '../../shared/utils/AuthContext';
import NavigationBar from '../../components/general/NavigationBar.js';
import FinalLinedaddyText from '../../assets/images/svg/javascript_svgs/FinalLinedaddyText';
import {
  useAnimatedReaction,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import SectionRow from '../../components/Home/SectionRow.js';
import BlurIconButton from '../../components/Home/BlurIconButton';
import InstructionalInfoCard from '../HomeStack/NotesScreens/InstructionalInfoCard';
import LoggedOutCard from '../HomeStack/NotesScreens/LoggedOutCard';
import {supabase} from '../../services/supabaseClient';

const {width, height} = Dimensions.get('screen');
const marketsBottomSheetSnapPoint = [height * 0.6];

const LikedScreen = props => {
  const {animatedBottomTabBarValue} = props.route.params;
  const navigation = useNavigation();
  const {colors, dark: darkTheme} = useTheme();

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);
  const [dataSource, setDataSource] = React.useState([]);
  const [spinnerVisibility, setSpinnerVisibility] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isRefreshing, startRefreshing] = useRefresh();
  const {authStatus, profile} = useAuth();
  const [savedNotes, setSavedNotes] = useState(profile?.saved_notes ?? []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerTitle: () => null,
      // headerLeft: () => !showSearchBar && <HeaderLogo />,
      // headerRight: () => (showSearchBar ? <CancelButton /> : <SearchButton />),
      headerStyle: {
        backgroundColor: darkTheme ? 'black' : 'white',
        elevation: Platform.OS === 'android' ? 3 : 1,
        height: 100,
      },
      headerShadowVisible: false,
      // headerTitle: () =>
      //   showSearchBar && (
      //     <View style={{width: 350}}>
      //       <SearchInput />
      //     </View>
      //   ),
    });
  }, [darkTheme, showSearchBar]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const {data, error} = await supabase
          .from('profiles')
          .select('saved_notes')
          .single();
        setSavedNotes(data?.saved_notes ?? []);
      })();
    }, [profile]),
  );

  const HeaderLogo = () => {
    return (
      <View style={[styles.headerLeftContainer]}>
        <FinalLinedaddyText />
      </View>
    );
  };

  const CancelButton = () => {
    return (
      <View>
        <TouchableOpacity
          style={{right: 15, justifyContent: 'center'}}
          onPress={() => {
            setShowSearchBar(false);
            setFilteredSavedNotes(profile?.saved_notes ?? []);
          }}>
          <Text style={{width: '100%', color: darkTheme ? 'white' : 'black'}}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const filterList = searchTxt => {
    (async () => {
      console.log('*search-txt*', searchTxt, '*length*', searchTxt.length);

      const words = searchTxt.toLowerCase().split(' ');
      const formattedSearchQuery = words.join(' ');
      console.log('*formatted-search*', formattedSearchQuery);

      const filtered =
        profile?.saved_notes.filter(team =>
          team.toLowerCase().includes(formattedSearchQuery),
        ) ?? [];
      setFilteredSavedNotes(filtered);
    })();
  };

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

  const onChapterCardRenderHandler = ({item, index}) => {
    return (
      <React.Fragment key={index}>
        <SectionRow
          section={item}
          onPress={() =>
            navigation.navigate('LikedNotesScreen', {
              ...item,
            })
          }
          isFirstCard={index === 0}
          isLastCard={index === profile?.saved_notes.length - 1}
        />
      </React.Fragment>
    );
  };

  console.log('profile?.saved_notes is', profile?.saved_notes);
  return (
    <ImageBackground
      source={require('../../assets/Background1.jpg')}
      style={{flex: 1, justifyContent: 'center'}}>
      <NavigationBar
        title={'Saved Moves'}
        showTitle={!showSearchBar}
        smallTitle={true}
        secondRightButton={
          authStatus === 'SIGNED_IN'
            ? () =>
                showSearchBar ? null : (
                  <BlurIconButton
                    name={'search'}
                    onPress={() => navigation.navigate('LikedSearchScreen')}
                    iconType={'FontAwesome'}
                    size={19}
                    borderRadius={16}
                  />
                )
            : null
        }
      />
      <FlatList
        keyExtractor={(item, index) => item.move_id?.toString()}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={profile?.saved_notes}
        renderItem={onChapterCardRenderHandler}
        onScroll={handleScroll}
        ListFooterComponent={() => <View style={{paddingBottom: 100}} />}
        ListEmptyComponent={
          authStatus === 'SIGNED_IN' ? (
            <LoggedOutCard
              section={{
                name: 'Your saved moves will show here once you like your first move',
              }}
              loggedOut={false}
            />
          ) : (
            <LoggedOutCard
              section={{
                name: 'You must be logged in to like moves',
              }}
              onPress={() => {
                navigation.navigate('LoginStack', {
                  screen: 'LoginWelcomeScreen',
                });
              }}
            />
          )
        }
      />
    </ImageBackground>
  );
};

export default LikedScreen;

const styles = StyleSheet.create({
  headerLeftContainer: {
    marginLeft: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    width: Platform.OS === 'android' ? '110%' : null,
  },
  footerFlatListContainer: {
    flex: 1,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 12),
    fontWeight: getFontWeight('semibold'),
    letterSpacing: 0.5,
  },
  safeAreaViewStyle: dark => ({
    flex: 1,
  }),
  labelTxt: darkTheme => ({
    marginHorizontal: 16,
    marginVertical: 8,
    fontSize: 20,
    fontWeight: '500',
  }),
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.20)',
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  cancelButtonContainer: {
    marginRight: 10,
  },
});
