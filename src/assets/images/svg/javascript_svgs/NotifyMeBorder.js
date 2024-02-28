import * as React from 'react';
import Svg, {Rect, Defs, LinearGradient, Stop} from 'react-native-svg';

const NotifyMeBorder = props => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      x={1}
      y={1}
      width={props.width - 2}
      height={props.height - 2}
      rx={15}
      stroke="url(#a)"
      strokeWidth={2}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={0}
        x2={97.262}
        y2={157.332}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#9E00FE" />
        <Stop offset={0.479} stopColor="#6058F8" />
        <Stop offset={1} stopColor="#1ED761" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default NotifyMeBorder;
