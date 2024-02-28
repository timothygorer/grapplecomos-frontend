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
import NavigationBar from '../../components/general/NavigationBar.js';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {getChapterContent} from '../../shared/utils/games.js';
import slugify from 'slugify';
import BlurIconButton from '../../components/Home/BlurIconButton';
import {useAuth} from '../../shared/utils/AuthContext';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const sleep = ms => new Promise(r => setTimeout(r, ms));

export const LikedSearchScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {colors, dark: darkTheme} = useTheme();
  const {backgroundColor} = colors;

  const {profile} = useAuth();

  // For range
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);

  const [dataSource, setDataSource] = React.useState([]);
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

      console.log('pfs is', profile?.saved_notes);
      const textToSearch = text.toLowerCase(); // Convert search text to lower case

      const filteredNotes =
        profile?.saved_notes.filter(item =>
          item.move_title?.toLowerCase().includes(textToSearch),
        ) ?? [];

      console.log('fn is', filteredNotes);
      if (spinnerVisibility) {
        setSpinnerVisibility(false);
      }
      setDataSource(filteredNotes);
    })();
  };

  const handleSearch = async text => {
    setSearchTerm(text);
    if (text.length === 0) {
      setSpinnerVisibility(false);
      setDataSource([]);
    } else {
      if (!spinnerVisibility) {
        setSpinnerVisibility(true);
      }
    }
  };

  const handleClearPress = () => {
    setSearchTerm('');
    setDataSource([]);
  };

  const SearchInput = React.useCallback(({searchTerm, spinnerVisibility}) => {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for saved moves"
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

  const renderItem = (item, index) => {
    return (
      <React.Fragment key={index}>
        <SectionRow
          section={{
            ...item,
          }}
          onPress={async () => {
            console.log('ok.', item);

            navigation.navigate('LikedNotesScreen', {
              move_title: item.move_title,
              move_id: item.move_id,
              from:'LikedSearchScreen'
            });
          }}
          isFirstCard={index === 0}
          isLastCard={index === dataSource.length - 1}
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
        data={dataSource ?? []}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReachedThreshold={0.001}
        contentContainerStyle={[
          dataSource.length > 0 && styles.searchResultsContainer,
        ]}
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
