import {
  defaultTeamHomeColor,
  defaultTeamAwayColor,
  whiteThemeGradient,
} from '../constants/index';

const colors = [
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
];

export const checkColor = color => colors.includes(color?.toLowerCase());
export const getModalGradientColor = (teamData, theme) => {
  console.log(
    'first color is ',
    checkColor(teamData?.primary_color?.toLowerCase()),
    checkColor(teamData?.secondary_color?.toLowerCase()),
  );
  const firstColor =
    teamData?.primary_color?.toLowerCase() ?? defaultTeamHomeColor;
  const secondColor =
    teamData?.secondary_color?.toLowerCase() ?? defaultTeamAwayColor;
  console.log(
    'theme ? [firstColor, secondColor] : whiteThemeGradient; is ',
    theme ? [firstColor, secondColor] : whiteThemeGradient,
  );

  return theme ? [firstColor, secondColor] : whiteThemeGradient;
};
export const getLogoColor = teamData => {
  const firstColor = checkColor(teamData?.primary_color?.toLowerCase())
    ? teamData?.primary_color?.toLowerCase()
    : defaultTeamHomeColor;
  const secondColor = checkColor(teamData?.secondary_color?.toLowerCase())
    ? teamData?.secondary_color?.toLowerCase()
    : defaultTeamAwayColor;

  return [firstColor, secondColor];
};

export const getGradientBg = (homeTeamData, awayTeamData, teamType, theme) => {
  const homeTeamPrimaryColor = checkColor(
    homeTeamData?.primary_color?.toLowerCase(),
  )
    ? homeTeamData?.primary_color?.toLowerCase()
    : defaultTeamHomeColor;
  const awayTeamPrimaryColor = checkColor(
    awayTeamData?.primary_color?.toLowerCase(),
  )
    ? awayTeamData?.primary_color?.toLowerCase()
    : defaultTeamAwayColor;
  const screenFirstBgGradientColors = theme
    ? [homeTeamPrimaryColor, awayTeamPrimaryColor]
    : whiteThemeGradient;
  const logoColors = [homeTeamPrimaryColor, awayTeamPrimaryColor];

  return {
    screenFirstBgGradientColors,
    logoColors,
  };
};
