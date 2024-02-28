import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

const ActiveBell = ({height = 25, width = 24, color = 'black'}) => {
  return (
    <Svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_4844_4100)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.55 3.05a7 7 0 018.82-.883c.034.023.067.048.098.075a6.833 6.833 0 013.813.513 1 1 0 11-.814 1.827 4.833 4.833 0 102.866 4.417v-.536a1 1 0 112 0V9a6.835 6.835 0 01-3.331 5.865c.269.456.524.775.716.984a3.198 3.198 0 00.348.327A1 1 0 0121.5 18h-6c0 .044-.003.089-.009.134l-.27 2c-.018.13-.06.255-.126.368a3.002 3.002 0 01-5.19 0 1 1 0 01-.126-.368l-.27-2a1.008 1.008 0 01-.01-.134H3.5a1 1 0 01-.566-1.824l.002-.002a3.037 3.037 0 00.306-.283c.225-.238.548-.637.88-1.245C4.782 13.435 5.5 11.353 5.5 8a7 7 0 012.05-4.95zM11.51 18l.22 1.634a1 1 0 001.541 0L13.49 18H11.51z"
          fill={color}
        />
        <Path
          d="M23.333 4.333l-5.833 5.84-1.75-1.75"
          stroke="#1ED761"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4844_4100">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ActiveBell;
