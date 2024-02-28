import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {updateHome} from '../redux/slices/homeSlice';
import {supabase} from '../services/supabaseClient';

export const useSubscribeToSupabase = (tableName, columnName, columnValue) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('fire useEffect in useSubscribeToSupabase hook');
    // const mySubscription = supabase
    //   .from('Market')
    //   .on('*', payload => {
    //     console.log('fire b/c table was modified in some way');
    //     updateHome(payload.eventType, payload);
    //   })
    //   .subscribe();

    console.log('success?');

    return () => {
      // supabase.removeSubscription(mySubscription);
    };
  }, []);

  const rtUpdate = async (eventType, payload) => {
    switch (eventType) {
      case 'UPDATE':
        dispatch(updateHome(payload));

        break;
      default:
        break;
    }
  };
};
