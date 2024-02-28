import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  RefreshControl,
  View,
  ViewToken,
  Dimensions,
  Button,
} from 'react-native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {FlashList, FlashListProps} from '@shopify/flash-list';

import ActivityModel from '../../../newsfeed/ActivityModel';
import Activity from '../../../newsfeed/activity/Activity';
import BaseModel from '../../../common/BaseModel';
import i18n from '../../../common/services/i18n.service';
import ErrorLoading from '../../../common/components/ErrorLoading';
import MText from '../../../common/components/MText';
import {ComponentsStyle} from '../../../styles/Components';
import CenteredLoading from '../../../common/components/CenteredLoading';
import ErrorBoundary from '../../../common/components/ErrorBoundary';
import {IS_IOS} from '../../../config/Config';
import ThemedStyles from '../../../styles/ThemedStyles';
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
// import {useDimensions} from '@react-native-community/hooks';
// import {useIsFeatureOn} from '../../../../ExperimentsProvider';

type PlaceholderType =
  | React.ComponentType<any>
  | React.ReactElement
  | null
  | undefined;

export type FeedListProps<T extends BaseModel> = {
  onRefresh?: () => Promise<any>;
  loadMore?: () => void;
  onItemViewed?: (item: T, number) => void;
  renderInFeedItems?: (item) => JSX.Element;
  displayBoosts?: 'none' | 'distinct';
  emphasizeGroup?: boolean;
  placeholder?: PlaceholderType;
} & Omit<FlashListProps<T>, 'getItemType' | 'keyExtractor' | 'renderItem'>;

const colors = [ThemedStyles.getColor('Link')];

const adUnitId = TestIds.ADAPTIVE_BANNER;

/**
 * Functional implementation of the FeedList component
 */
function FeedListCmp<T extends BaseModel>(
  props: FeedListProps<T>,
  ref: React.ForwardedRef<FlashList<T>>,
) {
  const {
    displayBoosts,
    refreshing,
    onRefresh,
    loadMore,
    onItemViewed,
    renderInFeedItems,
    emphasizeGroup,
    ...other
  } = props;

  const {height} = Dimensions.get('window');
  const navigation = useNavigation();
  const explicitVoteFeature = false;
  const hidePostFeature = false;

  const renderItem = useCallback(
    (row: {index: number; item: any; target: string}) => {
      // fixme tgorer this is supposed to check if row.item instanceof ActivityModel, but it is returning false (have to fix).
      return (
        <ErrorBoundary>
          <Activity
            entity={row.item}
            navigation={navigation}
            displayBoosts={displayBoosts}
            emphasizeGroup={emphasizeGroup}
            autoHeight={false}
            explicitVoteButtons={explicitVoteFeature && row.index % 3 === 0}
            hidePostOnDownvote={hidePostFeature}
          />
        </ErrorBoundary>
      );
    },
    [
      navigation,
      displayBoosts,
      emphasizeGroup,
      explicitVoteFeature,
      hidePostFeature,
      renderInFeedItems,
    ],
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={Boolean(refreshing)}
        onRefresh={onRefresh}
        progressViewOffset={IS_IOS ? 0 : 80}
        tintColor={ThemedStyles.getColor('Link')}
        colors={colors}
      />
    ),
    [refreshing, onRefresh],
  );

  const onViewableItemsChanged = useCallback(
    (change: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      change.viewableItems.forEach(item => {
        onItemViewed?.(item.item, item.index);
      });
      change.changed.forEach(
        (c: {item: {setVisible: (arg0: any) => void}; isViewable: any}) =>
          c.item?.setVisible?.(c.isViewable),
      );
    },
    [onItemViewed],
  );

  return (
    <FlashList
      estimatedItemSize={450}
      refreshControl={refreshControl}
      onEndReachedThreshold={5}
      drawDistance={height}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onViewableItemsChanged={onViewableItemsChanged}
      getItemType={getItemType}
      onEndReached={loadMore}
      viewabilityConfig={viewabilityConfig}
      {...other}
      ref={ref}
    />
  );
}

export const FeedListEmpty = ({
  emptyMessage,
  Placeholder,
  showPlaceholder,
}: {
  emptyMessage?: string;
  Placeholder?: any;
  showPlaceholder?: boolean;
}) => {
  if (Placeholder && showPlaceholder) {
    return React.isValidElement(Placeholder) ? Placeholder : <Placeholder />;
  }
  return (
    <View style={ComponentsStyle.emptyComponentContainer}>
      <View style={ComponentsStyle.emptyComponent}>
        <MText style={ComponentsStyle.emptyComponentMessage}>
          {emptyMessage || i18n.t('newsfeed.empty')}
        </MText>
      </View>
    </View>
  );
};

export const FeedListFooter = ({loading, error, reload}) => {
  if (loading) {
    return <CenteredLoading />;
  }
  if (error) {
    return <ErrorLoading message={i18n.t('cantLoad')} tryAgain={reload} />;
  }
  return <View style={{paddingBottom: 100}} />;
};

const getItemType = item => {
  const isActivity = item instanceof ActivityModel;
  const type =
    isActivity && item.hasVideo()
      ? 2 // video
      : isActivity && item.hasImage()
        ? 1 // image
        : !isActivity && item.id
          ? item.id
          : 0; // text activity

  return type;
};

const keyExtractor = (item, index: any) => {
  const key = item.boosted
    ? `${item.urn}:${index}`
    : item.urn || `${item.id}:${index}`;
  return key;
};

const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
  minimumViewTime: 500,
};

export const FeedList = observer(
  React.forwardRef(FeedListCmp) as <T extends BaseModel>(
    props: FeedListProps<T> & {
      ref?: React.Ref<FlashList<T>>;
    },
  ) => React.ReactElement,
);
