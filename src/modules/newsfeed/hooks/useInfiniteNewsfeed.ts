import React, {useCallback, useMemo} from 'react';
import {
  FetchNewsfeedQuery,
  useInfiniteFetchNewsfeedQuery,
} from '../../../graphql/api';
import {InfiniteData, useQueryClient} from '@tanstack/react-query';
import cloneDeep from 'lodash/cloneDeep';

import ActivityModel from '../../../newsfeed/ActivityModel';
import UserModel from '../../../channel/UserModel';
import GroupModel from '../../../groups/GroupModel';
import {storages} from '../../../common/services/storage/storages.service';
import {useData} from '../../../shared/utils/DataContext';

const PAGE_SIZE = 10;

export function useInfiniteNewsfeed(feedType, date) {
  const {
    allCategories,
    allSubcategories,
    selectedCategories,
    selectedSubcategories,
  } = useData();
  console.log('uINF type is now ', feedType);
  const inFeedNoticesDelivered = React.useRef(emptyArray);

  const local = React.useRef<{
    lastFetchAt: number;
    cachedData: undefined | null | InfiniteData<FetchNewsfeedQuery>;
    cachedPersisted: boolean;
  }>({
    lastFetchAt: 0,
    cachedData: null,
    cachedPersisted: false,
  }).current;

  const queryClient = useQueryClient();

  // only on the first run
  if (local.cachedData === null) {
    // storages.user?.removeItem('NewsfeedCache');
    local.cachedData = storages.user?.getMap('NewsfeedCache');
    if (local.cachedData) {
      local.cachedPersisted = true;
    }
  }

  const query = useInfiniteFetchNewsfeedQuery(
    allCategories,
    allSubcategories,
    selectedCategories,
    selectedSubcategories,
    feedType,
    date,
    {
      initialData: local.cachedData || undefined,
      staleTime: 0,
      retry: 0,
      getNextPageParam: (lastPage, allPages) => {
        // If the last fetched page has less than PAGE_SIZE items, there are no more pages
        if (lastPage?.length < PAGE_SIZE) {
          return undefined;
        }
        // Otherwise, return the next page number
        return allPages.length + 1;
      },
    },
  );

  /**
   * We return the last refetch time (used to fetch the count)
   */
  if (query.data?.pages.length === 1 && query.dataUpdatedAt) {
    local.lastFetchAt = query.dataUpdatedAt;
    if (!local.cachedPersisted) {
      local.cachedPersisted = true;
      storages.user?.setMapAsync('NewsfeedCache', cloneDeep(query.data));
    }
  }

  const entities = useMemo(
    () => query.data?.pages.flatMap(page => page.map(d => d)),
    [query.data],
  );

  return {
    prepend: useCallback(
      post => {
        post.__mapped = true;
        queryClient.setQueryData<any>(
          [
            'FetchNewsfeed.infinite',
            {
              limit: 12,
              inFeedNoticesDelivered: [],
            },
          ],
          oldData =>
            oldData
              ? {
                  pages: [
                    {newsfeed: {edges: [{node: post}]}},
                    ...oldData.pages,
                  ],
                  pageParams: [...oldData.pageParams, {cursor: post.guid}],
                }
              : oldData,
        );
      },
      [queryClient],
    ),
    lastFetchAt: local.lastFetchAt,
    query,
    refresh: useCallback(() => {
      inFeedNoticesDelivered.current = emptyArray;
      storages.user?.removeItem('NewsfeedCache');
      local.cachedData = undefined;
      local.cachedPersisted = false;
      query.remove();
      console.log('refetching. w/selectedCategories being', selectedCategories);
      query.refetch();
    }, [
      query,
      local,
      allCategories,
      allSubcategories,
      selectedCategories,
      selectedSubcategories,
    ]),
    entities,
  };
}

const emptyArray = [];
