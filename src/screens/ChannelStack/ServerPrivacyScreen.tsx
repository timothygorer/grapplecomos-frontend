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
import Ionicons from 'react-native-vector-icons';
// import FastImage from 'react-native-fast-image';

import {adaptiveFont, getFontFamily} from '../../shared/utils';
import closeX from '../../assets/images/png/close-x/close-x.png';
import {supabase} from '../../services/supabaseClient.js';
import DottedLine from '../../assets/images/svg/javascript_svgs/DottedLine.js';

const {width: screenWidth} = Dimensions.get('screen');

const ServerPrivacyScreen = () => {
  const navigation = useNavigation();
  const dark = false;
  const [continuePressed, setContinuePressed] = useState(false);
  const [name, setName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: continuePressed ? 'Create Server' : 'Channel Settings',
      headerLeft: () =>
        continuePressed ? (
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => setContinuePressed(false)}
          />
        ) : null,
      headerTintColor: 'black',
      headerStyle: [
        styles.headerStyle,
        {
          backgroundColor: dark ? '#2F3135' : 'white',
          shadowColor: dark ? 'transparent' : '#595959',
        },
      ],
      headerRight: () => (
        <View style={{right: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={closeX}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [dark, navigation, continuePressed]);

  const renderContent = ({title, showTitle, data}) => {
    return !continuePressed ? (
      <View style={styles.mainItemsBlockContainer}>
        {showTitle && <Text style={styles.itemsTitle}>{title}</Text>}
        <View
          style={[
            styles.itemsContainer,
            {
              borderColor: 'rgb(198, 195, 193)',
              backgroundColor: 'white',
              shadowColor: '#595959',
            },
          ]}>
          {data.map(({title, callback}, index) => (
            <View style={styles.itemMainContainer}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => setSelectedIndex(index)}>
                <Text style={[styles.itemText, {color: 'black'}]}>{title}</Text>
                {/*{selectedIndex === index ? (*/}
                {/*  // <AntDesign name="checkcircle" size={24} color="black" />*/}
                {/*) : (*/}
                {/*  // <FontAwesome5 name="circle" size={24} color="black" />*/}
                {/*)}*/}
              </TouchableOpacity>
              {index !== data.length - 1 && (
                <View style={styles.dottedLineContainer}>
                  <DottedLine
                    width={screenWidth - 70}
                    height={2}
                    color={'#E5E5E5'}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    ) : (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setContinuePressed(true)}>
          <Text style={[styles.itemText, {color: 'black'}]}>{title}</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Server Name"
            value={continuePressed}
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
    );
  };

  const AccountBlockSettingData = {
    showTitle: true,
    title: 'Choose a privacy setting',
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

  const AppBlockSettingData = {
    showTitle: true,
    title: 'Public Server',
    data: [],
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {continuePressed ? (
        renderContent(AppBlockSettingData)
      ) : (
        <>
          {renderContent(AccountBlockSettingData)}
          <Button
            title={'Continue'}
            onPress={() => navigation.navigate('CreateServerScreen')}
          />
        </>
      )}
      {continuePressed ? (
        <Button
          title="Create Server"
          onPress={async () => {
            console.log('cserver');
            await supabase.from('servers').upsert({name: name});
          }}
        />
      ) : null}
    </ScrollView>
  );
};

export default ServerPrivacyScreen;

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
});
