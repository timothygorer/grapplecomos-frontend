import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const RefreshIcon = ({width, height, color}) => (
  <Svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M15.3333 2.6665V6.6665H11.3333"
      stroke={color}
      strokeWidth={1.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M0.666656 13.3335V9.3335H4.66666"
      stroke={color}
      strokeWidth={1.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.33999 5.99989C2.6781 5.04441 3.25275 4.19016 4.0103 3.51683C4.76786 2.84351 5.68363 2.37306 6.67218 2.14939C7.66073 1.92572 8.68983 1.95612 9.66345 2.23774C10.6371 2.51936 11.5235 3.04303 12.24 3.75989L15.3333 6.66655M0.666656 9.33322L3.75999 12.2399C4.47649 12.9567 5.36291 13.4804 6.33653 13.762C7.31015 14.0437 8.33925 14.0741 9.3278 13.8504C10.3163 13.6267 11.2321 13.1563 11.9897 12.4829C12.7472 11.8096 13.3219 10.9554 13.66 9.99989"
      stroke={color}
      strokeWidth={1.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RefreshIcon;
