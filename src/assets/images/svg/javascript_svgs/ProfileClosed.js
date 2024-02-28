import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function ProfileClosed(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18.048 17.879c.61.562 1.452 1.325 1.452 2.121-1.456.582-3.935 1.476-7 1.5-2.199.017-4.828-.498-7-1.5 0-.796.842-1.559 1.452-2.121A3.393 3.393 0 019.25 17h6.5c.862 0 1.689.316 2.298.879zM12.5 13.5a4 4 0 100-8 4 4 0 000 8z"
        fill={props.color}
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12.5}
        cy={12.5}
        r={10.5}
        stroke={props.color}
        strokeWidth={2}
      />
    </Svg>
  );
}

export default ProfileClosed;
