// import {
//   LivepeerConfig,
//   createReactClient,
//   studioProvider,
// } from '@livepeer/react-native';
import {observer} from 'mobx-react';
import {useMemo} from 'react';
import mindsConfigService from '../../common/services/minds-config.service';

export const ConfigProvider = observer(({children}) => {
  const API_KEY = mindsConfigService.getSettings()?.livepeer_api_key;

  // return <LivepeerConfig client={client}>{children}</LivepeerConfig>;
  return null;
});
