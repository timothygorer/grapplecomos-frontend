import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ShareSvg = ({width = 24, height = 24, color = 'black'}) => (
  <Svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ShareSvg;
