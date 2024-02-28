import * as React from 'react';
import Svg, {G, Path, Circle, Defs, ClipPath} from 'react-native-svg';

function ProfileOpen(props) {
  return (
    <Svg
      width={25}
      height={26}
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1154_2422)" stroke={props.color} strokeWidth={2}>
        <Path
          d="M19.5 20.5c0-.796-.842-1.559-1.452-2.121a3.392 3.392 0 00-2.298-.879h-6.5c-.862 0-1.689.316-2.298.879-.61.562-1.452 1.325-1.452 2.121M12.5 14a4 4 0 100-8 4 4 0 000 8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx={12.5} cy={13} r={10.5} />
      </G>
      <Defs>
        <ClipPath id="clip0_1154_2422">
          <Path fill="#fff" transform="translate(1 1.5)" d="M0 0H23V23H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ProfileOpen;
