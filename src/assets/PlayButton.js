import * as React from 'react';
import Svg, {
  G,
  Circle,
  Path,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const PlayButton = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G filter="url(#a)">
      <Circle cx={90} cy={60} r={60} fill="#fff" fillOpacity={0.4} />
      <Circle
        cx={90}
        cy={60}
        r={59.5}
        stroke="url(#b)"
        style={{
          mixBlendMode: 'overlay',
        }}
      />
    </G>
    <G filter="url(#c)">
      <Path
        fill="url(#d)"
        d="M73 58.268c0-12.317 0-18.475 4-20.785 4-2.309 9.333.77 20 6.929l3 1.732c10.666 6.158 16 9.237 16 13.856s-5.334 7.698-16 13.856l-3 1.733c-10.667 6.158-16 9.237-20 6.928-4-2.31-4-8.468-4-20.785v-3.464Z"
      />
    </G>
    <Path
      fill="#281B5A"
      fillOpacity={0.8}
      d="M74.123 39.415c-.845 1.163-1.237 2.71-1.43 4.817-.194 2.105-.194 4.851-.193 8.465V67.303c0 3.614 0 6.36.193 8.465.193 2.108.585 3.654 1.43 4.817a8.5 8.5 0 0 0 5.988 3.457c1.43.15 2.965-.283 4.886-1.17 1.92-.885 4.298-2.258 7.428-4.065l.025-.014 12.6-7.275.024-.014c3.13-1.807 5.509-3.18 7.235-4.4 1.728-1.22 2.871-2.334 3.456-3.647.98-2.2.98-4.714 0-6.914-.585-1.313-1.728-2.426-3.456-3.647-1.726-1.22-4.105-2.593-7.235-4.4l-.024-.014-12.6-7.275-.025-.014c-3.13-1.807-5.508-3.18-7.427-4.065-1.922-.886-3.457-1.32-4.887-1.17a8.5 8.5 0 0 0-5.988 3.457Z"
    />
    <Path
      stroke="#fff"
      d="M74.123 39.415c-.845 1.163-1.237 2.71-1.43 4.817-.194 2.105-.194 4.851-.193 8.465V67.303c0 3.614 0 6.36.193 8.465.193 2.108.585 3.654 1.43 4.817a8.5 8.5 0 0 0 5.988 3.457c1.43.15 2.965-.283 4.886-1.17 1.92-.885 4.298-2.258 7.428-4.065l.025-.014 12.6-7.275.024-.014c3.13-1.807 5.509-3.18 7.235-4.4 1.728-1.22 2.871-2.334 3.456-3.647.98-2.2.98-4.714 0-6.914-.585-1.313-1.728-2.426-3.456-3.647-1.726-1.22-4.105-2.593-7.235-4.4l-.024-.014-12.6-7.275-.025-.014c-3.13-1.807-5.508-3.18-7.427-4.065-1.922-.886-3.457-1.32-4.887-1.17a8.5 8.5 0 0 0-5.988 3.457Z"
      style={{
        mixBlendMode: 'overlay',
      }}
    />
    <Defs>
      <RadialGradient
        id="d"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(12.93728 -48.28258 48.4831 12.991 88.14 61.973)"
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.079} stopColor="#E84545" />
        <Stop offset={0.438} stopColor="#E870FB" />
        <Stop offset={0.613} stopColor="#B3FBF7" />
        <Stop offset={0.847} stopColor="#FAEE87" />
      </RadialGradient>
      <LinearGradient
        id="b"
        x1={30}
        x2={150}
        y1={0}
        y2={120}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#fff" />
        <Stop offset={1} stopOpacity={0.55} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default PlayButton;
