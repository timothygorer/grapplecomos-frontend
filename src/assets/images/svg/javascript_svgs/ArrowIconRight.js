import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowIconRight = ({wight, height, color}) => (
  <Svg
    width={wight || 8}
    height={height || 14}
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M1 1L7 7L1 13"
      stroke={color || '#262626'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowIconRight;
