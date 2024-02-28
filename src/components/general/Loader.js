import React from 'react';
import {View} from 'react-native';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import {useNavigation, useTheme} from '@react-navigation/native';

export default function Loader(index) {
  const lines = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const {colors, dark: darkTheme} = useTheme();
  const {backgroundColor} = colors;

  return lines.map(i => {
    return (
      <View
        style={{alignSelf: 'center', flex: 1}}
        onStartShouldSetResponder={() => true}>
        <ContentLoader
          height={100}
          width={340}
          speed={1}
          backgroundColor={backgroundColor}
          viewBox="0 0 380 70"
          key={i}>
          <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
      </View>
    );
  });
}
