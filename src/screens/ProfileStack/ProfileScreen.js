import React, {useLayoutEffect} from 'react';
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useDebounce} from '../../hooks/useDebounce';
import {useAuth} from '../../shared/utils/AuthContext';
import {useRefresh} from '../../hooks/useRefresh';
import NavigationBar from '../../components/general/NavigationBar.js';
import ProfileInfoCard from '../HomeStack/NotesScreens/ProfileInfoCard';
import BlurIconButton from '../../components/Home/BlurIconButton';
import {useHeaderHeight} from '@react-navigation/elements';

const ProfileScreen = () => {
  const {colors, dark: darkTheme} = useTheme();
  const {profile, setProfile, authStatus} = useAuth();
  const {debounce} = useDebounce();
  // const authenticationData = useSelector(state => state.authenticationData);
  const navigation = useNavigation();
  const [isRefreshing, startRefreshing] = useRefresh();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleRefresh = () => startRefreshing();

  useFocusEffect(
    React.useCallback(() => {
      if (authStatus === 'SIGNED_IN' && profile && profile.username) {
      } else {
      }
    }, [isRefreshing, authStatus]),
  );

  return (
    <View style={{backgroundColor:'black',flex:1}}>
      <NavigationBar
        title={'Profile'}
        leftButton={() => (  <BlurIconButton
            iconType={'Ionicons'}
            name={'arrow-back'}
            size={18}
            onPress={() => navigation.goBack()}
        />)}
        isModal={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <ProfileInfoCard email={profile?.email ?? ''} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
