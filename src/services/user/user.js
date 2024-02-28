import {StackActions} from '@react-navigation/routers';
import {supabase} from '../supabaseClient.js';
// import Purchases from 'react-native-purchases';
import {ENTITLEMENT_ID} from '../../shared/constants';
import {Alert, Linking} from 'react-native';
import {navigate, navigationRef} from '../../shared/utils';
import {
  getCompletedOnboardingAsyncStorage,
  setCompletedOnboardingAsyncStorage,
} from '../../shared/utils/helpers';
import axios from 'axios';
// import * as Sentry from '@sentry/react-native';

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ------ SETTERS ------- */

// Updates the username of the user with the given id
// If the user with given id does not exist, then throws an error.
// @param id
// @param username
// Returns: User with given id in 'profiles' table, having an updated username. Or throws error if failed to update profile.
export const updateUsername = async (id, username) => {
  let data, supabaseError;

  try {
    if (!username) {
      throw new Error('Username parameter is null');
    }

    if (!id) {
      throw new Error('id parameter is null');
    }

    const payload = {
      updated_at: new Date(),
      username: username,
    };

    ({data, error: supabaseError} = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single());

    if (supabaseError) {
      throw supabaseError;
    }
    return data;
  } catch (error) {
    console.error('Error occurred: ', error.message);
    throw error;
  }
};

// Updates the first & last name of the user with the given id
// If the user with given id does not exist, then throws an error.
// @param id
// @param firstNameText
// @param lastNameText
// Returns: User with given id in 'profiles' table, having an updated first & last name. Or throws error if failed to update profile.
export const updateFirstAndLastName = async (
  id,
  firstNameText,
  lastNameText,
) => {
  let data, supabaseError;

  try {
    if (!id) {
      throw new Error("profile does not have key 'id'");
    }

    const payload = {
      updated_at: new Date(),
      first_name: firstNameText,
      last_name: lastNameText,
    };

    ({data, error: supabaseError} = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single());

    if (supabaseError) {
      throw supabaseError;
    }
    return data;
  } catch (error) {
    console.error('Error occurred in updateFirstAndLastName: ', error.message);
    throw error;
  }
};

// Updates the avatar url of the user with the given id
// If the user with given id does not exist, then throws an error.
// @param id
// @param avatarUrl
// Returns: User with given id in 'profiles' table, having an updated avatar url. Or throws error if failed to update profile.
export const updateAvatarUrl = async (id, avatarUrl) => {
  let data, supabaseError;

  try {
    if (!avatarUrl) {
      throw new Error('avatarUrl parameter is null');
    }

    const payload = {
      updated_at: new Date(),
      avatar_url: avatarUrl,
    };

    ({data, error: supabaseError} = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single());

    if (supabaseError) {
      throw supabaseError;
    }
    return data;
  } catch (error) {
    console.error('Error occurred in updateAvatarUrl: ', error.message);
    throw error;
  }
};

export const updateSavedNotes = async (id, saved_notes) => {
  let data, supabaseError;

  try {
    if (!saved_notes) {
      throw new Error('saved_notes parameter is null');
    }

    const payload = {
      id,
      updated_at: new Date(),
      saved_notes: saved_notes,
    };

    ({data, error: supabaseError} = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single());

    if (supabaseError) {
      throw supabaseError;
    }
    return data;
  } catch (error) {
    console.error('Error occurred in updateSavedNotes: ', error.message);
    throw error;
  }
};

export const updateNotificationPreferences = async (
  id,
  notification_preferences,
) => {
  let data, supabaseError;

  try {
    if (!notification_preferences) {
      throw new Error('notification_preferences parameter is null');
    }

    const payload = {
      id,
      updated_at: new Date(),
      notification_preferences: notification_preferences,
    };

    ({data, error: supabaseError} = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single());

    if (supabaseError) {
      throw supabaseError;
    }
    return data;
  } catch (error) {
    console.error(
      'Error occurred in updateNotificationPreferences: ',
      error.message,
    );
    throw error;
  }
};

export const updateOneSignalPlayerIds = async (id, os_player_ids) => {
  let data, supabaseError;

  try {
    if (!os_player_ids) {
      throw new Error('os_player_ids parameter is null');
    }

    const payload = {
      id,
      updated_at: new Date(),
      onesignal_player_ids: os_player_ids,
    };

    ({data, error: supabaseError} = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single());

    if (supabaseError) {
      throw supabaseError;
    }
    return data;
  } catch (error) {
    console.error(
      'Error occurred in updatedOneSignalPlayerIds: ',
      error.message,
    );
    throw error;
  }
};

export const updateServers = async (id, servers) => {
  let data, supabaseError;

  try {
    if (!servers) {
      throw new Error('servers parameter is null');
    }

    const payload = {
      id,
      updated_at: new Date(),
      servers,
    };

    ({data, error: supabaseError} = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single());

    if (supabaseError) {
      throw supabaseError;
    }
    return data;
  } catch (error) {
    console.error('Error occurred in updateServers: ', error.message);
    throw error;
  }
};

/* ------- GETTERS ------- */

// if the username is set, the profile is complete
// @param profile: The profile dictionary fetched from supabase
// Returns: true if the username is set for the given profile, false otherwise. Or throws error if profile is null/undefined.
export const profileComplete = profile => {
  try {
    if (!profile) {
      throw new Error('profile passed to profileComplete is null/undefined.');
    }
    // given that profile is a dictionary, profile['username'] would evaluate to undefined - falsey - if 'username' not a key,
    // or to null - falsey - if profile['username']'s value is null,
    // or would evaluate to true if 'username' is set to a string
    return profile.username;
  } catch (error) {
    console.error(
      "profileComplete failed; profile doesn't have 'username' as a key in its dictionary.",
    );
    throw error;
  }
};

// @param username: desired username string
// Returns: true if username already exists, false otherwise. Or throws error if status code is not 200.
export const usernameExists = async username => {
  try {
    let data, error, count;
    ({data, error, count} = await supabase.rpc(
      'get_public_profile',
      {
        user_name: username,
      },
      {count: 'exact'},
    ));

    console.log(username, data, error, count);

    return count === 1;
  } catch (e) {
    console.error('Error occurred in usernameExists: ', e);
    throw new Error('Error occurred in usernameExists');
  }
};

// Function does either:
// 1. If profile doesn't exist with given id, creates profile with the given id and 3rd party oauth or magic link email. Receive the profile in the 'data' variable.
// 2. If profile exists with given id, then all that happens is we receive the profile in the 'data' variable.
// The function is convenient because we don't have to make an additional API call to check if the profile exists.
// @param loginType: either 'phone' or 'email'
// @param emailOrPhoneValue: either a valid phone number w/format +14081234567 or valid email address.
// @param id: supabase 'profile' table id.
// Returns: Either the created or existing profile, or throws an Error if there was a problem getting profile or loginType/emailOrPhoneValue/id are invalid
export const createOrGetProfile = async (loginType, emailOrPhoneValue, id) => {
  let data, supabaseError;

  try {
    if (loginType !== 'email' && loginType !== 'phone') {
      throw new Error('invalid parameter loginType');
    }

    if (!id) {
      throw new Error('id passed to createOrGetProfile is null/undefined.');
    }

    if (!emailOrPhoneValue) {
      throw new Error(
        'emailOrPhoneValue passed to createOrGetProfile is null/undefined.',
      );
    }

    const updates =
      loginType === 'email'
        ? {
            id: id,
            email: emailOrPhoneValue,
          }
        : {
            id: id,
            phone: emailOrPhoneValue,
          };

    ({data, error: supabaseError} = await supabase
      .from('profiles')
      .upsert(updates)
      .select()
      .single());

    console.log('data,spberr', data, supabaseError);

    if (supabaseError) {
      throw new Error('createOrGetProfile error: ', supabaseError, data);
    }

    return data;
  } catch (error) {
    console.error(
      'Failed to fetch profile. Error occurred with createOrGetProfile ',
      error,
    );
    throw error;
  }
};

// Gets the updated profile with the given id from the profiles table.
// Returns: the profile with given id, or throws error if the profile doesn't exist.
export const getProfile = async id => {
  try {
    if (!id) {
      throw new Error('id passed to getProfile is null/undefined.');
    }

    let {data, error} = await supabase
      .from('profiles')
      .select('*', {count: 'exact'})
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error while calling getProfile: ', error);
    alert('Some error occurred with auto-login.');
    throw error;
  }
};

// @param currentUsername: can be null or the desired username.
// @param userTextInput: cannot be null. Must be a string.
export const usernameBelongsToSelf = async (currentUsername, userTextInput) => {
  if (!userTextInput) {
    throw new Error(
      'currentUsername or userTextInput passed to usernameBelongsToSelf is null/undefined.',
    );
  }

  return currentUsername === userTextInput;
};

export const getPlacedBets = async bettor_id => {
  console.log('ready, aim');
  const result = await supabase
    .from('betslips')
    .select('*, bets (*)')
    .order('timeplaced', {ascending: false})
    .range(0, 9);

  console.log('betslip result is: ');
  return result;
};

export const getAllBettorAccountsForBettor = async bettor_id => {
  try {
    let {data, error, status} = await supabase
      .from('bettoraccounts')
      .select('*')
      .eq('bettor', bettor_id);

    if (error) {
      throw error;
    }

    return {data, error, status};
  } catch (error) {
    throw new Error('Error occurred in getAllBettorAccountsForBettor: ', error);
  }
};

export const getBettorDetails = async internal_id => {
  try {
    const url = `https://api.sharpsports.io/v1/bettors/${internal_id}`;

    const {data} = await axios.get(url, {
      headers: {
        Authorization: 'Token 0d1cbfa29e78e87dd11c3c5ab7babd5d5b564930',
      },
    });

    return data;
  } catch (error) {
    console.log('Error caught in getBettorDetails: ', error);
  }
};

// export const premiumUser = async () => {
//   try {
//     const purchaserInfo = await Purchases.getCustomerInfo().catch(e => {
//       throw e;
//     });
//     console.log('purchaser info is ', purchaserInfo);
//
//     if (
//       typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
//     ) {
//       return true;
//     }
//   } catch (error) {
//     console.error('Error occurred: ', error.message);
//     throw error;
//   }
//   return false;
// };

// export const getRevenueCatPackages = async () => {
//   try {
//     const packages = [];
//     const offers = await Purchases.getOfferings();
//     if (offers.current && offers.current.annual) {
//       const annualPackage = offers.current.annual;
//       console.log(annualPackage);
//       packages.push(annualPackage);
//     }
//
//     if (offers.all['LD Monthly Beta'].availablePackages.length !== 0) {
//       const monthlyPackage =
//         offers.all['LD Monthly Beta'].availablePackages?.[0] ?? {};
//       console.log(monthlyPackage);
//       packages.push(monthlyPackage);
//     }
//
//     return packages;
//   } catch (error) {
//     console.error('Error occurred: ', error.message);
//     // Sentry.captureException(error);
//   }
//   return false;
// };
