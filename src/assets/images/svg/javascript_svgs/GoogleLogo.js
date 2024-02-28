import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const GoogleLogo = ({width, height}) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.48 9.153c0-.478-.043-.938-.123-1.38H9v2.61h3.633a3.105 3.105 0 01-1.347 2.038v1.694h2.181c1.277-1.175 2.013-2.906 2.013-4.962z"
      fill="#4285F4"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 15.75c1.822 0 3.35-.604 4.467-1.635l-2.181-1.694c-.605.405-1.378.644-2.286.644-1.758 0-3.246-1.187-3.777-2.782H2.968v1.748A6.747 6.747 0 009 15.75z"
      fill="#34A853"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.223 10.283A4.057 4.057 0 015.011 9c0-.445.077-.877.212-1.282v-1.75H2.968a6.747 6.747 0 000 6.063l2.255-1.748z"
      fill="#FBBC05"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 4.935c.991 0 1.88.34 2.58 1.01l1.936-1.937C12.347 2.918 10.82 2.25 9 2.25a6.747 6.747 0 00-6.032 3.719l2.255 1.748C5.753 6.123 7.242 4.936 9 4.936z"
      fill="#EA4335"
    />
  </Svg>
);

export default GoogleLogo;
