import {supabase} from '../services/supabaseClient';
import {useQuery} from '@tanstack/react-query';

export const useGetVolumeChaptersData = (
  eventName,
  marketName,
  marketType,
  marketSubtype,
  sortOption,
  eventStatus,
  isAlternate,
  alternateMarkets,
  isProps,
  propsMarkets,
) => {
  console.log('running the hook.');

  const getMarketTabData = async () => {
    try {
      console.log('mn', marketName);
      const {data, error} = await supabase
        .from('chapter')
        .select('*')
        .eq('volume_title', eventName + ' - ' + marketName);
      console.log(
        "eventName + ' - ' + marketName is ",
        eventName + ' - ' + marketName,
      );
      return data;
    } catch (e) {
      console.log('An error occurred while calling getMarketTabData: ', e);
    }
  };

  return useQuery(
    ['offers', eventName, marketType, marketSubtype, sortOption],
    getMarketTabData,
    {enabled: false},
  );
};
