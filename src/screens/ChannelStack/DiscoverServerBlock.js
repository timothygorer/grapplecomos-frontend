import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  adaptiveFont,
  getFontFamily,
  getFontWeight,
} from '../../shared/utils/index.js';
import {supabase} from '../../services/supabaseClient';
import {useAuth} from '../../shared/utils/AuthContext';
import {updateServers} from '../../services/user/user';

const DiscoverServerBlock = ({
  item,
  section,
  isCarouselBlock,
  showsImageHeader,
}) => {
  console.log('item: ', item, section);
  const {profile, setProfile} = useAuth();
  const {dark} = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardContainer(isCarouselBlock, dark, showsImageHeader)}>
      {showsImageHeader ? (
        <Image
          source={{uri: 'https://dummyimage.com/300x150/2F3135/fff'}}
          style={styles.headerImage}
        />
      ) : null}
      <Image
        source={{uri: 'https://dummyimage.com/48x48/2F3135/aaa'}}
        style={styles.avatarImage(dark, showsImageHeader)}
      />
      <Text style={styles.titleText(dark, showsImageHeader)}>Event Title</Text>
      <Text style={styles.subtitleText(dark, showsImageHeader)}>
        Subtitle Here
      </Text>
      <Text
        style={styles.descriptionText(dark, showsImageHeader)}
        numberOfLines={3}>
        Description here. You can add more details about the event in this
        space.
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.moreInfoButton}
          onPress={() => {
            console.log('section name:', section?.name);
            navigation.navigate('JoinServerScreen', {
              serverName: section?.name,
            });
          }}>
          <Text style={styles.buttonText}>More Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={async () => {
            console.log('ps is ', profile.servers, section);
            console.log('arr is ', [...profile.servers, section?.name]);
            const updatedProfile = await updateServers(profile.id, [
              ...profile.servers,
              item?.name,
            ]);
            console.log('data is ', updatedProfile);
            setProfile(updatedProfile);
          }}>
          <Text style={styles.buttonText}>
            {profile.servers.filter(serverItem => serverItem === item?.name)
              .length > 0
              ? 'Joined'
              : 'Join +'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
  cardContainer: (isCarouselBlock, dark, showsImageHeader) => ({
    width: isCarouselBlock ? '100%' : 320,
    height: showsImageHeader ? 350 : 225,
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
  avatarImage: (dark, showsImageHeader) => ({
    position: 'absolute',
    left: 15,
    top: showsImageHeader ? 170 : 20,
    height: 48,
    width: 48,
    borderRadius: 24,
  }),
  titleText: (dark, showsImageHeader) => ({
    position: 'absolute',
    left: 70,
    top: showsImageHeader ? 170 : 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: dark ? 'white' : 'black',
  }),
  subtitleText: (dark, showsImageHeader) => ({
    position: 'absolute',
    left: 70,
    top: showsImageHeader ? 190 : 40,
    fontSize: 14,
    color: dark ? 'white' : 'black',
  }),
  descriptionText: (dark, showsImageHeader) => ({
    position: 'absolute',
    top: showsImageHeader ? 210 : 60,
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

export default React.memo(DiscoverServerBlock);
