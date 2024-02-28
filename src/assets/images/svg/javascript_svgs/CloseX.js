import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CloseX = props => (
  <Svg
    width={28}
    height={28}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...props}>
    <Path
      d="M18 6 6 18M6 6l12 12"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CloseX;
