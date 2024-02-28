import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HeartOpen(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M21.708 4.802a5.728 5.728 0 00-8.104 0L12.5 5.906l-1.104-1.104a5.73 5.73 0 00-8.104 8.104l1.104 1.104 8.104 8.105 8.104-8.105 1.104-1.104a5.728 5.728 0 000-8.104v0z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HeartOpen;
