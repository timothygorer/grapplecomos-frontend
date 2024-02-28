import api from './../common/services/api.service';
import commentStorageService from './CommentStorageService';
import {supabase} from '../services/supabaseClient';
import {uuid} from '@supabase/supabase-js/dist/main/lib/helpers';

const decodeUrn = urn => {
  let parts: Array<string> = urn.split(':');

  const obj = {
    entity_guid: parts[2],
    parent_guid_l1: parts[3],
    parent_guid_l2: parts[4],
    parent_guid_l3: parts[5],
    guid: parts[6],
    parent_path: parts[5] ? `${parts[3]}:${parts[4]}:0` : `${parts[3]}:0:0`,
  };

  return obj;
};

type FocusedUrnObjectType = ReturnType<typeof decodeUrn>;

/**
 * Get a single comment
 * @param {string} entity_guid
 * @param {string} guid
 * @param {string} parent_path
 */
export async function getComment(entity_guid, guid, parent_path) {
  const {data, error} = await supabase
    .from('comments')
    .select('*')
    .eq('guid', guid)
    .maybeSingle();
  return data;
}

/**
 * Get comments
 * @param {string} guid
 * @param {boolean} reversed
 * @param {string} offset
 * @param {integer} limit
 */
export async function getComments(
  focusedCommentUrn,
  entity_guid,
  parent_path,
  level,
  limit,
  loadNext,
  loadPrevious,
  descending,
) {
  let focusedUrnObject: FocusedUrnObjectType | null = focusedCommentUrn
    ? decodeUrn(focusedCommentUrn)
    : null;
  if (focusedUrnObject) {
    if (entity_guid !== focusedUrnObject.entity_guid) {
      focusedCommentUrn = null; //wrong comment thread to focus on
    }
    if (loadNext || loadPrevious) {
      focusedCommentUrn = null; //can not focus and have pagination
    }
    if (focusedCommentUrn && parent_path === '0:0:0') {
      loadNext = focusedUrnObject.parent_guid_l1;
    }
    if (
      focusedCommentUrn &&
      parent_path === `${focusedUrnObject.parent_guid_l1}:0:0`
    ) {
      loadNext = focusedUrnObject.parent_guid_l2;
    }
    if (
      focusedCommentUrn &&
      parent_path ===
        `${focusedUrnObject.parent_guid_l1}:${focusedUrnObject.parent_guid_l2}:0`
    ) {
      loadNext = focusedUrnObject.guid;
    }
  }

  const opts = {
    entity_guid,
    parent_path,
    focused_urn: focusedCommentUrn,
    limit: limit,
    'load-previous': loadPrevious || null,
    'load-next': loadNext || null,
  };
  
  let uri = `api/v2/comments/${opts.entity_guid}/0/${opts.parent_path}`;

  let response, data, error;

  console.log('pp is ', opts.parent_path, opts.entity_guid);

  ({data, error} = await supabase.rpc('get_comments', {
    p_entity_guid: opts.entity_guid,
    p_parent_path: opts.parent_path,
    limit_val: 10,
    descending: false,
  }));

  console.log(
    'comment result is ',
    data,
    error,
    opts.entity_guid,
    opts.parent_path,
  );

  try {
    // response = await api.get(uri, opts);
    commentStorageService.write(
      entity_guid,
      parent_path,
      descending,
      loadNext || loadPrevious,
      focusedCommentUrn,
      {comments: data},
    );
  } catch (err) {
    // response = commentStorageService.read(
    //   entity_guid,
    //   parent_path,
    //   descending,
    //   loadNext || loadPrevious,
    //   focusedCommentUrn,
    // );
    // if there is no local data we throw the exception again
    // if (!response) throw err;
  }

  if (focusedCommentUrn && focusedUrnObject) {
    for (let comment of response.comments) {
      switch (level) {
        case 0:
          comment.expanded =
            comment.child_path === `${focusedUrnObject.parent_guid_l1}:0:0`;
          break;
        case 1:
          comment.expanded =
            comment.child_path ===
            `${focusedUrnObject.parent_guid_l1}:${focusedUrnObject.parent_guid_l2}:0`;
          break;
        default:
          console.log('Level out of scope', level);
      }
      comment.focused = comment._guid === focusedUrnObject.guid;
    }
  }

  //only use once
  focusedCommentUrn = null;
  return {comments: data};
}

/**
 * Post a comment
 * @param {string} guid
 * @param {object} comment
 */
export async function postComment(guid, comment) {
  let entity, entityError, data, error;
  console.log('posting comment', comment);
  ({data: entity, error: entityError} = await supabase
    .from('entities_activity')
    .select('*')
    .eq('guid', guid)
    .maybeSingle());
  console.log('fetched entity to be: ', entity);
  if (entity) {
    let child_path;
    const parent_guid_l1 = comment?.parent_path.split(':')[0];
    const parent_guid_l2 = comment?.parent_path.split(':')[1];
    const generatedUuid = uuid();

    if (parent_guid_l1 === '0') {
      child_path = generatedUuid + ':0:0';
    } else if (parent_guid_l2 === '0') {
      child_path = parent_guid_l1 + `:${generatedUuid}:0`;
    } else {
      child_path = parent_guid_l1 + `:${parent_guid_l2}:${generatedUuid}`;
    }

    ({data, error} = await supabase
      .from('comments')
      .upsert({
        guid: generatedUuid,
        entity_guid: entity.guid,
        description: comment?.comment,
        parent_guid_l1,
        parent_guid_l2,
        child_path,
        can_reply: parent_guid_l2 === '0' || !parent_guid_l2,
      })
      .select('*')
      .maybeSingle());
    // return api.post(`api/v1/comments/${guid}/`, comment);
    console.log('data is', data, error);
  }
  return data;
}

/**
 * Delete a comment
 * @param {string} guid
 */
export async function deleteComment(guid) {
  const {data, error} = await supabase
    .from('comments')
    .delete()
    .eq('guid', guid);
  console.log('deleted ', data, error);
  // return api.delete(`api/v1/comments/${guid}/`);
}

/**
 * Update a comment
 * @param {string} guid
 * @param {any} comment
 */
export async function updateComment(guid, comment) {
  const {data, error} = await supabase
    .from('comments')
    .update({description: comment?.comment})
    .eq('guid', guid);
  console.log('updated comment:', data, error);
  return data;
  // return api.post(`api/v1/comments/update/${guid}`, comment);
}

/**
 * Enable/Disable comments
 * @param {string} guid
 * @param {boolean} state
 */
export function toggleAllowComments(guid, state) {
  return api.post(`api/v2/permissions/comments/${guid}`, {
    allowed: state,
  });
}
