import React, {forwardRef, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, Platform, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
// import AppLovinMAX from 'react-native-applovin-max';

const {width: screenWidth} = Dimensions.get('screen');

export const NativeEmbeddedAd = forwardRef((props, ref) => {
  const {adUnitId} = props;
  const nativeAdViewRef = useRef();

  useEffect(() => {
    nativeAdViewRef.current.loadAd();
  }, []);

  // return (
  //   <AppLovinMAX.NativeAdView
  //     adUnitId="2d729012f25a78f2"
  //     placement="myplacement"
  //     customData="mycustomdata"
  //     ref={nativeAdViewRef}
  //     style={styles.nativead}>
  //     <View style={{flex: 1, flexDirection: 'column'}}>
  //       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
  //         <AppLovinMAX.NativeAdView.IconView style={styles.icon} />
  //         <View style={{flexDirection: 'column', flexGrow: 1}}>
  //           <AppLovinMAX.NativeAdView.TitleView style={styles.title} />
  //           <AppLovinMAX.NativeAdView.AdvertiserView
  //             style={styles.advertiser}
  //           />
  //         </View>
  //         <AppLovinMAX.NativeAdView.OptionsView style={styles.optionsView} />
  //       </View>
  //       <AppLovinMAX.NativeAdView.BodyView style={styles.body} />
  //       <AppLovinMAX.NativeAdView.MediaView style={styles.mediaView} />
  //       <AppLovinMAX.NativeAdView.CallToActionView
  //         style={styles.callToAction}
  //       />
  //     </View>
  //   </AppLovinMAX.NativeAdView>
  // );
  return null
});

const styles = StyleSheet.create({
  nativead: {
    margin: 10,
    padding: 10,
    height: 350,
    backgroundColor: '#EFEFEF',
  },
  title: {
    fontSize: 20,
    marginTop: 4,
    marginHorizontal: 5,
    textAlign: 'left',
    fontWeight: 'bold',
    alignItems: 'center',
    color: 'black',
  },
  icon: {
    margin: 5,
    height: 40,
    aspectRatio: 1,
    borderRadius: 5,
  },
  optionsView: {
    height: 20,
    width: 20,
    backgroundColor: '#EFEFEF',
  },
  advertiser: {
    marginHorizontal: 5,
    marginTop: 2,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
    color: 'gray',
  },
  body: {
    height: 'auto',
    fontSize: 14,
    marginVertical: 8,
  },
  mediaView: {
    flexGrow: 1,
    height: 'auto',
    width: '100%',
    backgroundColor: 'black',
  },
  callToAction: {
    padding: 5,
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    backgroundColor: '#2d545e',
  },
});

export default NativeEmbeddedAd;
