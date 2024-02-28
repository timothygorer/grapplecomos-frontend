import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {
  adaptiveFont,
  getFontFamily,
  getTimeFormatAMPM,
  monthNames,
} from '../../shared/utils';
import {Platform, Text, View} from 'react-native';
// import FastImage from 'react-native-fast-image';
import {leagues_data} from '../../shared/constants';
import BoltDark from '../../assets/images/svg/bolt-dark.svg';
import {useDebounce} from '../../hooks/useDebounce';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const EventBlock = ({data, darkMode, colors, navigation}) => {
  const {debounce} = useDebounce();

  const bgStylesEvents = {
    liveBg: darkMode ? '#2F3135' : '#FFFFFF',
    bg: darkMode ? '#42464C' : '#F1F1F1',
  };

  const {title} = data;

  return (
    <View
      onStartShouldSetResponder={() => true}
      style={[styles.eventBlockContentContainer, {padding: 16}]}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          debounce(() => {
            navigation.navigate('InstructionalScreen', {
              gameObj: data,
              dataTableName: 'Event',
              reloadAllOffersData: true,
            });
          });
        }}>
        <View
          style={[
            styles.eventBlockContainer,
            {
              backgroundColor: bgStylesEvents.liveBg,
            },
          ]}>
          <View style={styles.eventBlocksTeamContainer}>
            <View style={styles.eventBlockTeamLogoAndNameContainer}>
              <TouchableOpacity
                onPress={() =>
                  debounce(() => {
                    navigation.push('OffersModalStack', {
                      screen: 'TeamModal',
                      params: {
                        data: title === 'Soccer' ? 'title' : 'title',
                        dataTableName: 'Event',
                        teamType:
                          title === 'Soccer' ? 'home_team' : 'away_team',
                        isModal: true,
                      },
                    });
                  })
                }>
                {/*<FastImage*/}
                {/*  source={{*/}
                {/*    uri:*/}
                {/*      title === 'Soccer'*/}
                {/*        ? 'https://dummyimage.com/24x24/fff/aaa'*/}
                {/*        : 'https://dummyimage.com/24x24/fff/aaa',*/}
                {/*  }}*/}
                {/*  style={styles.eventBlockTeamLogo}*/}
                {/*/>*/}
              </TouchableOpacity>
              <Text
                style={[
                  styles.eventBlockTeamName,
                  {color: colors.primaryText},
                ]}>
                {title}
              </Text>
            </View>
            <View style={styles.eventBlockTeamLogoAndNameContainer}>
              <TouchableOpacity
                onPress={() =>
                  debounce(() => {
                    navigation.push('OffersModalStack', {
                      screen: 'TeamModal',
                      params: {
                        data: title === 'Soccer' ? title : title,
                        dataTableName: 'Event',
                        teamType:
                          title === 'Soccer' ? 'away_team' : 'home_team',
                        isModal: true,
                      },
                    });
                  })
                }>
                {/*<FastImage*/}
                {/*  source={{*/}
                {/*    uri:*/}
                {/*      title === 'Soccer'*/}
                {/*        ? 'https://dummyimage.com/24x24/fff/aaa'*/}
                {/*        : 'https://dummyimage.com/24x24/fff/aaa',*/}
                {/*  }}*/}
                {/*  style={styles.eventBlockTeamLogo}*/}
                {/*/>*/}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.eventBlockLeagueAndGameStatusContainer}>
        <View style={styles.eventBlockLeagueBlock}>
          <TouchableOpacity onPress={() => {}}>
            {/*<FastImage*/}
            {/*  source={{*/}
            {/*    uri: 'https://dummyimage.com/24x24/fff/aaa',*/}
            {/*  }}*/}
            {/*  style={styles.eventBlockLeagueImage}*/}
            {/*/>*/}
          </TouchableOpacity>
          <Text
            style={[styles.eventBlockLeagueName, {color: colors.primaryText}]}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventBlockContentContainer: {
    paddingBottom: 15,
  },
  eventBlockContainer: {
    padding: 16,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventBlocksTeamContainer: {
    flex: 1,
    minHeight: 85,
    maxHeight: 85,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  eventBlockTeamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventBlockTeamLogoAndNameContainer: {
    width: '80%',
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
});

export default EventBlock;
