//@ts-nocheck
import api from './../../common/services/api.service';
import {supabase} from '../../services/supabaseClient';
import {uuid} from '@supabase/supabase-js/dist/main/lib/helpers';

/**
 * Vote an activity
 * @param {string} guid
 * @param {string} direction up|down
 * @param {*} data extra data
 */
export async function vote(guid, user_guid, direction) {
  const {data, error} = await supabase.from('votes').upsert({
    user_guid,
    entity_guid: guid,
    direction: direction === 'up' ? 1 : 2,
  });
  console.log('de is', data, error);
  return data;
}
