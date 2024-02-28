import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import {gqlFetcher} from '../common/services/api.service';
import {supabase} from '../services/supabaseClient';
import axios from 'axios';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
  Void: {input: any; output: any};
};

export type ActivityEdge = EdgeInterface & {
  __typename?: 'ActivityEdge';
  cursor: Scalars['String']['output'];
  explicitVotes: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  node: ActivityNode;
  type: Scalars['String']['output'];
};

export type ActivityNode = NodeInterface & {
  __typename?: 'ActivityNode';
  /** Relevant for images/video posts. A blurhash to be used for preloading the image. */
  blurhash?: Maybe<Scalars['String']['output']>;
  commentsCount: Scalars['Int']['output'];
  guid: Scalars['String']['output'];
  hasVotedDown: Scalars['Boolean']['output'];
  hasVotedUp: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  impressionsCount: Scalars['Int']['output'];
  /** The activity has comments enabled */
  isCommentingEnabled: Scalars['Boolean']['output'];
  legacy: Scalars['String']['output'];
  message: Scalars['String']['output'];
  nsfw: Array<Scalars['Int']['output']>;
  nsfwLock: Array<Scalars['Int']['output']>;
  owner: UserNode;
  ownerGuid: Scalars['String']['output'];
  /** Unix timestamp representation of time created */
  timeCreated: Scalars['Int']['output'];
  /** ISO 8601 timestamp representation of time created */
  timeCreatedISO8601: Scalars['String']['output'];
  /** Relevant for images/video posts */
  title?: Maybe<Scalars['String']['output']>;
  urn: Scalars['String']['output'];
  votesDownCount: Scalars['Int']['output'];
  votesUpCount: Scalars['Int']['output'];
};

export type CommentEdge = EdgeInterface & {
  __typename?: 'CommentEdge';
  cursor: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  node: CommentNode;
  type: Scalars['String']['output'];
};

export type CommentNode = NodeInterface & {
  __typename?: 'CommentNode';
  guid: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  legacy: Scalars['String']['output'];
  nsfw: Array<Scalars['Int']['output']>;
  nsfwLock: Array<Scalars['Int']['output']>;
  /** Unix timestamp representation of time created */
  timeCreated: Scalars['Int']['output'];
  /** ISO 8601 timestamp representation of time created */
  timeCreatedISO8601: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

export type Connection = ConnectionInterface & {
  __typename?: 'Connection';
  edges: Array<EdgeInterface>;
  pageInfo: PageInfo;
};

export type ConnectionInterface = {
  edges: Array<EdgeInterface>;
  pageInfo: PageInfo;
};

export enum CustomHostnameStatusEnum {
  Active = 'ACTIVE',
  ActiveRedeploying = 'ACTIVE_REDEPLOYING',
  Blocked = 'BLOCKED',
  Deleted = 'DELETED',
  Moved = 'MOVED',
  Pending = 'PENDING',
  PendingBlocked = 'PENDING_BLOCKED',
  PendingDeletion = 'PENDING_DELETION',
  PendingMigration = 'PENDING_MIGRATION',
  PendingProvisioned = 'PENDING_PROVISIONED',
  Provisioned = 'PROVISIONED',
  TestActive = 'TEST_ACTIVE',
  TestActiveApex = 'TEST_ACTIVE_APEX',
  TestBlocked = 'TEST_BLOCKED',
  TestFailed = 'TEST_FAILED',
  TestPending = 'TEST_PENDING',
}

export type Dismissal = {
  __typename?: 'Dismissal';
  dismissalTimestamp: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  userGuid: Scalars['String']['output'];
};

export enum DnsRecordEnum {
  A = 'A',
  Cname = 'CNAME',
  Txt = 'TXT',
}

export type EdgeImpl = EdgeInterface & {
  __typename?: 'EdgeImpl';
  cursor: Scalars['String']['output'];
  node?: Maybe<NodeInterface>;
};

export type EdgeInterface = {
  cursor: Scalars['String']['output'];
  node?: Maybe<NodeInterface>;
};

export enum IllegalSubReasonEnum {
  AnimalAbuse = 'ANIMAL_ABUSE',
  Extortion = 'EXTORTION',
  Fraud = 'FRAUD',
  MinorsSexualization = 'MINORS_SEXUALIZATION',
  RevengePorn = 'REVENGE_PORN',
  Terrorism = 'TERRORISM',
  Trafficking = 'TRAFFICKING',
}

export type KeyValuePairInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export enum MultiTenantColorScheme {
  Dark = 'DARK',
  Light = 'LIGHT',
}

export type MultiTenantConfig = {
  __typename?: 'MultiTenantConfig';
  colorScheme?: Maybe<MultiTenantColorScheme>;
  communityGuidelines?: Maybe<Scalars['String']['output']>;
  lastCacheTimestamp?: Maybe<Scalars['Int']['output']>;
  primaryColor?: Maybe<Scalars['String']['output']>;
  siteEmail?: Maybe<Scalars['String']['output']>;
  siteName?: Maybe<Scalars['String']['output']>;
  updatedTimestamp?: Maybe<Scalars['Int']['output']>;
};

export type MultiTenantConfigInput = {
  colorScheme?: InputMaybe<MultiTenantColorScheme>;
  communityGuidelines?: InputMaybe<Scalars['String']['input']>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  siteEmail?: InputMaybe<Scalars['String']['input']>;
  siteName?: InputMaybe<Scalars['String']['input']>;
};

export type MultiTenantDomain = {
  __typename?: 'MultiTenantDomain';
  dnsRecord?: Maybe<MultiTenantDomainDnsRecord>;
  domain: Scalars['String']['output'];
  ownershipVerificationDnsRecord?: Maybe<MultiTenantDomainDnsRecord>;
  status: CustomHostnameStatusEnum;
  tenantId: Scalars['Int']['output'];
};

export type MultiTenantDomainDnsRecord = {
  __typename?: 'MultiTenantDomainDnsRecord';
  name: Scalars['String']['output'];
  type: DnsRecordEnum;
  value: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMultiTenantDomain: MultiTenantDomain;
  createNetworkRootUser: TenantUser;
  /** Create a new report. */
  createNewReport: Scalars['Boolean']['output'];
  createTenant: Tenant;
  /** Deletes featured entity. */
  deleteFeaturedEntity: Scalars['Boolean']['output'];
  /** Dismiss a notice by its key. */
  dismiss: Dismissal;
  /** Sets multi-tenant config for the calling tenant. */
  multiTenantConfig: Scalars['Boolean']['output'];
  /** Provide a verdict for a report. */
  provideVerdict: Scalars['Boolean']['output'];
  removeRssFeed?: Maybe<Scalars['Void']['output']>;
  /** Sets onboarding state for the currently logged in user. */
  updateAccount: Array<Scalars['String']['output']>;
};

export type NewsfeedConnection = ConnectionInterface & {
  __typename?: 'NewsfeedConnection';
  edges: Array<EdgeInterface>;
  pageInfo: PageInfo;
};

export type NodeImpl = NodeInterface & {
  __typename?: 'NodeImpl';
  id: Scalars['ID']['output'];
};

export type NodeInterface = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  activity: ActivityNode;
  /** Get dismissal by key. */
  dismissalByKey?: Maybe<Dismissal>;
  /** Get all of a users dismissals. */
  dismissals: Array<Dismissal>;
  /** Gets featured entities. */
  /** The available balance a user has */
  giftCardsBalance: Scalars['Float']['output'];
  /** Gets multi-tenant config for the calling tenant. */
  multiTenantConfig?: Maybe<MultiTenantConfig>;
  multiTenantDomain: MultiTenantDomain;
  newsfeed: NewsfeedConnection;
  /** Gets reports. */
  reports: ReportsConnection;
  tenants: Array<Tenant>;
};

export type QueryNewsfeedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  algorithm: Scalars['String']['input'];
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  inFeedNoticesDelivered?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryTenantsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Report = NodeInterface & {
  __typename?: 'Report';
  action?: Maybe<ReportActionEnum>;
  createdTimestamp: Scalars['Int']['output'];
  cursor?: Maybe<Scalars['String']['output']>;
  /** Gets entity edge from entityUrn. */
  entityEdge?: Maybe<UnionActivityEdgeUserEdgeGroupEdgeCommentEdge>;
  entityGuid?: Maybe<Scalars['String']['output']>;
  entityUrn: Scalars['String']['output'];
  /** Gets ID for GraphQL. */
  id: Scalars['ID']['output'];
  illegalSubReason?: Maybe<IllegalSubReasonEnum>;
  moderatedByGuid?: Maybe<Scalars['String']['output']>;
  nsfwSubReason?: Maybe<NsfwSubReasonEnum>;
  reason: ReportReasonEnum;
  reportGuid?: Maybe<Scalars['String']['output']>;
  reportedByGuid?: Maybe<Scalars['String']['output']>;
  /** Gets reported user edge from reportedByGuid. */
  reportedByUserEdge?: Maybe<UserEdge>;
  securitySubReason?: Maybe<SecuritySubReasonEnum>;
  status: ReportStatusEnum;
  tenantId?: Maybe<Scalars['String']['output']>;
  updatedTimestamp?: Maybe<Scalars['Int']['output']>;
};

export enum ReportActionEnum {
  Ban = 'BAN',
  Delete = 'DELETE',
  Ignore = 'IGNORE',
}

export type ReportEdge = EdgeInterface & {
  __typename?: 'ReportEdge';
  /** Gets cursor for GraphQL. */
  cursor: Scalars['String']['output'];
  /** Gets ID for GraphQL. */
  id: Scalars['ID']['output'];
  /** Gets node. */
  node?: Maybe<Report>;
  /** Gets type for GraphQL. */
  type: Scalars['String']['output'];
};

export type ReportInput = {
  entityUrn: Scalars['String']['input'];
  illegalSubReason?: InputMaybe<IllegalSubReasonEnum>;
  nsfwSubReason?: InputMaybe<NsfwSubReasonEnum>;
  reason: ReportReasonEnum;
  securitySubReason?: InputMaybe<SecuritySubReasonEnum>;
};

export enum ReportReasonEnum {
  ActivityPubReport = 'ACTIVITY_PUB_REPORT',
  AnotherReason = 'ANOTHER_REASON',
  Harassment = 'HARASSMENT',
  Illegal = 'ILLEGAL',
  Impersonation = 'IMPERSONATION',
  InauthenticEngagement = 'INAUTHENTIC_ENGAGEMENT',
  IncitementToViolence = 'INCITEMENT_TO_VIOLENCE',
  IntellectualPropertyViolation = 'INTELLECTUAL_PROPERTY_VIOLATION',
  Malware = 'MALWARE',
  Nsfw = 'NSFW',
  PersonalConfidentialInformation = 'PERSONAL_CONFIDENTIAL_INFORMATION',
  Security = 'SECURITY',
  Spam = 'SPAM',
  ViolatesPremiumContentPolicy = 'VIOLATES_PREMIUM_CONTENT_POLICY',
}

export enum ReportStatusEnum {
  Actioned = 'ACTIONED',
  Pending = 'PENDING',
}

export type ReportsConnection = ConnectionInterface & {
  __typename?: 'ReportsConnection';
  /** Gets connections edges. */
  edges: Array<EdgeInterface>;
  /** ID for GraphQL. */
  id: Scalars['ID']['output'];
  pageInfo: PageInfo;
};

export enum SecuritySubReasonEnum {
  HackedAccount = 'HACKED_ACCOUNT',
}

export type Tenant = {
  __typename?: 'Tenant';
  config?: Maybe<MultiTenantConfig>;
  domain?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  ownerGuid?: Maybe<Scalars['String']['output']>;
  rootUserGuid?: Maybe<Scalars['String']['output']>;
};

export type TenantInput = {
  config?: InputMaybe<MultiTenantConfigInput>;
  domain?: InputMaybe<Scalars['String']['input']>;
  ownerGuid?: InputMaybe<Scalars['Int']['input']>;
};

export type TenantUser = {
  __typename?: 'TenantUser';
  guid: Scalars['String']['output'];
  role: TenantUserRoleEnum;
  tenantId: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type TenantUserInput = {
  tenantId?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export enum TenantUserRoleEnum {
  Admin = 'ADMIN',
  Owner = 'OWNER',
  User = 'USER',
}

export type UnionActivityEdgeUserEdgeGroupEdgeCommentEdge =
  | ActivityEdge
  | CommentEdge
  | UserEdge;

export type UserEdge = EdgeInterface & {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  node: UserNode;
  type: Scalars['String']['output'];
};

export type UserNode = NodeInterface & {
  __typename?: 'UserNode';
  briefDescription: Scalars['String']['output'];
  /** The users public ETH address */
  ethAddress?: Maybe<Scalars['String']['output']>;
  guid: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The number of views the users has received. Includes views from their posts */
  impressionsCount: Scalars['Int']['output'];
  /** The user is a founder (contributed to crowdfunding) */
  isFounder: Scalars['Boolean']['output'];
  /** The user is a member of Minds+ */
  isPlus: Scalars['Boolean']['output'];
  /** The user is a member of Minds Pro */
  isPro: Scalars['Boolean']['output'];
  /** You are subscribed to this user */
  isSubscribed: Scalars['Boolean']['output'];
  /** The user is subscribed to you */
  isSubscriber: Scalars['Boolean']['output'];
  /** The user is a verified */
  isVerified: Scalars['Boolean']['output'];
  legacy: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nsfw: Array<Scalars['Int']['output']>;
  nsfwLock: Array<Scalars['Int']['output']>;
  /** The number of subscribers the user has */
  subscribersCount: Scalars['Int']['output'];
  /** The number of channels the user is subscribed to */
  subscriptionsCount: Scalars['Int']['output'];
  /** Unix timestamp representation of time created */
  timeCreated: Scalars['Int']['output'];
  /** ISO 8601 timestamp representation of time created */
  timeCreatedISO8601: Scalars['String']['output'];
  urn: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type VerdictInput = {
  action: ReportActionEnum;
  reportGuid?: InputMaybe<Scalars['String']['input']>;
};

export type PageInfoFragment = {
  __typename?: 'PageInfo';
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
};

export type FetchNewsfeedQueryVariables = Exact<{
  algorithm: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  inFeedNoticesDelivered?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
}>;

export type FetchNewsfeedQuery = {
  __typename?: 'Query';
  newsfeed: {
    __typename?: 'NewsfeedConnection';
    edges: Array<
      | {
          __typename?: 'ActivityEdge';
          explicitVotes: boolean;
          cursor: string;
          node: {__typename: 'ActivityNode'; legacy: string; id: string};
        }
      | {
          __typename?: 'CommentEdge';
          cursor: string;
          node: {__typename: 'CommentNode'; id: string};
        }
      | {
          __typename?: 'EdgeImpl';
          cursor: string;
          node?:
            | {__typename: 'ActivityNode'; legacy: string; id: string}
            | {__typename: 'CommentNode'; id: string}
            | {__typename: 'NodeImpl'; id: string}
            | {__typename: 'Report'; id: string}
            | {__typename: 'UserNode'; id: string} // fixme: needed?
            | null;
        }
      | {
          __typename?: 'ReportEdge';
          cursor: string;
          node?: {__typename: 'Report'; id: string} | null;
        }
      | {
          __typename?: 'UserEdge';
          cursor: string;
          node: {__typename: 'UserNode'; id: string};
        } // needed?
    >;
    pageInfo: {
      __typename?: 'PageInfo';
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  };
};

const PAGE_SIZE = 10;

export const PageInfoFragmentDoc = `
    fragment PageInfo on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `;

export const FetchNewsfeedDocument = `
    query FetchNewsfeed($limit: Int!, $cursor: String, $inFeedNoticesDelivered: [String!]) {
  entities_activityCollection(
    first: $limit
  ) {
    edges {
      cursor
      ... on ActivityEdge {
        explicitVotes
      }
      node {
        guid
        user_id
        thumbs_up_count
        thumbs_up_user_guids
        __typename
        ... on ActivityNode {
          legacy
        }
      }
    }
 
  }
}
`;

const fetchActivities = async (
  pageParam = 1,
  categories = [],
  subcategories = [],
  selectedCategories = [],
  selectedSubcategories = [],
  feedType = 'discover',
  date,
) => {
  // Convert the date to the start and end of the day in the user's timezone
  const startDate = new Date(date + 'T00:00:00');
  const endDate = new Date(date + 'T23:59:59');

  // Convert these dates to UTC as Supabase/PostgreSQL stores timestamps in UTC
  const startUTC = startDate.toISOString();
  const endUTC = endDate.toISOString();

  console.log('FA.');
  const {data, error} = await supabase
    .from('entities_activity')
    .select('*')
    .gte('time_completed', startUTC)
    .lte('time_completed', endUTC)
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);
  console.log('data,error', data, error);

  // ({data, error} = await supabase
  //     .from('tile').select('*').filter('move_categories', 'cs', `{${selectedCategories.map(sc => sc.name).join(',')}}`).not('move_title', 'ilike', '%bundle%')
  //     .filter('move_sub_categories', 'cs', `{${selectedSubcategories.map(ssc => ssc.name).join(',')}}`).range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1))
  // console.log('data is ', data?.[0], error, selectedCategories, selectedSubcategories);

  if (error) {
    throw error;
  }

  return data;
};

const fetchSearchResults = async (pageParam = 1, search_term) => {
  const {data, error} = await supabase
    .from('chapter')
    .select('*, tile (*)')
    .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);
  console.log('data is ', data?.[0], error);

  if (error) {
    throw error;
  }

  return data;
};

export const useInfiniteFetchSearchQuery = <TData, TError = unknown>(
  searchTerm,
  options,
) =>
  useInfiniteQuery(
    ['FetchSearch', searchTerm],
    ({pageParam}) => fetchSearchResults(pageParam, searchTerm),
    options,
  );

export const useInfiniteFetchNewsfeedQuery = <
  TData = FetchNewsfeedQuery,
  TError = unknown,
>(
  categories,
  subcategories,
  selectedCategories,
  selectedSubcategories,
  feedType,
  date,
  options?: UseInfiniteQueryOptions<FetchNewsfeedQuery, TError, TData>,
) => {
  return useInfiniteQuery<FetchNewsfeedQuery, TError, TData>(
    [
      'FetchNewsfeed.infinite',
      categories,
      subcategories,
      selectedCategories,
      selectedSubcategories,
      date,
    ],
    ({pageParam}) =>
      fetchActivities(
        pageParam,
        categories,
        subcategories,
        selectedCategories,
        selectedSubcategories,
        feedType,
        date,
      ),
    options,
  );
};
