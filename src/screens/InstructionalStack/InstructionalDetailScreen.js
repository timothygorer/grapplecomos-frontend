import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
// import InstructionalVolumeTab from '../../components/Instructional/InstructionalVolumeTab.js';
import NotifyMe from '../../components/Instructional/Notifications/NotifyMe';
import NativeEmbeddedAd from '../../components/Instructional/Advertisement/NativeEmbeddedAd';
import {useGetInstructionalVolumeNames} from '../../hooks/useGetInstructionalVolumeNames.js';
import {TabBar, TabView} from 'react-native-tab-view';
import {useAuth} from '../../shared/utils/AuthContext.js';
import arrowIconLeft from '../../assets/images/png/arrow-icon-left/arrow-icon-left.png';
import InstructionalHeader from './InstructionalHeader.js';
// import {CollapsibleHeaderTabView} from 'react-native-tab-view-collapsible-header';
import {useSharedValue} from 'react-native-reanimated';
import {supabase} from '../../services/supabaseClient.js';
import axios from 'axios';
import slugify from 'slugify';
import {getChapterContent} from '../../shared/utils/games.js';

const {width} = Dimensions.get('screen');

const InstructionalDetailScreen = props => {
  const {gameObj, dataTableName} = props.route.params;
  console.log('GO:', gameObj);

  let isPastEvent;
  ({isPastEvent} = props.route.params);

  if (!isPastEvent) {
    // set undefined isPastEvent variable to false
    isPastEvent = false;
  }

  let {title} = gameObj;

  const {dark} = useTheme();
  const [reloadAllOffersData, setReloadAllOffersData] = React.useState(true); // on first launch, reload all offers data
  const [game, setGame] = useState(gameObj);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [hasMarkets, setHasMarkets] = useState(null);
  const navigation = useNavigation();
  const [hidden, setHidden] = useState(false);
  const {profile, setProfile} = useAuth();
  const [liked, setLiked] = useState(
    profile?.saved_notes?.map(n => n.dvd_title).includes(title) ? true : false,
  );

  useGetInstructionalVolumeNames(
    title,
    setRoutes,
    setHasMarkets,
    '',
    isPastEvent,
    reloadAllOffersData,
    setReloadAllOffersData,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: 'Instructional Volumes',
      headerRight: null,
      headerStyle: [styles.headerStyle],
      headerLeft: () => (
        <View style={{left: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NotesStack', {gameObj});
            }}>
            <Image style={{width: 24, height: 24}} source={arrowIconLeft} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [dark, navigation, liked]);

  // const renderScene = ({route}) => {
  //   const {index, name} = route;
  //
  //   return (
  //     <InstructionalVolumeTab
  //       gameObj={game}
  //       marketName={name}
  //       routes={routes}
  //       dataTableName={dataTableName}
  //       tabIndex={index}
  //       setHidden={setHidden}
  //       hidden={hidden}
  //       topGradient={['rgba(18, 18, 18, 1)', 'rgba(18, 18, 18, 0)']}
  //       bottomGradient={['rgba(18, 18, 18, 0.25)', 'rgba(18, 18, 18, 1)']}
  //     />
  //   );
  //   // }
  // };

  // It's example function. I think, we will replace it in future
  const onShareHandler = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onChangeIndexHandler = useCallback(
    tabIndex => {
      setIndex(tabIndex);
      const currentTabIsProps =
        routes.filter(
          (item, index) =>
            index === tabIndex && item.market_subtype === 'Props',
        ).length === 1;
      if (currentTabIsProps) {
        // setHidden(true);
      } else {
        if (hidden) {
          // setHidden(false);
        }
      }
    },
    [routes, hidden],
  );

  const renderTabBarHandler = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        labelStyle={styles.label}
        tabStyle={styles.tabStyle}
      />
    );
  };

  const renderEmpty = () => {
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 200}}>
          <View
            style={{
              marginLeft: 10,
              marginTop: 20,
              marginBottom: 10,
              marginRight: 10,
            }}>
            <NotifyMe onPress={() => {}} />
          </View>
          <View>
            <NativeEmbeddedAd />
          </View>
        </ScrollView>
      </View>
    );
  };

  const [animatedValue, setAnimatedValue] = useState(useSharedValue(0));

  const getFrozeTop = useCallback(tabType => {
    return Platform.OS === 'ios' ? 63 : 66;
  }, []);

  const onRenderScrollHeaderHandler = useCallback(
    () => <InstructionalHeader animatedValue={animatedValue} />,
    [animatedValue],
  );

  return (
    <ImageBackground
      source={require('../../assets/Background2.jpg')}
      style={styles.backgroundImage}>
      <SafeAreaView style={[styles.container]}>
        {hasMarkets === null ? null : hasMarkets === false ? (
          <>{renderEmpty()}</>
        ) : (
          <>
            {/*<TabView*/}
            {/*  lazy={true}*/}
            {/*  navigationState={{index, routes}}*/}
            {/*  renderScene={renderScene}*/}
            {/*  initialLayout={{width: width}}*/}
            {/*  onIndexChange={onChangeIndexHandler}*/}
            {/*  renderTabBar={renderTabBarHandler}*/}
            {/*  swipeEnabled={false}*/}
            {/*/>*/}
            {/*<CollapsibleHeaderTabView*/}
            {/*  lazy={true}*/}
            {/*  renderScrollHeader={onRenderScrollHeaderHandler}*/}
            {/*  navigationState={{index, routes}}*/}
            {/*  renderScene={renderScene}*/}
            {/*  initialLayout={{width: width}}*/}
            {/*  onIndexChange={onChangeIndexHandler}*/}
            {/*  renderTabBar={renderTabBarHandler}*/}
            {/*  makeScrollTrans={scrollValue => setAnimatedValue(scrollValue)}*/}
            {/*  bouncesEnabled={false}*/}
            {/*  swipeEnabled={true}*/}
            {/*  sceneContainerStyle={{alignItems: 'center', marginTop: '5%'}}*/}
            {/*/>*/}
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default InstructionalDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  pressed: {
    opacity: 0.5,
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 90,
  },
  headerLeftContainer: {
    marginLeft: 25,
  },
  notifyMeContainer: {
    marginTop: 34,
    marginBottom: 24,
  },
  tabbar: {
    backgroundColor: '#3f51b5',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: '400',
  },
  tabStyle: {
    width: 'auto',
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#F2F6FF',
  },
});
