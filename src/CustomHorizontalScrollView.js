import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  cancelAnimation,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Indicator} from './Indicator';

export const TABBAR_HEIGHT = 48;

const CustomHorizontalScrollView = ({
  tabNames,
  indexDecimal,
  scrollEnabled = false,
  indicatorStyle,
  index,
  getLabelText = name => String(name).toUpperCase(),
  style,
  tabProps,
  contentContainerStyle,
  labelStyle,
  inactiveColor,
  activeColor,
  tabStyle,
  width: customWidth,
  keepActiveTabCentered,
  renderItem,
  itemsLayout,
  setItemsLayout,
}) => {
  const nTabs = tabNames.length;
  const tabBarRef = useAnimatedRef();
  const windowWidth = useWindowDimensions().width;
  const width = customWidth ?? windowWidth;
  const isFirstRender = React.useRef(true);

  const tabsOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (!scrollEnabled) {
      // update items width on window resizing
      const tabWidth = width / nTabs;
      setItemsLayout(
        tabNames.map((_, i) => {
          return {width: tabWidth, x: i * tabWidth};
        }),
      );
    }
  }, [scrollEnabled, nTabs, tabNames, width]);

  const cancelNextScrollSync = useSharedValue(index.value);

  const onScroll = useAnimatedScrollHandler(
    {
      onScroll: event => {
        const tabWidth = width / nTabs;
        // tabsOffset.value = event.contentOffset.x
        // indexDecimal.value = event.contentOffset.x / tabWidth
      },
      onBeginDrag: () => {
        isScrolling.value = true;
        cancelNextScrollSync.value = index.value;
      },
      onMomentumEnd: () => {
        isScrolling.value = false;
      },
    },
    [],
  );

  const currentIndexToSync = useSharedValue(index.value);
  const targetIndexToSync = useSharedValue(index.value);

  useAnimatedReaction(
    () => {
      return index.value;
    },
    nextIndex => {
      if (scrollEnabled) {
        cancelAnimation(currentIndexToSync);
        targetIndexToSync.value = nextIndex;
        currentIndexToSync.value = withTiming(nextIndex);
      }
    },
    [scrollEnabled],
  );

  useAnimatedReaction(
    () => {
      return currentIndexToSync.value === targetIndexToSync.value;
    },
    canSync => {
      if (
        canSync &&
        scrollEnabled &&
        itemsLayout.length === nTabs &&
        itemsLayout[index.value]
      ) {
        const halfTab = itemsLayout[index.value].width / 2;
        const offset = itemsLayout[index.value].x;
        if (
          keepActiveTabCentered ||
          offset < tabsOffset.value ||
          offset > tabsOffset.value + width - 2 * halfTab
        ) {
          scrollTo(tabBarRef, offset - width / 2 + halfTab, 0, true);
        }
      }
    },
    [scrollEnabled, itemsLayout, nTabs],
  );

  return (
    <Animated.ScrollView
      ref={tabBarRef}
      horizontal
      style={style}
      contentContainerStyle={[
        styles.contentContainer,
        !scrollEnabled && {width},
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      alwaysBounceHorizontal={false}
      scrollsToTop={false}
      showsHorizontalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      overScrollMode="never"
      scrollEnabled={scrollEnabled}
      onScroll={scrollEnabled ? onScroll : undefined}
      scrollEventThrottle={16}
      snapToInterval={width / nTabs}>
      {tabNames.map((item, index) => renderItem(item, index))}
      {itemsLayout.length === nTabs && (
        <Indicator
          indexDecimal={indexDecimal}
          itemsLayout={itemsLayout}
          fadeIn={scrollEnabled}
          style={indicatorStyle}
        />
      )}
    </Animated.ScrollView>
  );
};

const MemoizedCustomHorizontalScrollView = React.memo(
  CustomHorizontalScrollView,
);

export default MemoizedCustomHorizontalScrollView;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
});
