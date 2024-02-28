// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationPreference = {
  "ALL_MESSAGES": "ALL_MESSAGES",
  "MENTIONS": "MENTIONS",
  "NONE": "NONE"
};

const { UpsertStreamUserResponse } = initSchema(schema);

export {
  NotificationPreference,
  UpsertStreamUserResponse
};