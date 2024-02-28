import Modal from 'react-native-modal';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import React from 'react';

const DEVICE_SCREEN_WIDTH = Dimensions.get('window').width;
const DEVICE_SCREEN_HEIGHT = Dimensions.get('window').height;

const CustomModal = ({
  isVisible,
  children,
  closeModal,
  hasBackdrop,
  heightCloseModal,
  style,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={closeModal}
      onBackButtonPress={closeModal}
      swipeDirection={Platform.OS === 'ios' ? 'down' : null}
      propagateSwipe={true}
      hideModalContentWhileAnimating={true}
      animationInTiming={500}
      animationOutTiming={500}
      deviceWidth={DEVICE_SCREEN_WIDTH}
      onBackdropPress={closeModal}
      deviceHeight={DEVICE_SCREEN_HEIGHT}
      hasBackdrop={hasBackdrop}
      swipeThreshold={heightCloseModal}
      useNativeDriverForBackdrop={true}
      style={[styles.modal, style]}>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    borderTopLeftRadius: Platform.OS === 'ios' ? 22 : 0,
    borderTopRightRadius: Platform.OS === 'ios' ? 22 : 0,
  },
});

export default CustomModal;
