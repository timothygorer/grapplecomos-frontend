import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const LiveRadioIcon = () => {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8 9.333a1.333 1.333 0 100-2.666 1.333 1.333 0 000 2.666zM10.827 5.173a4 4 0 010 5.66m-5.654-.006a4 4 0 010-5.66m7.54-1.88a6.667 6.667 0 010 9.426m-9.426 0a6.667 6.667 0 010-9.426"
        stroke="#EC174C"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LiveRadioIcon;
