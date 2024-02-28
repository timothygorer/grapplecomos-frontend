import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
} from 'react-native';
import SectionRow from '../../../components/Home/SectionRow';
import CloseX from '../../../assets/images/svg/javascript_svgs/CloseX';
import {BlurView} from 'expo-blur';
import {FontAwesome5} from '@expo/vector-icons';
import BlurButton from '../../../components/Home/BlurButton';
import BlurIconButton from '../../../components/Home/BlurIconButton';
import {useNavigation} from '@react-navigation/native';
// import YoutubePlayer from "react-native-youtube-iframe";

const InstructionalInfoCard = ({isInstructional = true, section, onPress}) => {
  const navigation = useNavigation();

  return (
    <View>
      <BlurView style={[styles.container]} tint={'dark'}>
        <View style={styles.textContainer}>
          {isInstructional && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {section.vol > 1 && (
                <BlurIconButton
                  iconType={'Ionicons'}
                  name={'arrow-back'}
                  size={18}
                  borderRadius={10}
                  onPress={() => {
                    console.log('ns.');
                    navigation.navigate('NotesScreen', {
                      move_id: 1,
                      vol: section.vol - 1,
                    });
                  }}
                  color={'white'}
                />
              )}
              <Text
                style={{marginHorizontal: 20}}>{`Volume ${section.vol}`}</Text>
              {section.vol < section.numVolumes && (
                <BlurIconButton
                  iconType={'Ionicons'}
                  name={'arrow-forward'}
                  size={18}
                  borderRadius={10}
                  onPress={() => {
                    console.log('ns.');
                    navigation.navigate('NotesScreen', {
                      move_id: 1,
                      vol: section.vol + 1,
                    });
                  }}
                  color={'white'}
                />
              )}
            </View>
          )}
          <Text style={styles.title1}>{section?.name ?? ''}</Text>
          {/*<Text style={styles.description}>*/}
          {/*  {section?.description ??*/}
          {/*    'This is a beautiful description of this move. It works well in gi and no gi.'}*/}
          {/*</Text>*/}
          {/*<View style={styles.divider} />*/}
          {/*<View*/}
          {/*  style={{*/}
          {/*    flexDirection: 'row',*/}
          {/*    alignItems: 'center',*/}
          {/*    justifyContent:'center',*/}
          {/*    marginTop: 12,*/}
          {/*  }}>*/}
          {/*    <BlurIconButton name={'instagram'} iconType={'FontAwesome5'} size={24} color={'white'} onPress={async () => {*/}
          {/*      const canOpen = await Linking.canOpenURL('https://www.instagram.com/reel/CzWQIeTMwSj/')*/}
          {/*      if (canOpen) {*/}
          {/*        await Linking.openURL('https://www.instagram.com/reel/CzWQIeTMwSj/');*/}
          {/*      }*/}
          {/*    }}/>*/}
          {/*    <Text style={{paddingLeft:8, color:'white'}}>View video</Text>*/}
          {/*</View>*/}
        </View>
      </BlurView>
    </View>
  );
};

export default InstructionalInfoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.60)',
    shadowColor: 'rgba(69, 42, 124, 0.15)',
    shadowOffset: {
      width: 0,
      height: 30, // This corresponds to the vertical shadow
    },
    shadowOpacity: 0.15, // This is the opacity of the shadow
    shadowRadius: 30, // This is the blur radius
    width: 350,
  },
  button: {
    position: 'absolute',
    top: '50%',
    marginTop: -12, // half the size of the button for vertical centering
  },
  leftButton: {
    left: 5,
  },
  rightButton: {
    right: 5,
  },
  // container: {
  //   overflow:'hidden',
  //   paddingHorizontal: 20,
  //   paddingVertical: 30,
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   borderBottomLeftRadius: 30,
  //   borderBottomRightRadius: 30,
  //   borderWidth: 1,
  //   borderColor: 'rgba(255, 255, 255, 0.60)',
  //   shadowColor: 'rgba(69, 42, 124, 0.15)',
  //   shadowOffset: {
  //     width: 0,
  //     height: 30, // This corresponds to the vertical shadow
  //   },
  //   shadowOpacity: 0.15, // This is the opacity of the shadow
  //   shadowRadius: 30, // This is the blur radius
  //   flexDirection: 'row',
  //   marginLeft: 20,
  //   marginRight: 20,
  //   width: 350,
  // },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D1D1D6', // System background color with 0.3 opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  textContainer: {
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 12,
    color: '#6C6C6C',
  },
  title: {
    fontWeight: '600', // semibold
  },
  text: {
    fontSize: 12,
    color: '#6C6C6C',
  },
  title1: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 34,
    letterSpacing: 0.364,
    textAlign: 'center',
  },
  description: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 13,
    fontWeight: '400', // This corresponds to the normal font weight
    lineHeight: 18,
    letterSpacing: -0.078,
    marginVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,255,0.40)', // Adjust this color
    marginVertical: 8,
  },
  authors: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600', // Bold weight
    lineHeight: 18,
    letterSpacing: -0.078,
    marginLeft: 24,
  },
});
