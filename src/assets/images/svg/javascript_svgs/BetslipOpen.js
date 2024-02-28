import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function BetslipOpen(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect
        x={2}
        y={2.5}
        width={21}
        height={20}
        rx={4}
        stroke={props.color}
        strokeWidth={2}
      />
      <Path
        d="M6 7.5h13M6 12.5h10M6 17.5h7"
        stroke={props.color}
        strokeWidth={2}
      />
    </Svg>
  );
}

export default BetslipOpen;
