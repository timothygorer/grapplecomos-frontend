import React, {useEffect, useRef, useCallback, useMemo, useState} from 'react';

import {View, FlatList} from 'react-native';

import {observer} from 'mobx-react';

import Activity from '../../../newsfeed/activity/Activity';
import {ComponentsStyle} from '../../../styles/Components';
import ErrorBoundary from '../../../common/components/ErrorBoundary';
import FeedList from '../../../common/components/FeedList';

import ThemedStyles from '../../../styles/ThemedStyles';
import {useDiscoveryV2SearchStore} from './DiscoveryV2SearchContext';
import GroupsListItem from '../../../groups/GroupsListItem';
import i18n from '../../../common/services/i18n.service';
import UserModel from '../../../channel/UserModel';
import {useStores} from '../../../common/hooks/use-stores';
import MText from '../../../common/components/MText';
import ChannelListItem from '../../../common/components/ChannelListItem';
import AnimatedHeight from '../../../common/components/animations/AnimatedHeight';
import {B2, H4, Row} from '../../../common/ui';
import i18nService from '../../../common/services/i18n.service';
import Divider from '../../../common/components/Divider';
import {
  ActivityNode,
  SearchFilterEnum,
  SearchMediaTypeEnum,
  useFetchSearchQuery,
  useInfiniteFetchSearchQuery,
} from '../../../graphql/api';
import GroupModel from '../../../groups/GroupModel';
import {ChannelRecommendationItem} from '../../../modules/recommendation';
import {supabase} from '../../../services/supabaseClient';

interface Props {
  navigation: any;
  style?: any;
}

export const DiscoverySearchList = observer((props: Props) => {
  const theme = ThemedStyles.style;
  const query = props.query;

  const store = useDiscoveryV2SearchStore();
  const searchBarStore = useStores().searchBar;
  let listRef = useRef<FlatList<[]>>(null);
  const [page, setPage] = useState(0);
  const [dataArray, setDataArray] = useState([]);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({offset: -65, animated: true});
    }
  }, [listRef, store.refreshing]);

  useEffect(() => {
    (async () => {
      if (!noMoreData) {
        const {data, error} = await supabase
          .rpc('get_chapter_names_by_keyword', {search_pattern: query})
          .select('*')
          .range(page, page + 9);
        console.log('data is ', data, error, query);
        if (!error) {
          setDataArray(dataPrev => [...dataPrev, ...data]);
          if (data.length > 0 && data.length < 10) {
            setNoMoreData(true);
          }
        } else {
          setNoMoreData(true);
        }
      }
    })();
  }, [page]);

  /**
   * Render activity item
   */
  const ItemPartial = useCallback(
    row => {
      let entity: React.ReactElement;
      switch (row.item.type) {
        case 'user':
          entity = (
            <ChannelListItem
              channel={row.item}
              navigation={props.navigation}
              onUserTap={(item: UserModel) =>
                searchBarStore.user?.searchBarItemTap(item)
              }
              borderless
            />
          );
          break;
        case 'group':
          entity = <GroupsListItem index={row.index} group={row.item} />;
          break;
        default:
          entity = (
            <Activity
                isDiscoveryEntity={true}
              entity={row.item}
              navigation={props.navigation}
              autoHeight={false}
              storeUserTap={true}
            />
          );
          console.log('got to default w/row.item ', row.item);
      }

      return (
        <ErrorBoundary
          containerStyle={[theme.borderBottomHair, theme.bcolorPrimaryBorder]}
          message="Could not load">
          {entity}
        </ErrorBoundary>
      );
    },
    [
      props.navigation,
      theme.borderBottomHair,
      theme.bcolorPrimaryBorder,
      searchBarStore,
    ],
  );

  const EmptyPartial = React.useMemo(() => {
    return store.refreshing ? (
      <View />
    ) : (
      <View>
        <View style={ComponentsStyle.emptyComponentContainer}>
          <View style={ComponentsStyle.emptyComponent}>
            <MText style={ComponentsStyle.emptyComponentMessage}>
              {i18n.t('discovery.nothingToSee')}
            </MText>
          </View>
        </View>
      </View>
    );
  }, [store.refreshing]);

  const {algorithm, q: searchTerm} = store.listStore.feedsService.params ?? {};
  const isTop = algorithm === 'top';

  const loadMore = () => {
    setPage(page + 9);
  };

  return (
    <View style={theme.flexContainer}>
      <FeedList
        // header={
        //   isTop ? (
        //     <AnimatedHeight>
        //       <Finder type="group" query={searchTerm} />
        //       <Finder type="channel" query={searchTerm} />
        //     </AnimatedHeight>
        //   ) : undefined
        // }
        header={undefined}
        feedStore={store.listStore}
        navigation={props.navigation}
        emptyMessage={EmptyPartial}
        renderActivity={ItemPartial}
        data={dataArray}
        loadMore={loadMore}
      />
    </View>
  );
});

function Finder({type, query}: {type: 'group' | 'channel'; query: string}) {
  const store = useDiscoveryV2SearchStore();
  const entities = useSearchQuery(type, query);
  console.log('dsl entities are ', entities);

  return entities.length === 0 ? null : (
    <>
      <View style={ThemedStyles.style.bgPrimaryBackground}>
        <Row align="centerBetween" vertical="L" horizontal="L">
          <H4>{type === 'channel' ? 'Channels' : 'Groups'}</H4>
          <B2
            color="link"
            onPress={() => {
              store.setAlgorithm(type === 'channel' ? 'channels' : 'groups');
            }}>
            {i18nService.t('seeMore')}
          </B2>
        </Row>
      </View>
      {entities.map((item, index) =>
        type === 'group' ? (
          <GroupsListItem
            group={item as GroupModel}
            index={index}
            onPress={() => null}
          />
        ) : (
          <ChannelRecommendationItem
            key={item.guid}
            channel={item as UserModel}
            onSubscribed={() => null}
          />
        ),
      )}
      <Divider />
    </>
  );
}

const useSearchQuery = (type: 'group' | 'channel', query: string) => {
  const Model = type === 'group' ? GroupModel : UserModel;
  console.log('QUERY is ', query);
  const {data} = useInfiniteFetchSearchQuery(query, {
    staleTime: 0,
    retry: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });

  const items = useMemo(
    () => data?.map(item => Model.create(item)) ?? [],
    [data, Model],
  );

  return items;
};
