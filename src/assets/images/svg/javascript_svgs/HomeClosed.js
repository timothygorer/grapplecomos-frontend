import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HomeClosed(props) {
  return (
    <Svg
      width={25}
      height={26}
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M2 12.389L12.44 2.382 23 12.392V24h-7.5v-5.99a3.063 3.063 0 00-3.063-3.062A2.937 2.937 0 009.5 17.885V24H2V12.389z"
        fill={props.color}
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeClosed;
