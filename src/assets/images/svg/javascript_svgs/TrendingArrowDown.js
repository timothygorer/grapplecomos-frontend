import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const TrendingArrowDown = ({width = 18, height = 16, color = 'black'}) => {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M16.537 12l-6.334-6.333L6.87 9l-5-5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.537 12h4V8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TrendingArrowDown;
