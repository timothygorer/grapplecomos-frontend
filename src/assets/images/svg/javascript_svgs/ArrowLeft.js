import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowLeft = ({size, color = 'black'}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowLeft;
