import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const FilterModalIcon = ({color = '#262626'}) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path stroke={color} strokeWidth={2} d="M4 8L22 8" />
      <Circle cx={3} cy={8} r={2} stroke="#9E00FE" strokeWidth={2} />
      <Path stroke={color} strokeWidth={2} d="M2 16L20 16" />
      <Circle cx={21} cy={16} r={2} stroke="#9E00FE" strokeWidth={2} />
    </Svg>
  );
};

export default FilterModalIcon;
