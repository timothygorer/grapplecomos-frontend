import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Check = ({width = 24, height = 24, color = '#9E00FE'}) => (
  <Svg width={width} height={height}>
    <Path
      d="M10.246 13.453l-2.768-2.768a.56.56 0 00-.791 0l-.791.79a.56.56 0 000 .792l3.955 3.955a.56.56 0 00.79 0l7.12-7.12a.56.56 0 000-.79l-.79-.791a.56.56 0 00-.792 0l-5.933 5.932z"
      fill={color}
    />
  </Svg>
);

export default Check;
