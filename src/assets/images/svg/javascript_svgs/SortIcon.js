import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SortIcon = ({width = 24, height = 24, color = 'black'}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M16.5 16.5v-8M13 11.5L16.5 8l3.5 3.5M7.5 8v8M11 13l-3.5 3.5L4 13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SortIcon;
