import {Dimensions} from 'react-native';
import {leagues_data} from './leagueData';

export const containerHeight =
  Dimensions.get('window').height - (Dimensions.get('window').height - 611.5);
export const screen = {
  headerStyle: {
    height: 105,
    top: 10,
  },
};

export const bookmakerNamesToLogos = {
  '888sport':
    'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/888sport_logo.png',
  BetMGM:
    'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/BetMGM_logo.png',
  Caesars:
    'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/Caesars_logo.png',
  DraftKings:
    'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/DraftKings_logo.png?t=2022-10-15T18%3A32%3A50.819Z',
  FanDuel:
    'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/FanDuel_logo.png?t=2022-10-15T18%3A33%3A24.183Z',
  Parx: 'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/Parx_logo.png?t=2022-10-15T18%3A33%3A38.431Z',
  PointsBet:
    'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/PointsBet_logo.png?t=2022-10-15T18%3A33%3A47.723Z',
  RiversCasino:
    'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/RiversCasino_logo.png',
  SugarHouse:
    'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/SugarHouse_logo.png',
  Unibet:
    'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/Unibet_logo.png?t=2022-10-15T18%3A34%3A15.993Z',
  WilliamHill: '',
  Barstool: '',
  BetRivers: '',
  WynnBet: '',
};

export const bookmakersData = [
  {
    bookFullName: '888sport',
    bookShortName: '',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/888sport_logo.png',
  },
  {
    bookFullName: 'BetMGM',
    bookShortName: 'mg',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/BetMGM_logo.png',
  },
  {
    bookFullName: 'Caesars',
    bookShortName: '',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/Caesars_logo.png',
  },
  {
    bookFullName: 'DraftKings',
    bookShortName: '',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/DraftKings_logo.png?t=2022-10-15T18%3A32%3A50.819Z',
  },
  {
    bookFullName: 'FanDuel',
    bookShortName: 'fd',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/FanDuel_logo.png?t=2022-10-15T18%3A33%3A24.183Z',
  },
  {
    bookFullName: 'Parx',
    bookShortName: '',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/Parx_logo.png?t=2022-10-15T18%3A33%3A38.431Z',
  },
  {
    bookFullName: 'PointsBet',
    bookShortName: 'pb',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/PointsBet_logo.png?t=2022-10-15T18%3A33%3A47.723Z',
  },
  {
    bookFullName: 'RiversCasino',
    bookShortName: '',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/RiversCasino_logo.png',
  },
  {
    bookFullName: 'Sugar House',
    bookShortName: '',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/SugarHouse_logo.png',
  },
  {
    bookFullName: 'SugarHouseNJ',
    bookShortName: '',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/SugarHouse_logo.png',
  },
  {
    bookFullName: 'Unibet',
    bookShortName: '',
    bookLogo:
      'https://dwsqypgpdheienqjkyfy.supabase.co/storage/v1/object/public/operator-logos/Unibet_logo.png?t=2022-10-15T18%3A34%3A15.993Z',
  },
  {
    bookFullName: 'WilliamHill',
    bookShortName: '',
    bookLogo: '',
  },
  {
    bookFullName: 'Barstool',
    bookShortName: '',
    bookLogo: '',
  },
  {
    bookFullName: 'BetRivers',
    bookShortName: '',
    bookLogo: '',
  },
  {
    bookFullName: 'WynnBet',
    bookShortName: '',
    bookLogo: '',
  },
];

export const defaultTeamHomeColor = '#004851';
export const defaultTeamAwayColor = '#231076';
export const whiteThemeGradient = ['#fff', '#fff'];
export const secondGradient = [
  'rgba(18, 18, 18, 0.5)',
  'rgba(18, 18, 18, 0.1)',
  'rgba(18, 18, 18, 0)',
];
export const thirdGradient = ['rgba(18, 18, 18, 0.25)', '#121212'];
export const imagePlaceholder = 'https://dummyimage.com/90x90/2F3135/fff';

export const bookmakerIdsToNames = {
  12: 'Parx',
  9: 'SugarHouse',
  10: 'SugarHouse',
  14: 'RiversCasino',
  19: 'WilliamHill',
  20: 'WynnBet',
  23: 'PointsBet',
  24: 'BetMGM',
  31: 'Barstool',
  25: 'Unibet',
  7: 'DraftKings',
  8: 'FanDuel',
  22: '',
};

// parx 12, sugarhouse 9/10, rivers 14, williamhill 19, wynnbet 20, pointsbet 23, betmgm 24, barstool 31, unibet 25, draftkings 7, fanduel 8, betrivers 14, 22, 19,

export const ENTITLEMENT_ID = 'standard_group';

export {leagues_data};
