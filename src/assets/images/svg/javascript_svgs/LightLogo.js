import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

const LightLogo = ({firstColor, secondColor}) => (
  <Svg width={150} height={25} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M0 0h5.863v19.964h8.058v5.126H0V0Z" fill="url(#a)" />
    <Path d="M16.133 0h5.9v25.09h-5.9V0Z" fill="url(#b)" />
    <Path
      d="M24.839 0h5.953l2.86 7.95c.851 2.362 1.505 4.406 1.96 6.133h.306l-.144-4.245V0h5.612v25.09H35.45l-2.86-7.95c-.85-2.362-1.504-4.412-1.96-6.15h-.324l.144 4.244v9.856H24.84V0Z"
      fill="url(#c)"
    />
    <Path
      d="M44.192 0h14.299v5.054h-8.453v4.604h7.878v4.91h-7.878v5.396h8.453v5.126H44.192V0Z"
      fill="url(#d)"
    />
    <Path
      d="M60.722 0h7.32c2.195 0 4.017.516 5.468 1.547 1.45 1.031 2.482 2.5 3.094 4.406.623 1.907.935 4.011.935 6.313 0 3.873-.875 6.979-2.626 9.317-1.739 2.338-4.293 3.507-7.662 3.507h-6.529V0Zm5.845 4.874V20.18h.414c3.034 0 4.55-2.746 4.55-8.237 0-2.123-.33-3.831-.989-5.126-.647-1.295-1.714-1.943-3.201-1.943h-.773Z"
      fill="url(#e)"
    />
    <Path
      d="M83.305 0h5.81l6.6 25.09h-6.367l-.88-4.982h-4.785l-.935 4.982h-5.99L83.305 0Zm2.788 6.853-1.6 8.759h3.165l-1.565-8.76Z"
      fill="url(#f)"
    />
    <Path
      d="M97.658 0h7.32c2.195 0 4.017.516 5.468 1.547 1.451 1.031 2.482 2.5 3.094 4.406.623 1.907.935 4.011.935 6.313 0 3.873-.875 6.979-2.626 9.317-1.739 2.338-4.293 3.507-7.662 3.507h-6.529V0Zm5.845 4.874V20.18h.414c3.034 0 4.551-2.746 4.551-8.237 0-2.123-.33-3.831-.99-5.126-.647-1.295-1.714-1.943-3.201-1.943h-.774Z"
      fill="url(#g)"
    />
    <Path
      d="M116.49 0h7.32c2.195 0 4.017.516 5.468 1.547 1.451 1.031 2.482 2.5 3.094 4.406.623 1.907.935 4.011.935 6.313 0 3.873-.875 6.979-2.626 9.317-1.739 2.338-4.293 3.507-7.662 3.507h-6.529V0Zm5.845 4.874V20.18h.414c3.034 0 4.551-2.746 4.551-8.237 0-2.123-.33-3.831-.99-5.126-.647-1.295-1.714-1.943-3.201-1.943h-.774Z"
      fill="url(#h)"
    />
    <Path
      d="M132.464 0h6.601l2.14 7.95L143.309 0H150l-5.917 13.597V25.09h-5.864V13.597L132.464 0Z"
      fill="url(#i)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={0}
        x2={150}
        y2={25}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={firstColor} />
        <Stop offset={1} stopColor={secondColor} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={0}
        y1={0}
        x2={150}
        y2={25}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={firstColor} />
        <Stop offset={1} stopColor={secondColor} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={0}
        y1={0}
        x2={150}
        y2={25}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={firstColor} />
        <Stop offset={1} stopColor={secondColor} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={0}
        y1={0}
        x2={150}
        y2={25}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={firstColor} />
        <Stop offset={1} stopColor={secondColor} />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={0}
        y1={0}
        x2={150}
        y2={25}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={firstColor} />
        <Stop offset={1} stopColor={secondColor} />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={0}
        y1={0}
        x2={150}
        y2={25}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={firstColor} />
        <Stop offset={1} stopColor={secondColor} />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={0}
        y1={0}
        x2={150}
        y2={25}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={firstColor} />
        <Stop offset={1} stopColor={secondColor} />
      </LinearGradient>
      <LinearGradient
        id="h"
        x1={0}
        y1={0}
        x2={150}
        y2={25}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={firstColor} />
        <Stop offset={1} stopColor={secondColor} />
      </LinearGradient>
      <LinearGradient
        id="i"
        x1={0}
        y1={0}
        x2={150}
        y2={25}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={firstColor} />
        <Stop offset={1} stopColor={secondColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default LightLogo;
