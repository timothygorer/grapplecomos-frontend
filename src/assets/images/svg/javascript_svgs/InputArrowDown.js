import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const InputArrowDown = ({width, height, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={color}
    className="bi bi-caret-down-fill">
    <Path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z" />
  </Svg>
);

export default InputArrowDown;
