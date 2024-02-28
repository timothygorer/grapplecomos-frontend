import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, View, Dimensions, Animated} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useData} from './shared/utils/DataContext';
import {useSharedValue} from 'react-native-reanimated';
import moment from 'moment-timezone';
import {EventDateItem} from './EventDateItem.js';
import MemoizedCustomHorizontalScrollView from './CustomHorizontalScrollView';

const EventDatesHorizontalScrollView = ({
  scrollEnabled,
  tabNames,
  width,
  setIndex: setTabViewIndex,
  setRoutes,
}) => {
  const {colors, dark: darkTheme} = useTheme();
  const {dates, setDates} = useData();
  const selectedDateIndex = dates.filter(d => d.selected)[0]?.index;

  const index = useSharedValue(selectedDateIndex ?? 0);
  const indexDecimal = useSharedValue(index.value);
  const itemLayoutGathering = React.useRef(new Map());
  const nTabs = tabNames.length;
  const [itemsLayout, setItemsLayout] = React.useState(
    scrollEnabled
      ? []
      : tabNames.map((_, i) => {
          console.log('width is ', width);
          const tabWidth = width / nTabs;
          return {width: tabWidth, x: i * tabWidth};
        }),
  );

  useEffect(() => {
    index.value = selectedDateIndex;
    indexDecimal.value = selectedDateIndex;
  }, [selectedDateIndex]);

  const onEventDateItemPressHandler = event_date => {
    const selectedDate = dates.filter(date => date.selected)[0]?.event_date;
    if (event_date !== selectedDate) {
      console.log('setting date to ', event_date);

      setDates(
        dates.map(d =>
          d.event_date === event_date
            ? {...d, selected: true}
            : {...d, selected: false},
        ),
      );
      const indexFound = tabNames.findIndex(
        tabName => event_date === tabName.event_date,
      );
      index.value = indexFound;
      indexDecimal.value = indexFound;
    }
  };

  const onEventDateItemLayout = React.useCallback(
    (event, name) => {
      if (scrollEnabled) {
        if (!event.nativeEvent?.layout) return;
        const {width, x} = event.nativeEvent.layout;

        itemLayoutGathering.current.set(name, {
          width,
          x,
        });

        // pick out the layouts for the tabs we know about (in case they changed dynamically)
        const layout = Array.from(itemLayoutGathering.current.entries())
          .filter(([tabName]) =>
            tabNames.map(item => item.event_date).includes(tabName),
          )
          .map(([, layout]) => layout)
          .sort((a, b) => a.x - b.x);

        if (layout.length === tabNames.length) {
          setItemsLayout(layout);
        }
      }
    },
    [scrollEnabled, tabNames],
  );

  const renderEventDateItem = (item, index) => {
    const {selected, day_of_month, day_of_week, event_date, event_month} = item;
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[event_month - 1];

    return (
      <EventDateItem
        key={event_date}
        index={index}
        name={event_date}
        onLayout={
          scrollEnabled
            ? event => onEventDateItemLayout(event, event_date)
            : undefined
        }
        scrollEnabled={scrollEnabled}
        indexDecimal={indexDecimal}
        // activeColor={activeColor}
        // inactiveColor={inactiveColor}
        // style={tabStyle}
        selected={selected}
        dayOfMonth={day_of_month}
        month={month}
        dayOfWeek={day_of_week}
        onPress={onEventDateItemPressHandler}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkTheme ? '#272727' : 'white',
        },
      ]}>
      {dates.length > 0 ? (
        <MemoizedCustomHorizontalScrollView
          tabNames={dates}
          indexDecimal={indexDecimal}
          index={index}
          scrollEnabled
          keepActiveTabCentered={true}
          renderItem={renderEventDateItem}
          itemsLayout={itemsLayout}
          setItemsLayout={setItemsLayout}
        />
      ) : null}
    </View>
  );
};

export default EventDatesHorizontalScrollView;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    marginBottom: 7,
  },
  contentContainer: {
    paddingHorizontal: 12,
  },
});
