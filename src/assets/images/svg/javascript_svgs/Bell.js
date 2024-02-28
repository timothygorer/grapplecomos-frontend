import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Bell = ({height = 24, width = 24, color = 'black'}) => (
  <Svg
    width={width}
    height={height}
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9ZM14 18l-.27 2a2 2 0 0 1-3.46 0L10 18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Bell;
