import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum NotificationPreference {
  ALL_MESSAGES = "ALL_MESSAGES",
  MENTIONS = "MENTIONS",
  NONE = "NONE"
}

type EagerUpsertStreamUserResponse = {
  readonly success: boolean;
  readonly message: string;
}

type LazyUpsertStreamUserResponse = {
  readonly success: boolean;
  readonly message: string;
}

export declare type UpsertStreamUserResponse = LazyLoading extends LazyLoadingDisabled ? EagerUpsertStreamUserResponse : LazyUpsertStreamUserResponse

export declare const UpsertStreamUserResponse: (new (init: ModelInit<UpsertStreamUserResponse>) => UpsertStreamUserResponse)

