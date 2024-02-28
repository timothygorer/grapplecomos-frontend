import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const TrendingArrowUp = ({width = 18, height = 16, color = 'black'}) => {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M16.333 4L10 10.333 6.667 7l-5 5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.333 4h4v4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TrendingArrowUp;
