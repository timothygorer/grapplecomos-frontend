import * as React from 'react';
import Svg, {Line} from 'react-native-svg';
const LineIcon = ({width, height}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Line y1={0.75} x2={width} y2={0.75} stroke="#B3B3B3" strokeWidth={0.5} />
  </Svg>
);
export default LineIcon;
