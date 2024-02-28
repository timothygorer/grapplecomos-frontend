import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const IconPlus = ({height, width, color}) => {
  return (
    <Svg
      width={height || 24}
      height={width || 24}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 5v14M5 12h14"
        stroke={color || '#9E00FE'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconPlus;
