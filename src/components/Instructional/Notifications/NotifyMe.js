import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Bell from '../../../assets/images/svg/javascript_svgs/Bell';
import {getFontFamily, adaptiveFont} from '../../../shared/utils';
import CustomModal from '../../general/CustomModal';
import PushNotificationModal from './PushNotificationModal';
// import LinearGradient from 'react-native-linear-gradient';
import ActiveBell from '../../../assets/images/svg/javascript_svgs/ActiveBell';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const NotifyMe = ({notification, style, onPress}) => {
  const {dark, colors} = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const handleModalVisible = () => setModalVisible(!modalVisible);

  return (
      <>
    {/*<LinearGradient*/}
    {/*  colors={['#231076', '#004851']}*/}
    {/*  start={{x: 0, y: 0}}*/}
    {/*  end={{x: 1, y: 0}}*/}
    {/*  style={[styles.notifyMeContainer, style]}>*/}
      <CustomModal
        isVisible={modalVisible}
        closeModal={handleModalVisible}
        heightCloseModal={screenHeight * 0.1}>
        <PushNotificationModal
          handlerVisiblePushNotificationModal={handleModalVisible}
        />
        {/*<LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{}} />*/}
      </CustomModal>
      <View
        style={[
          styles.contentContainer,
          {backgroundColor: dark ? '#202224' : 'white'},
        ]}>
        <TouchableOpacity
          onPress={onPress}
          style={styles.notifyMeTextContainer}>
          {notification ? (
            <ActiveBell color={dark ? 'white' : 'black'} />
          ) : (
            <Bell color={'#9E00FE'} width={24} height={24} />
          )}
          <Text style={[styles.notifyMeText, {color: colors.primaryText}]}>
            {notification
              ? 'New odds notifications enabled'
              : 'Notify Me of Updates'}
          </Text>
        </TouchableOpacity>
      </View>
  </>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  notifyMeContainer: {
    minHeight: 100,
    zIndex: 12,
    width: screenWidth - 20,
    padding: 2,
    borderRadius: 12,
    position: 'relative',
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    flexGrow: 1,
  },
  notifyMeText: {
    fontFamily: Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
    fontSize: adaptiveFont(14, 14),
    fontWeight: '700',
    marginLeft: 5,
  },
  notifyMeTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default NotifyMe;
