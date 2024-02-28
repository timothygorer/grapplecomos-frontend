import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
// import FastImage from 'react-native-fast-image';
import arrowIconLeft from '../../assets/images/png/arrow-icon-left/arrow-icon-left.png';
import arrowIconRight from '../../assets/images/png/arrow-icon-right/arrow-icon-right.png';
import {useNavigation} from '@react-navigation/native';
import CloseX from '../../assets/images/svg/javascript_svgs/CloseX';
import closeX from '../../assets/images/png/close-x/close-x.png';
import {useDebounce} from '../../hooks/useDebounce';
import BlurIconButton from '../Home/BlurIconButton';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export const WebViewModal = props => {
  const {url, title} = props.route.params;
  const navigation = useNavigation();
  const ref = React.useRef();
  const canGoBack = React.useRef();
  const [hiddenBackButton, setHiddenBackButton] = React.useState(true);
  const {debounce} = useDebounce();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerRight: () => (
        <View style={{marginRight: 12}}>
          <BlurIconButton
            iconType={'AntDesign'}
            name={'close'}
            size={18}
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
      headerLeft: () => null,
      headerTitle: title,
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitleStyle: {color: 'white'},
    });
  }, [hiddenBackButton]);

  return (
    <>
      <WebView
        ref={ref}
        source={{
          uri: url,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  webViewModalContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    borderTopLeftRadius: Platform.OS === 'ios' ? 22 : 0,
    borderTopRightRadius: Platform.OS === 'ios' ? 22 : 0,
  },
  webViewModalHeaderComponentStyle: {
    paddingTop: 25,
    paddingBottom: 15,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
