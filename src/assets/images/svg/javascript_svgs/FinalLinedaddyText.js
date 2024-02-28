import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {
  LinearGradient,
  Stop,
  Defs,
  Text,
  TSpan,
  Circle,
  G,
} from 'react-native-svg';

const FinalLineDaddyText = ({dark}) => {
  return (
    <View style={styles.container}>
      <Svg height="25" width="190">
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="100%" y2="100%">
            <Stop offset="0.69" stopColor="#4D4BBD" stopOpacity="1" />
            <Stop
              offset="0.94"
              stopColor={dark ? '#FFFFFF' : '#000000'}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        <Text
          fill="url(#gradient)"
          fontSize="20"
          fontWeight="bold"
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central">
          GRAPPLECOSMOS
        </Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default FinalLineDaddyText;
