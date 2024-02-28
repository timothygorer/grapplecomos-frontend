import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {supabase} from '../../services/supabaseClient';
import CloseX from '../../assets/images/svg/javascript_svgs/CloseX';

import {useNavigation, useTheme} from '@react-navigation/native';
import {
  apiListEnd,
  apiRequest,
  apiSuccess,
  restoreDefault,
} from '../../redux/slices/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from '../../hooks/useDebounce';
import SectionRow from '../../components/Home/SectionRow.js';
import {useHeaderHeight} from '@react-navigation/elements';
import NavigationBar from '../general/NavigationBar.js';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {getChapterContent} from '../../shared/utils/games.js';
import slugify from 'slugify';
import BlurIconButton from './BlurIconButton';
import LoggedOutCard from '../../screens/HomeStack/NotesScreens/LoggedOutCard';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const sleep = ms => new Promise(r => setTimeout(r, ms));

export const SearchScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {colors, dark: darkTheme} = useTheme();
  const {backgroundColor} = colors;

  const homeData = useSelector(state => state.homeData);

  // For range
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);

  const [dataSource, setDataSource] = React.useState(null);
  const [spinnerVisibility, setSpinnerVisibility] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [shouldGetNextPage, setShouldGetNextPage] = React.useState(false);
  const headerHeight = useHeaderHeight();
  const {debounce} = useDebounce();

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
        setSpinnerVisibility(false);
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
      headerTransparent: true,
      headerShown: true,
      headerBackTitleVisible: false,
      headerTintColor: 'rgb(148,157,165)',
      headerLeft: () => {},
      // headerRight: () => (
      //   <View>
      //     <TouchableOpacity
      //       style={{
      //         right: 15,
      //         justifyContent: 'center',
      //       }}
      //       onPress={() => {
      //         debounce(() => navigation.goBack());
      //       }}>
      //       <Text style={{width: '100%', color: darkTheme ? 'white' : 'black'}}>
      //         Cancel
      //       </Text>
      //     </TouchableOpacity>
      //   </View>
      // ),
      headerStyle: {
        backgroundColor: darkTheme ? 'black' : 'white',
        elevation: Platform.OS === 'android' ? 3 : 1,
        height: 100,
      },
      headerShadowVisible: false,
      headerTitle: () => null,
      // headerTitle: () => (
      //     <SearchInput
      //         searchTerm={searchTerm}
      //         spinnerVisibility={spinnerVisibility}
      //     />
      // ),
    });
  }, [spinnerVisibility, searchTerm]);

  const filterList = (text, start, end) => {
    (async () => {
      const words = text.toLowerCase().split(' ');
      const formattedSearchQuery = words.join(' ');
      const timestamp = new Date();
      dispatch(apiRequest({start, end, dataKey: 'Search', timestamp}));

      let data, error;

      ({data, error} = await supabase
        .rpc('search_results', {
          search_term: formattedSearchQuery,
        })
        .range(start, end));

      console.log(error);

      if (spinnerVisibility) {
        setSpinnerVisibility(false);
      }
      setDataSource(data);

      if (data.length == 0 || data.length < 10) {
        dispatch(apiListEnd({isListEnd: true, dataKey: 'Search'}));
      }

      dispatch(apiSuccess({data: data, dataKey: 'Search', timestamp}));
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

  const handleSearch = async text => {
    setSearchTerm(text);
    if (text.length === 0) {
      console.log('search.');
      setSpinnerVisibility(false);
      dispatch(restoreDefault({dataKey: 'Search'}));
      setDataSource([]);
    } else {
      if (!spinnerVisibility) {
        setSpinnerVisibility(true);
      }
    }
  };

  const handleClearPress = () => {
    setSearchTerm('');
    console.log(
      'homeData.data.search_results.results.length is ',
      homeData.data.search_results.results.length,
    );
    dispatch(restoreDefault({dataKey: 'Search'}));
    setDataSource(null);
  };

  const SearchInput = React.useCallback(({searchTerm, spinnerVisibility}) => {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for moves or competitors"
          placeholderTextColor="#FFFFFF"
          autoComplete="off"
          autoCorrect={false}
          autoCapitalize="words"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        {spinnerVisibility && <ActivityIndicator color="#FFFFFF" />}
        {searchTerm.length > 0 && (
          <TouchableOpacity
            onPress={handleClearPress}
            style={styles.cancelButtonContainer}>
            <Ionicons name="close-circle" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    );
  }, []);

  const renderFooter = () => {
    return (
      <View style={styles.footerFlatListContainer}>
        {homeData.isMoreLoading.search_results && (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  };

  const renderItem = (item, index) => {
    console.log('item', item);
    return (
      <React.Fragment key={index}>
        <SectionRow
          section={{
            move_title: item.move_title,
            id: item.move_id,
            move_raw_notes: item.move_raw_notes,
          }}
          onPress={async () => {
            console.log('ok.', item);

            navigation.navigate('NotesStack', {
              move_title: item.move_title,
              move_id: item.move_id,
              move_raw_notes: item.move_raw_notes,
            });
          }}
          isFirstCard={index === 0}
          isLastCard={index === homeData.data.search_results.results.length - 1}
        />
      </React.Fragment>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/Background1.jpg')}
      style={{flex: 1, justifyContent: 'center'}}>
      <NavigationBar
        title={'Search'}
        secondRightButton={() => (
          <BlurIconButton
            size={26}
            iconType={'AntDesign'}
            name={'close'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
      />
      <View style={{alignItems: 'center'}}>
        <SearchInput
          searchTerm={searchTerm}
          spinnerVisibility={spinnerVisibility}
        />
      </View>
      <StatusBar barStyle={'light-content'} />
      <FlatList
        bounces={true}
        showsVerticalScrollIndicator={false}
        data={homeData.data.search_results.results ?? []}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReachedThreshold={0.001}
        onEndReached={() => {
          homeData.data.search_results.results &&
            homeData.data.search_results.results.length >= 10 &&
            fetchMoreData();
        }}
        contentContainerStyle={[
          homeData.data.search_results.results.length > 0 &&
            styles.searchResultsContainer,
        ]}
        ListFooterComponent={renderFooter()}
        ListEmptyComponent={
          !dataSource ? null : dataSource.length === 0 ? (
            <View style={{marginTop: 20}}>
              <LoggedOutCard
                section={{
                  name: 'No results found',
                }}
                loggedOut={false}
              />
            </View>
          ) : null
        }
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  footerFlatListContainer: {
    flex: 1,
    marginTop: 25,
    height: 75,
  },
  searchResultsContainer: {
    marginTop: '5%',
  },
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
