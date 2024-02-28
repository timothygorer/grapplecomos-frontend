import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import {BlurView, VibrancyView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

const NavigationBar = ({
  title,
    titleFontSize = 34,
  showTitle = true,
  leftButton = null,
  firstRightButton,
  secondRightButton,
  isModal = false,
}) => {
  return (
    <View style={styles.container(isModal)}>
      <View style={styles.blurContainer(leftButton)}>
        {leftButton && (
          <View style={{marginLeft: 8, marginRight: 16}}>{leftButton()}</View>
        )}
        {showTitle && <Text style={styles.title(titleFontSize)}>{title}</Text>}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: 8}}>
            {firstRightButton && firstRightButton()}
          </View>
          <View style={{marginLeft: 8}}>
            {secondRightButton && secondRightButton()}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: isModal => ({
    height: 100,
    width: '100%',
    backgroundColor: 'transparent',
    paddingTop: isModal ? 0 : 60,
  }),
  blurContainer: leftButton => ({
    flex: 1,
    flexDirection: 'row',
    justifyContent: leftButton ? 'flex-start' : 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  }),
  title: fontSize => ({
    fontWeight: 'bold',
    fontSize: fontSize,
    color: 'white',
  }),
});

export default NavigationBar;
