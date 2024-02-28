import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function Close(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={11.5} cy={11.5} r={11} stroke={props.color} />
      <Path
        d="M16 7l-9 9m0-9l9 9"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Close;
