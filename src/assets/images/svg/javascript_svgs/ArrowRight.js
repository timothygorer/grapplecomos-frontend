import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowRight = ({width = 6, height = 10, color = 'black'}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 6 10"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M1 1l4 4-4 4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowRight;
