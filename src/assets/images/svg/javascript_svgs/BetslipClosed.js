import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BetslipClosed(props) {
  return (
    <Svg
      width={25}
      height={26}
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M2 7.428a4 4 0 014-4h13a4 4 0 014 4v12a4 4 0 01-4 4H6a4 4 0 01-4-4v-12zM6 8.428h13M6 13.428h13M6 18.428h13"
        stroke={props.color}
        strokeWidth={2}
      />
    </Svg>
  );
}

export default BetslipClosed;
