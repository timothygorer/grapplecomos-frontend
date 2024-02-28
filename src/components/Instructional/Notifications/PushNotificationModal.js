import {useTheme} from '@react-navigation/native';
import React, {useState, memo} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
// import FastImage from 'react-native-fast-image';
import CloseX from '../../../assets/images/svg/javascript_svgs/CloseX';
import {getFontFamily, adaptiveFont} from '../../../shared/utils';
import {supabase} from '../../../services/supabaseClient';
import {useDispatch, useSelector} from 'react-redux';
import {
  setUserNotificationPreferences,
  updateUser,
} from '../../../redux/actions/authenticationActions';
import {updateNotificationPreferences} from '../../../services/user/user';
import {useAuth} from '../../../shared/utils/AuthContext';

const {height: screenHeight} = Dimensions.get('screen');

const PushNotificationModal = ({
  handlerVisiblePushNotificationModal,
  gameObj,
  tabType,
}) => {
  const {colors, dark: darkTheme} = useTheme();

  let {
    name,
    event, // null if coming from EventsTab, so must check with tabType which tab we came from
  } = gameObj;

  const {profile, setProfile} = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Markets',
      isActive: false,
    },
    {
      id: 2,
      title: 'Scores',
      isActive: false,
    },
    {
      id: 3,
      title: 'Game started',
      isActive: false,
    },
  ]);

  React.useEffect(() => {
    const market_preferences = profile?.notification_preferences.markets ?? [];
    const score_preferences = profile?.notification_preferences.scores ?? [];
    const game_started_preferences =
      profile?.notification_preferences.game_started ?? [];
    const notify_about_markets = market_preferences.find(
      market_preference =>
        market_preference ===
        (tabType === 'Event' || tabType === 'Team' ? name : event),
    );
    const notify_about_scores = score_preferences.find(
      score_preference =>
        score_preference ===
        (tabType === 'Event' || tabType === 'Team' ? name : event),
    );
    const notify_about_game_started = game_started_preferences.find(
      game_preference =>
        game_preference ===
        (tabType === 'Event' || tabType === 'Team' ? name : event),
    );

    if (notify_about_markets) {
      setNotifications(
        notifications.map(el => {
          if (el.title === 'Markets') {
            el.isActive = true;
          }
          return el;
        }),
      );
    }

    if (notify_about_scores) {
      setNotifications(
        notifications.map(el => {
          if (el.title === 'Scores') {
            el.isActive = true;
          }
          return el;
        }),
      );
    }

    if (notify_about_game_started) {
      setNotifications(
        notifications.map(el => {
          if (el.title === 'Game started') {
            el.isActive = true;
          }
          return el;
        }),
      );
    }
  }, []);

  const changeHandler = id => {
    if (profile) {
      // Note, profile being null should not happen because I check if profile is null before presenting the PushNotificationModal. This is a precaution.
      setNotifications(
        notifications.map(el => {
          if (el.id === id) {
            el.isActive = !el.isActive;
            return el;
          } else {
            return el;
          }
        }),
      );

      let updated_notification_preferences = {};

      notifications.map(async el => {
        if (el.id === id) {
          try {
            switch (el.title) {
              case 'Markets':
                updated_notification_preferences = {
                  ...profile?.notification_preferences,
                  markets: el.isActive
                    ? [
                        ...profile?.notification_preferences.markets,
                        tabType === 'Event' || tabType === 'Team'
                          ? name
                          : event,
                      ]
                    : profile?.notification_preferences.markets?.filter(
                        market =>
                          market !==
                          (tabType === 'Event' || tabType === 'Team'
                            ? name
                            : event),
                      ) ?? [],
                };
                break;
              case 'Scores':
                updated_notification_preferences = {
                  ...profile?.notification_preferences,
                  scores: el.isActive
                    ? [
                        ...profile?.notification_preferences.scores,
                        tabType === 'Event' || tabType === 'Team'
                          ? name
                          : event,
                      ]
                    : profile?.notification_preferences.scores?.filter(
                        game =>
                          game !==
                          (tabType === 'Event' || tabType === 'Team'
                            ? name
                            : event),
                      ) ?? [],
                };
                break;
              case 'Game started':
                updated_notification_preferences = {
                  ...profile?.notification_preferences,
                  game_started: el.isActive
                    ? [
                        ...(profile?.notification_preferences.game_started ??
                          []),
                        tabType === 'Event' || tabType === 'Team'
                          ? name
                          : event,
                      ]
                    : profile?.notification_preferences.game_started?.filter(
                        game =>
                          game !==
                          (tabType === 'Event' || tabType === 'Team'
                            ? name
                            : event),
                      ) ?? [],
                };
                break;
              default:
                break;
            }

            const updatedProfile = await updateNotificationPreferences(
              profile.id,
              updated_notification_preferences,
            );
            setProfile(updatedProfile);
          } catch (error) {
            alert(error.message);
          }
        }
      });
    } else {
      alert('Some server error occurred.');
    }
  };

  const notificationItems = notifications.map(item => (
    <View onStartShouldSetResponder={() => true}>
      <TouchableOpacity
        onPress={() => changeHandler(item.id)}
        style={styles.pushNotificationModalItemContainer}>
        <Text
          style={[
            styles.pushNotificationModalItemText,
            {color: colors.primaryText},
          ]}>
          {item.title}
        </Text>
        {item.isActive
          ? null
          : // <FastImage
            //   source={{uri: 'https://dummyimage.com/40x40/fff/aaa'}}
            //   style={styles.pushNotificationActiveIcon}
            // />
            null}
      </TouchableOpacity>
    </View>
  ));

  return (
    <View
      style={[
        styles.pushNotificationModalContainer,
        {backgroundColor: darkTheme ? '#121212' : colors.backgroundColor},
      ]}>
      <View style={styles.pushNotificationModalHeader}>
        <Text
          style={[
            styles.pushNotificationModalTitle,
            {color: colors.primaryText},
          ]}>
          Push Notifications
        </Text>
        <Text
          style={[
            styles.pushNotificationModalSubtitle,
            {color: colors.primaryText},
          ]}
        />
        <TouchableOpacity
          onPress={handlerVisiblePushNotificationModal}
          style={styles.pushNotificationModalCloseButton}>
          <CloseX color={colors.primaryText} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.pushNotificationModalBody}
        showsVerticalScrollIndicator={false}>
        {notificationItems}
      </ScrollView>
    </View>
  );
};

export default memo(PushNotificationModal);

const styles = StyleSheet.create({
  pushNotificationModalContainer: {
    flex: 1,
    marginTop: screenHeight * 0.6,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 25,
  },
  pushNotificationModalHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pushNotificationModalTitle: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(20, 20),
    fontWeight: '700',
  },
  pushNotificationModalSubtitle: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(15, 15),
    fontWeight: '400',
  },
  pushNotificationModalCloseButton: {
    position: 'absolute',
    right: -5,
    top: -10,
  },
  pushNotificationModalBody: {
    flexDirection: 'column',
    height: '100%',
  },
  pushNotificationModalItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  pushNotificationActiveIcon: {
    width: 40,
    height: 40,
  },
  pushNotificationModalItemText: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(18, 18),
    fontWeight: '500',
  },
});
