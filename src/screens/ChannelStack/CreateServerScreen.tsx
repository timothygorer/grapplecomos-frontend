import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons';
import FontAwesome5 from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FastImage from 'react-native-fast-image';

import {adaptiveFont, getFontFamily} from '../../shared/utils';
import closeX from '../../assets/images/png/close-x/close-x.png';
import {supabase} from '../../services/supabaseClient.js';
import DottedLine from '../../assets/images/svg/javascript_svgs/DottedLine.js';
import {openCamera, openGallery} from '../../services/camera/camera.js';
import {useAuth} from '../../shared/utils/AuthContext.js';

const {width: screenWidth} = Dimensions.get('screen');

const CreateServerScreen = () => {
  const {setProfile} = useAuth();
  const navigation = useNavigation();
  const dark = false;
  const [name, setName] = useState('');
  const [headerPhotoPath, setHeaderPhotoPath] = useState(null);
  const [avatarPhotoPath, setAvatarPhotoPath] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Channel Settings',
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
      ),
      headerTintColor: 'black',
      headerStyle: [
        styles.headerStyle,
        {
          backgroundColor: dark ? '#2F3135' : 'white',
          shadowColor: dark ? 'transparent' : '#595959',
        },
      ],
    });
  }, [dark, navigation]);

  const renderContent = ({title, showTitle, data}) => {
    return (
      <>
        <View style={styles.backgroundContainer}>
          <Image
            source={{
              uri: headerPhotoPath,
            }}
            style={styles.background}
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.defaultAvatarContainer}>
              <Image
                source={{
                  uri: avatarPhotoPath,
                }}
                style={{width: 68, height: 68}}
              />
            </View>
            <TouchableOpacity
              onPress={async () => {
                const imagePath = await openGallery('', '', setProfile);
                console.log('ip', imagePath);
                setAvatarPhotoPath(imagePath);
              }}>
              <Text style={{paddingLeft: 10, paddingBottom: 3}}>Edit Icon</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={async () => {
              const imagePath = await openGallery('', '', setProfile);
              console.log('ip', imagePath);
              setHeaderPhotoPath(imagePath);
            }}>
            <Text
              style={{
                paddingRight: 10,
                paddingBottom: 3,
                alignSelf: 'flex-end',
              }}>
              Edit Cover Photo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity style={styles.itemContainer}>
            <Text style={[styles.itemText, {color: 'black'}]}>{title}</Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Server Name"
              value={name}
              onChangeText={text => setName(text)}
              style={{
                marginTop: 25,
                fontFamily:
                  Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
                fontSize: adaptiveFont(16, 16),
                fontWeight: '400',
                width: screenWidth - 45,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#C6C3C1',
                paddingHorizontal: 16,
                paddingVertical: 14.5,
                shadowRadius: 10,
                shadowOpacity: 0.25,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                elevation: 12,
              }}
              placeholderTextColor={dark ? '#8F8D8A' : 'rgb(79,79,79)'}
            />
          </View>
        </View>
      </>
    );
  };

  const AccountBlockSettingData = {
    showTitle: true,
    title: 'Server Name',
    data: [
      {
        title: 'Private Server',
        callback: () => {},
      },
      {
        title: 'Public Server',
        callback: () => {},
      },
    ],
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <>
        {renderContent(AccountBlockSettingData)}
        <Button
          title={'Continue'}
          onPress={async () => {
            await supabase.from('servers').upsert({name: name});
          }}
        />
      </>
    </ScrollView>
  );
};

export default CreateServerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
  },
  mainItemsBlockContainer: {
    width: screenWidth - 40,
    alignSelf: 'center',
    marginVertical: 12.5,
  },
  headerStyle: {
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },
  itemsContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    borderWidth: Platform.OS === 'ios' ? 0.5 : 1,
  },
  itemsTitle: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(13, 13),
    fontWeight: '700',
    color: 'rgb(151, 150, 148)',
    textTransform: 'uppercase',
  },
  itemMainContainer: {
    marginVertical: 20,
    position: 'relative',
  },
  itemContainer: {
    paddingLeft: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
  },
  dottedLineContainer: {
    position: 'absolute',
    bottom: -20,
  },

  container: {
    backgroundColor: '#FAFAFA',
  },
  backgroundContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFF',
  },
  background: {
    height: 120,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -42,
    marginStart: 16,
  },
  defaultAvatarContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 68,
    width: 68,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderRadius: 50,
    borderColor: '#FFF',
    overflow: 'hidden',
  },
  mainItemsBlockContainer: {
    width: screenWidth - 40,
    alignSelf: 'center',
    marginVertical: 12.5,
  },
  headerStyle: {
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },
  itemsContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    borderWidth: Platform.OS === 'ios' ? 0.5 : 1,
  },
  itemsTitle: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(13, 13),
    fontWeight: '700',
    color: 'rgb(151, 150, 148)',
    textTransform: 'uppercase',
  },
  itemMainContainer: {
    marginVertical: 20,
    position: 'relative',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemIcon: {
    width: 20,
    height: 20,
  },
  itemText: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(16, 16),
  },
  dottedLineContainer: {
    position: 'absolute',
    bottom: -20,
  },
});
