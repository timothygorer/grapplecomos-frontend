import * as React from 'react';
import Svg, {Line} from 'react-native-svg';

const DottedLine = ({width, height, color}) => (
  <Svg
    width={width || 311}
    height={height || 2}
    xmlns="http://www.w3.org/2000/svg">
    <Line
      x1={0.75}
      y1={1.25}
      x2={width || 311}
      y2={1.25}
      stroke={color || '#E5E5E5'}
      strokeWidth={1.5}
      strokeMiterlimit={3.52094}
      strokeLinecap="round"
      strokeDasharray="3.5 3.5"
    />
  </Svg>
);

export default DottedLine;
