import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  FlatList,
  Platform,
  UIManager,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import {supabase} from '../../services/supabaseClient';
import {adaptiveFont, getFontFamily, getFontWeight} from '../../shared/utils';
import CloseX from '../../assets/images/svg/javascript_svgs/CloseX';
import DiscoverServerBlock from './DiscoverServerBlock.js';

import {useNavigation, useTheme} from '@react-navigation/native';
import {
  apiListEnd,
  apiRequest,
  apiSuccess,
  restoreDefault,
  updateHome,
} from '../..//redux/slices/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from '../../hooks/useDebounce';
import AuthProvider, {useAuth} from '../../shared/utils/AuthContext.js';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const sleep = ms => new Promise(r => setTimeout(r, ms));

export const ServerSearchScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {colors, dark: darkTheme} = useTheme();
  const {backgroundColor} = colors;

  const homeData = useSelector(state => state.homeData);

  // For range
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);

  const [dataSource, setDataSource] = React.useState([]);
  const [spinnerVisibility, setSpinnerVisibility] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [shouldGetNextPage, setShouldGetNextPage] = React.useState(false);
  const {debounce} = useDebounce();
  const {servers} = useAuth();

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();
    if (shouldGetNextPage) {
      filterList(trimmedSearchTerm, start, end);
      setShouldGetNextPage(false);
    }
  }, [shouldGetNextPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('SEARCH TERM IS ', searchTerm);
      const trimmedSearchTerm = searchTerm.trim();

      if (trimmedSearchTerm) {
        // Send request here
        console.log('restore default b/c trimmedSearchTerm not null.');
        dispatch(restoreDefault({dataKey: 'Search'}));
        setStart(0);
        setEnd(9);
        filterList(trimmedSearchTerm, 0, 9);
      } else {
        // don't do a search if the text is whitespace characters only. Will produce the wrong results.
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('restoring default b/c blur.');
    });

    return () => {
      unsubscribeBlur();
    };
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerTintColor: 'rgb(148,157,165)',
      headerLeft: () => {},
      headerRight: () => (
        <View>
          <TouchableOpacity
            style={{
              right: 15,
              justifyContent: 'center',
            }}
            onPress={() => {
              debounce(() => navigation.goBack());
            }}>
            <Text style={{width: '100%', color: darkTheme ? 'white' : 'black'}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: darkTheme ? 'black' : 'white',
        elevation: Platform.OS === 'android' ? 3 : 1,
        height: 100,
      },
      headerShadowVisible: false,
      headerTitle: () => (
        <SearchInput
          searchTerm={searchTerm}
          spinnerVisibility={spinnerVisibility}
        />
      ),
    });
  }, [spinnerVisibility, searchTerm]);

  const filterList = (text, start, end) => {
    (async () => {
      const words = text.toLowerCase().split(' ');
      const formattedSearchQuery = words.join(' ');
      console.log('fsq', formattedSearchQuery);

      let matches = servers.filter(s => s.name === formattedSearchQuery);
      console.log('matches:', matches);

      if (spinnerVisibility) {
        setSpinnerVisibility(false);
      }
      setDataSource(matches);
    })();
  };

  const fetchMoreData = () => {
    console.log('running fmd.');
    if (
      !homeData.isListEnd.search_results &&
      !homeData.isMoreLoading.search_results
    ) {
      setStart(start + 10);
      setEnd(end + 10);
      setShouldGetNextPage(true);
    }
  };

  const SearchInput = React.useCallback(({searchTerm, spinnerVisibility}) => {
    return (
      <View style={styles.searchInputContainer}>
        {/*<SearchBar*/}
        {/*  darkMode*/}
        {/*  autoComplete={'off'}*/}
        {/*  autoCorrect={false}*/}
        {/*  autoCapitalize={'words'}*/}
        {/*  placeholder="Search..."*/}
        {/*  spinnerVisibility={spinnerVisibility}*/}
        {/*  clearIconComponent={*/}
        {/*    searchTerm.length === 0 ? <></> : <CloseX color={'#FFFFFF'} />*/}
        {/*  }*/}
        {/*  style={{backgroundColor: '#353d5e'}}*/}
        {/*  onChangeText={async text => {*/}
        {/*    console.log('text.length is ', text.length);*/}
        {/*    if (text.length == 0) {*/}
        {/*      if (spinnerVisibility) {*/}
        {/*        setSpinnerVisibility(false);*/}
        {/*      }*/}

        {/*      dispatch(restoreDefault({dataKey: 'Search'}));*/}
        {/*      setDataSource([]);*/}
        {/*    } else {*/}
        {/*      if (!spinnerVisibility) {*/}
        {/*        console.log('spinnn.');*/}
        {/*        setSpinnerVisibility(true);*/}
        {/*      }*/}
        {/*    }*/}
        {/*    setSearchTerm(text);*/}
        {/*  }}*/}
        {/*  onSearchPress={() => {*/}
        {/*    console.log('search pressed.');*/}
        {/*  }}*/}
        {/*  onClearPress={() => {*/}
        {/*    setSearchTerm('');*/}
        {/*    console.log(*/}
        {/*      'homeData.data.search_results.results.length is ',*/}
        {/*      homeData.data.search_results.results.length,*/}
        {/*    );*/}
        {/*    dispatch(restoreDefault({dataKey: 'Search'}));*/}
        {/*    setDataSource([]);*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
    );
  }, []);

  const renderFooter = () => {
    return (
      <View
        style={[
          styles.footerFlatListContainer,
          {paddingBottom: 50, backgroundColor: backgroundColor},
        ]}>
        {homeData.isMoreLoading.search_results && (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  };

  const renderItem = (item, index) => {
    return (
      <View style={{padding: 15}}>
        <DiscoverServerBlock
          data={item}
          darkMode={darkTheme}
          colors={colors}
          navigation={navigation}
          source={'Search'}
          isCarouselBlock={true}
          showsImageHeader={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle(colors)}>
      <StatusBar barStyle={darkTheme ? 'light-content' : 'dark-content'} />
      <View style={styles.container(colors)}>
        <View
          style={{
            backgroundColor: darkTheme ? 'black' : 'white',
            alignItems: 'center',
          }}>
          <Text style={{marginBottom: 15, color: 'gray'}}></Text>
        </View>
        <FlatList
          bounces={true}
          data={dataSource}
          renderItem={({item, index}) => renderItem(item, index)}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  eventBlockContentContainer: {
    paddingBottom: 8,
  },
  eventBlockContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventBlocksTeamContainer: {
    flex: 1,
    minHeight: 85,
    maxHeight: 85,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  eventBlockTeamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventBlockTeamLogoAndNameContainer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  eventBlockTeamLogo: {
    width: 32,
    height: 32,
  },
  eventBlockTeamName: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(18, 18),
    fontWeight: '600',
    marginLeft: 10,
  },
  eventBlockTeamScore: {
    flex: 1,
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(20, 20),
    fontWeight: '700',
  },
  eventBlockLeagueAndGameStatusContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  eventBlockLeagueBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventBlockLeagueImage: {
    width: 24,
    height: 24,
  },
  eventBlockLeagueName: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
    fontWeight: '600',
    marginLeft: 5,
  },
  eventBlockGameStatus: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  eventBlockStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventBlockDateStartContainer: {
    alignSelf: 'center',
  },
  eventBlockDateStart: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 25,
  },
  safeAreaViewStyle: colors => ({
    flex: 1,
    backgroundColor: colors.backgroundColor,
  }),
  container: colors => ({
    ...Platform.select({
      android: {
        // top: 24,
      },
    }),
    backgroundColor: colors.backgroundColor,
  }),
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
