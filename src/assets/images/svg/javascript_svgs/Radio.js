import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Radio(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12.18 5.82a4.5 4.5 0 010 6.367m-6.36-.007a4.5 4.5 0 010-6.368m8.483-2.115a7.5 7.5 0 010 10.605m-10.606 0a7.5 7.5 0 010-10.605"
        stroke="#EC174C"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Radio;
