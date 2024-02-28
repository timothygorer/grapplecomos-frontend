import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {supabase} from '../../src/services/supabaseClient';

export const useGetInstructionalVolumeNames = (
  eventName,
  setTabNames,
  setHasMarkets,
  eventStatus,
  isPastEvent,
  reloadAllOffersData,
  setReloadAllOffersData,
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (reloadAllOffersData) {
      console.log('reload offers data... ');
      (async () => {
        const marketTabs = await getMarketTabNamesForEvent(eventName);
        setTabNames(marketTabs);
        if (marketTabs.length > 0) {
          setHasMarkets(true);
        }
        setReloadAllOffersData(false);
      })();
    }
  }, [reloadAllOffersData]);

  const getMarketTabNamesForEvent = async eventName => {
    let tabs = [];
    let additionalTabs = [];
    let index = -1;

    const {data, error} = await supabase
      .from('subtile')
      .select('*')
      .eq('dvd_title', eventName);
    return data.map((item, index) => {
      return {
        ...item,
        name: 'Volume ' + item.volume_number,
        key: 'Volume ' + item.volume_number,
        title: 'Volume ' + item.volume_number,
        index,
      };
    });
  };
};
