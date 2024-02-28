import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation, useTheme} from '@react-navigation/native';

import {adaptiveFont, getFontFamily, getFontWeight} from '../../shared/utils';

const FilterRow = () => {
  const {colors, dark: darkTheme} = useTheme();
  const {borderColor, primaryText, secondaryText} = colors;
  const options = ['Teams', 'Players'];

  const handleOptionFilterPress = () => {};

  const renderItem = item => {
    const isActive = true;
    const gradientColor = ['#9E00FE', '#6058F8'];

    return isActive ? (
      <TouchableOpacity
        onPress={() => handleOptionFilterPress(item)}
        // key={'key-' + item.id}
      >
        <LinearGradient
          colors={gradientColor}
          style={styles.gradient}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}>
          <View
            style={{
              backgroundColor: darkTheme ? 'rgb(41, 41, 41)' : '#DCDEE0',
              paddingHorizontal: 1,
              paddingVertical: 1,
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                fontSize: adaptiveFont(14, 15),
                textAlign: 'left',
                color: darkTheme ? 'rgb(255,255,255)' : '#060606',
                fontWeight: getFontWeight('medium'),
                fontFamily:
                  Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
              }}>
              {/* {item.sport_name} */}
              {item}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <View
        key={'key-' + item.id}
        style={{
          marginLeft: 15,
          paddingHorizontal: 1,
          paddingVertical: 1,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => handleOptionFilterPress(item)}
          style={{
            backgroundColor: darkTheme ? 'rgb(41, 41, 41)' : '#DCDEE0',
            justifyContent: 'center',
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 30,
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              fontSize: adaptiveFont(14, 15),
              textAlign: 'left',
              color: primaryText,
              fontWeight: getFontWeight('medium'),
              fontFamily:
                Platform.OS === 'ios' ? getFontFamily('text') : 'SFUIDisplay',
            }}>
            {/* {item.sport_name} */}
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={{flexDirection: 'row', marginVertical: 16}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}>
          {options.map(renderItem)}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    marginLeft: 15,
    paddingHorizontal: 1,
    paddingVertical: 1,
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default FilterRow;
